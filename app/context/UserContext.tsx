"use client";
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { useRouter } from "next/navigation";
import { User, UserContextValue } from "../constants";

interface UserContectProps {
	children: ReactNode;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: React.FC<UserContectProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [currentUserId, setCurrentUserId] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		router.push("/signup");
	}, []);

	const hashPassword = async (password: string) => {
		const encoder = new TextEncoder();
		const data = encoder.encode(password);

		const hashedBuffer = await crypto.subtle.digest("SHA-256", data);
		const hashedPassword = Array.from(new Uint8Array(hashedBuffer))
			.map((byte) => byte.toString(16).padStart(2, "0"))
			.join("");

		return hashedPassword;
	};

	const login = async (username: string, password: string) => {
		try {
			const response = await fetch(
				`http://localhost:3001/users?username=${username}`
			);
			const users: User[] = await response.json();
			if (users.length > 0) {
				const storedPasswordHash = users[0].password;
				const enteredPasswordHash = await hashPassword(password);

				if (storedPasswordHash === enteredPasswordHash) {
					setUser(users[0]);
					setCurrentUserId(users[0].id);
					router.push("/");
				} else {
					alert("Invalid credentials");
					router.push("/login");
				}
			} else {
				alert("User not found");
				router.push("/login");
			}
		} catch (error) {
			console.error("Error during login:", error);
			router.push("/login");
		}
	};

	const signup = async (userData: User) => {
		try {
			const checkUsernameResponse = await fetch(
				`http://localhost:3001/users?username=${userData.username}`
			);
			const existingUsers: User[] = await checkUsernameResponse.json();

			if (existingUsers.length > 0) {
				alert(
					"Username already exists. Please choose a different username."
				);
				return;
			} else {
				const hashedPassword = await hashPassword(userData.password);
				const response = await fetch("http://localhost:3001/users", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						...userData,
						password: hashedPassword,
					}),
				});

				if (response.ok) {
					setUser(userData);
					console.log("User signed up successfully");
					router.push("/login");
				} else {
					console.error("Failed to sign up user");
				}
			}
		} catch (error) {
			console.error("Error during signup:", error);
		}
	};

	const logout = () => {
		setUser(null);
		setCurrentUserId(null);
	};

	const contextValue: UserContextValue = {
		user,
		login,
		signup,
		logout,
		currentUserId,
	};

	return (
		<UserContext.Provider value={contextValue}>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUserContext must be used within a UserProvider");
	}
	return context;
};
