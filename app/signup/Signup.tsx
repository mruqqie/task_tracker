"use client";
import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "../context/UserContext";
import { SignupFormData } from "../constants";

const Signup: React.FC = () => {
	const { signup } = useUserContext();
	const [formData, setFormData] = useState<SignupFormData>({
		username: "",
		password: "",
	});

	const router = useRouter();

	const generateRandomId = () => {
		return "user_" + Math.random().toString(36).substr(2, 9);
	};

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		try {
			if (formData.password.length < 5) {
				alert("Password must be at least 5 characters");
				return;
			} else {
				const userId = generateRandomId();
				const userData = {
					id: userId,
					username: formData.username,
					password: formData.password,
				};
				signup(userData);
			}
		} catch (error) {
			console.error("Error creating user:", error);
		}
	};

	return (
		<div className="sm:max-w-md max-w-[90%] mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
			<h2 className="text-2xl font-semibold mb-4 text-gray-800">
				Sign Up
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
					Sign Up
				</button>
			</form>
			<p className="text-black text-sm mt-4 hover:cursor-pointer" onClick={()=> router.push("/login")}>Click here to Login</p>
		</div>
	);
};

export default Signup;
