import { TaskProvider } from "./context/TaskContext";
import Board from "./components/Board";
import Header from "./components/Header";

export default function Home() {
	return (
			<TaskProvider>
				<div>
					<Header />
					<Board />
				</div>
			</TaskProvider>
	);
}
