"use client";
import React, { useState } from "react";
import TaskForm from "./TaskForm";
import { useUserContext } from "../context/UserContext";
import { useRouter } from "next/navigation";

const Header = () => {
	const { logout, currentUserId, user } = useUserContext();
	const [isFormVisible, setFormVisibility] = useState(false);

	const toggleFormVisibility = () => {
		setFormVisibility(!isFormVisible);
	};

	const router = useRouter();

	const handleClick = () => {
		if (currentUserId) {
			logout;
			router.push("/login");
		} else {
			router.push("/login");
		}
	};

	return (
		<header className="bg-gray-900 p-4 flex justify-between items-center">
			<h1 className="text-white text-md sm:text-2xl font-bold">{currentUserId ? user?.username : "Task Tracker"}</h1>
			<div className="flex gap-3">
				{currentUserId ? (<button
					onClick={toggleFormVisibility}
					className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
				>
					<span className="hidden sm:inline">Create New Task</span>
					<span className="sm:hidden">+</span>
				</button>) : (<button
					onClick={() => {router.push("/signup")}}
					className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-red-300"
				>
					Sign up
				</button>)}
				<button
					onClick={handleClick}
					className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-red-300"
				>
					{currentUserId ? "Logout" : "Login"}
				</button>
			</div>

			{isFormVisible && <TaskForm onClose={toggleFormVisibility} />}
		</header>
	);
};

export default Header;
