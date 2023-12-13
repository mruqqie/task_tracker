import React, { ChangeEvent, FormEvent, useState } from "react";

interface TaskFormProps {
	onClose: () => void;
}

interface TaskFormData {
	title: string;
	description: string;
	dueDate: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ onClose }) => {
	const [formData, setFormData] = useState<TaskFormData>({
		title: "",
		description: "",
		dueDate: "",
	});

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const response = await fetch("http://localhost:3001/tasks", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				console.log("Task created successfully");
				onClose();
				const fetchResponse = await fetch('http://localhost:3001/tasks');
				const savedData = await fetchResponse.json();
				console.log('Data saved on the server:', savedData);
			} else {
				console.error("Failed to create task");
			}
		} catch (error) {
			console.error("Error creating task:", error);
		}
	};
	return (
		<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-75">
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
							className="w-full border p-2 rounded-md bg-black"
						/>
					</label>
					<div className="flex justify-end">
						<button
							onClick={onClose}
							className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md mr-2"
						>
							Close
						</button>
						<button
							className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md"
							// Add functionality to handle form submission
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
