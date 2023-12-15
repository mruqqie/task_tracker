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
			className="pb-4 rounded-lg sm:w-[300px] w-full"
		>
			<div className="flex row justify-between h-20 items-center rounded-lg shadow-xl">
				<h2 className="text-[25px] font-bold text-black pl-4">
					{status}
				</h2>
			</div>
			<div className="space-y-4 pt-4">
				{tasks.map((task) => (
					<Tasks
						key={task.id}
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
