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
	user: string | null
}

export interface TaskProps {
	task: Task;
	toggleEditFormVisibility: (task: Task | null) => void;
}

export interface UpdateTaskStatus {
	(taskId: string, status: string): void;
}

interface handleSortType {
	(sortType: string): void
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
	fetchTasks: (sortType: string | null) => void;
	updateTaskStatus: (taskId: string, newStatus: string) => void;
}

export interface User {
	id: string;
	username: string;
	password: string;
}

export interface UserContextValue {
	user: User | null;
	login: (username: string, password: string) => void;
	signup: (userData: User) => void;
	logout: () => void;
	currentUserId: string |null;
}

export interface SignupFormData {
	username: string;
	password: string;
}

export interface LoginFormData {
	username: string;
	password: string;
}

export const ItemTypes = {
	TASK: "task",
} as const;
