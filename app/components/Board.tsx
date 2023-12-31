"use client";
import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useTaskContext } from "../context/TaskContext";
import BoardColumn from "./BoardColumn";

const Board: React.FC = () => {
	const { fetchTasks, tasks, updateTaskStatus } = useTaskContext();
	const [loading, setLoading] = useState(true);
	const [sortType, setSortType] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			await fetchTasks(sortType);
			setLoading(false);
		};

		fetchData();
	}, [fetchTasks, sortType]);

	const columns = {
		Open: tasks.filter((task) => task.status === "Open"),
		Pending: tasks.filter((task) => task.status === "Pending"),
		"In Progress": tasks.filter((task) => task.status === "In Progress"),
		Completed: tasks.filter((task) => task.status === "Completed"),
	};

	if (loading) {
		return <p className="p-6">Loading tasks...</p>;
	}

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="pt-6 pl-6">
				<p className="text-[15px] pr-4">
					Sort by:{" "}
					<span
						className={`hover:underline hover:cursor-pointer ${
							sortType === "duedate" ? "font-bold" : "font-normal"
						}`}
						onClick={() => {
							setSortType("duedate");
						}}
					>
						Due Date
					</span>
					{" "}-{" "}
					<span
						className={`hover:underline hover:cursor-pointer ${
							sortType === "atoz" ? "font-bold" : "font-normal"
						}`}
						onClick={() => {
							setSortType("atoz");
						}}
					>
						A-Z
					</span>
				</p>
			</div>
			<div className="flex flex-wrap gap-7 p-6">
				{Object.entries(columns).map(([status, tasks]) => (
					<BoardColumn
						key={status}
						status={status}
						tasks={tasks}
						updateTaskStatus={updateTaskStatus}
					/>
				))}
			</div>
		</DndProvider>
	);
};

export default Board;
