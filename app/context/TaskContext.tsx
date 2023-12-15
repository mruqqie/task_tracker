"use client";
import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from "react";
import { Task, TaskContextValue } from "../constants";
import { useUserContext } from "./UserContext";

interface TaskContextProps {
	children: ReactNode;
}


const TaskContext = createContext<TaskContextValue | undefined>(undefined);

export const TaskProvider: React.FC<TaskContextProps> = ({ children }) => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const {currentUserId} = useUserContext()

	useEffect(() => {
		
		fetchTasks(null);
	}, []);

	const fetchTasks = async (sortParam: string | null) => {
		try {
			let apiUrl = `http://localhost:3001/tasks?user=${currentUserId}`;

			if (sortParam === "atoz") {
			  apiUrl += "&_sort=title";
			} else if (sortParam === "duedate") {
			  apiUrl += "&_sort=dueDate";
			}
			const response = await fetch(apiUrl);
			const data = await response.json();
			setTasks(data);
		} catch (error) {
			console.error("Error fetching tasks:", error);
		}
	};

	const addTask = async (task: Task) => {
		try {
			const response = await fetch("http://localhost:3001/tasks", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(task),
			});

			if (response.ok) {
				console.log("Task created successfully");
				await fetchTasks(null);
				console.log("All tasks after adding:", tasks);
			} else {
				console.error("Failed to create task");
			}
		} catch (error) {
			console.error("Error creating task:", error);
		}
	};

	const updateTask = async (taskId: string, updatedTask: Task) => {
		try {
			const response = await fetch(
				`http://localhost:3001/tasks/${taskId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(updatedTask),
				}
			);

			if (response.ok) {
				console.log("Task updated successfully");
				fetchTasks(null);
			} else {
				console.error("Failed to update task");
			}
		} catch (error) {
			console.error("Error updating task:", error);
		}
	};

	const deleteTask = async (taskId: string) => {
		try {
			const response = await fetch(
				`http://localhost:3001/tasks/${taskId}`,
				{
					method: "DELETE",
				}
			);

			if (response.ok) {
				console.log("Task deleted successfully");
				fetchTasks(null);
			} else {
				console.error("Failed to delete task");
			}
		} catch (error) {
			console.error("Error deleting task:", error);
		}
	};

	const updateTaskStatus = async (taskId: string, newStatus: string) => {
		try {
			const response = await fetch(
				`http://localhost:3001/tasks/${taskId}`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ status: newStatus }),
				}
			);

			if (response.ok) {
				console.log("Task status updated successfully");
				fetchTasks(null);
			} else {
				console.error("Failed to update task status");
			}
		} catch (error) {
			console.error("Error updating task status:", error);
		}
	};

	const contextValue: TaskContextValue = {
		tasks,
		addTask,
		updateTask,
		deleteTask,
		fetchTasks,
		updateTaskStatus,
	};

	return (
		<TaskContext.Provider value={contextValue}>
			{children}
		</TaskContext.Provider>
	);
};

export const useTaskContext = () => {
	const context = useContext(TaskContext);
	if (!context) {
		throw new Error("useTaskContext must be used within a TaskProvider");
	}
	return context;
};
