import React, { ChangeEvent, FormEvent, useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import { TaskFormData, TaskFormProps } from "../constants";
import { useUserContext } from "../context/UserContext";

const TaskForm: React.FC<TaskFormProps> = ({ onClose }) => {
	const {currentUserId} = useUserContext()
	const { addTask } = useTaskContext();
	const [formData, setFormData] = useState<TaskFormData>({
		title: "",
		description: "",
		dueDate: "",
	});

	const generateRandomId = () => {
		return "task_" + Math.random().toString(36).substr(2, 9);
	};

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const taskId = generateRandomId();
			const taskData = {
				id: taskId,
				title: formData.title,
				description: formData.description,
				dueDate: formData.dueDate,
				status: "Open",
				user: currentUserId
			};
			addTask(taskData)
			onClose()
		} catch (error) {
			console.error("Error creating task:", error);
		}
	};

	const currentDate = new Date().toISOString().split("T")[0];

	return (
		<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center text-white bg-gray-900 bg-opacity-75">
			<div className="rounded-xl bg-black p-8">
				<h2 className="text-2xl font-bold mb-4">Create New Task</h2>
				<form onSubmit={handleSubmit}>
					<label htmlFor="title" className="block mb-2">
						Title:
						<input
							type="text"
							id="title"
							name="title"
							value={formData.title}
							required
							onChange={handleChange}
							className="w-full border p-2 rounded-md bg-black"
						/>
					</label>
					<label htmlFor="description" className="block mb-2">
						Description:
						<textarea
							id="description"
							name="description"
							value={formData.description}
							onChange={handleChange}
							className="w-full border p-2 rounded-md bg-black"
						/>
					</label>
					<label htmlFor="dueDate" className="block mb-2">
						Due Date:
						<input
							type="date"
							id="dueDate"
							name="dueDate"
							value={formData.dueDate}
							onChange={handleChange}
							min={currentDate}
							className="date w-full border p-2 rounded-md bg-black"
						/>
					</label>
					<div className="flex justify-end mt-5">
						<button
							onClick={onClose}
							className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md mr-2"
						>
							Close
						</button>
						<button
							className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md"
						>
							Create Task
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default TaskForm;
