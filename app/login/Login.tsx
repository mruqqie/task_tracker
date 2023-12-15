"use client";
import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "../context/UserContext";
import { LoginFormData } from "../constants";

const Login: React.FC = () => {
	const { login } = useUserContext();
	const [formData, setFormData] = useState<LoginFormData>({
		username: "",
		password: "",
	});

	const router = useRouter();

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const userData = {
				username: formData.username,
				password: formData.password,
			};
			login(userData.username, userData.password);
		} catch (error) {
			console.error("Error creating user:", error);
		}
	};

	return (
		<div className="sm:max-w-md max-w-[90%] mx-auto mt-[100px] p-6 bg-white rounded-md shadow-2xl">
			<h2 className="text-2xl font-semibold mb-4 text-gray-800">
				Login
			</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label
						htmlFor="username"
						className="block text-sm font-medium text-gray-600"
					>
						Username
					</label>
					<input
						type="text"
						id="username"
						name="username"
						onChange={handleChange}
						value={formData.username}
						className="mt-1 p-2 w-full border border-gray-300 text-black rounded-md"
						required
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="password"
						className="block text-sm font-medium text-gray-600"
					>
						Password
					</label>
					<input
						type="password"
						id="password"
						name="password"
						onChange={handleChange}
						value={formData.password}
						className="mt-1 p-2 w-full border border-gray-300 text-black rounded-md"
						required
					/>
				</div>
				<button
					type="submit"
					className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
				>
					Login
				</button>
			</form>
			<p className="text-black text-sm mt-4 hover:cursor-pointer" onClick={()=> router.push("/signup")}>Click here to Sign up</p>
		</div>
	);
};

export default Login;
