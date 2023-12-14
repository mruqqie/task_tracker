export interface TaskFormProps {
	onClose: () => void;
}

export interface TaskFormData {
	title: string;
	description: string;
	dueDate: string;
}

export interface Task {
	id: string;
	title: string;
	description: string;
	dueDate: string;
	status: string;
}

export interface TaskProps {
	task: Task;
	toggleEditFormVisibility: (task: Task | null) => void;

}

export interface UpdateTaskStatus {
	(taskId: string, status: string): void;
}
export interface BoardColumnProps {
	status: string;
	tasks: Task[];
	updateTaskStatus: UpdateTaskStatus;
}
export interface TaskContextValue {
	tasks: Task[];
	addTask: (task: Task) => void;
	updateTask: (taskId: string, updatedTask: Task) => void;
	deleteTask: (taskId: string) => void;
	fetchTasks: () => void;
	updateTaskStatus: (taskId: string, newStatus: string) => void;
}

export const ItemTypes = {
	TASK: "task",
} as const;
