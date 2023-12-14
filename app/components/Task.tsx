import React from "react";
import Image from "next/image";
import { useTaskContext } from "../context/TaskContext";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";
import { TaskProps, ItemTypes } from "../constants";
import { useDrag } from "react-dnd";

const Tasks: React.FC<TaskProps> = ({ task, toggleEditFormVisibility }) => {
	const [{ isDragging }, drag] = useDrag({
		type: ItemTypes.TASK,
		item: { id: task.id },
		collect: (monitor) => ({
		  isDragging: !!monitor.isDragging(),
		}),
	  });
	const { deleteTask } = useTaskContext();
	const handleDeleteTask = async (taskId: string) => {
		try {
			await deleteTask(taskId);
		} catch (error) {
			console.error("Error deleting task:", error);
		}
	};
	return (
		<div ref={drag} key={task.id} className="bg-white p-4 rounded-md shadow-md">
			<div className="flex justify-between items-start">
				<div>
					<h3 className="text-lg font-semibold mb-2 text-gray-600">
						{task.title}
					</h3>
					<p className="text-sm text-gray-600">{task.description}</p>
					<p className="text-sm text-gray-600">Due: {task.dueDate}</p>
				</div>
				<div className="flex row gap-2">
					<Image
						src={deleteIcon}
						alt="edit"
						className="w-4 h-4 hover:cursor-pointer"
						onClick={() => handleDeleteTask(task.id)}
					/>
					<Image
						src={editIcon}
						alt="edit"
						className="w-4 h-4 hover:cursor-pointer"
						onClick={() => toggleEditFormVisibility(task)}
					/>
				</div>
			</div>
		</div>
	);
};

export default Tasks;
