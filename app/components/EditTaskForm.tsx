import React, { ChangeEvent, FormEvent, useState } from "react";
import { Task } from "../constants";
import { useTaskContext } from "../TaskContext";

interface EditTaskFormProps {
	onClose: () => void;
	taskId: string;
	task: Task | null;
}

interface TaskFormData {
	title: string;
	description: string;
	dueDate: string;
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({
	onClose,
	task,
	taskId,
}) => {
	const { updateTask } = useTaskContext();
	const [formData, setFormData] = useState<TaskFormData>({
		title: task?.title || "",
		description: task?.description || "",
		dueDate: task?.dueDate || "",
	});

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			if (task) {
				const updatedTaskData = {
					...task,
					title: formData.title,
					description: formData.description,
					dueDate: formData.dueDate,
				};

				updateTask(taskId, updatedTaskData);
				onClose();
			}
		} catch (error) {
			console.error("Error updating task:", error);
		}
	};

	const currentDate = new Date().toISOString().split("T")[0];

	return (
		<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-75">
			<div className="rounded-xl bg-black p-8">
				<h2 className="text-2xl font-bold mb-4">Edit Task</h2>
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
							min={currentDate}
							className="w-full border p-2 rounded-md bg-black"
						/>
					</label>
					<div className="flex justify-end mt-5">
						<button
							onClick={onClose}
							className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md mr-2"
						>
							Close
						</button>
						<button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md">
							Update Task
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditTaskForm;
