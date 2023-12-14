import React, { useState } from "react";
import { useDrop } from "react-dnd";
import EditTaskForm from "./EditTaskForm";
import { Task, BoardColumnProps, ItemTypes } from "../constants";
import Tasks from "./Task";

const BoardColumn: React.FC<BoardColumnProps> = ({
	status,
	tasks,
	updateTaskStatus,
}) => {
	const [editFormVisible, setEditFormVisibility] = useState(false);
	const [selectedTask, setSelectedTask] = useState<Task | null>(null);
	

	const toggleEditFormVisibility = (task: Task | null) => {
		setSelectedTask(task);
		setEditFormVisibility(!editFormVisible);
	};

	const [, drop] = useDrop({
		accept: ItemTypes.TASK,
		drop: (item: { id: string }) => {
			updateTaskStatus(item.id, status);
		},
	});

	return (
		<div
			ref={drop}
			className="pb-4 bg-gray-900 rounded-lg shadow-md sm:w-[300px] w-full"
		>
			<div className="flex row justify-between h-20 bg-blue-800 items-center rounded-t-lg">
				<h2 className="text-[25px] font-bold text-white pl-4">
					{status}
				</h2>
				<p className="text-[10px] pr-4">Sort by: <span>Due Date</span>-<span>A-Z</span></p>
			</div>
			<div className="space-y-4 p-4">
				{tasks.map((task) => (
					<Tasks
						task={task}
						toggleEditFormVisibility={toggleEditFormVisibility}
					/>
				))}
			</div>
			{editFormVisible && (
				<EditTaskForm
					onClose={() => toggleEditFormVisibility(null)}
					taskId={selectedTask ? selectedTask.id : ""}
					task={selectedTask}
				/>
			)}
		</div>
	);
};

export default BoardColumn;
