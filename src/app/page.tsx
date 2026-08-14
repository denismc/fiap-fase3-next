import { getTasks } from "../services/tasks";
import TaskBoard from "../components/TaskBoard/TaskBoard";

export default async function Home() {
  const tasks = await getTasks();

  return <TaskBoard initialTasks={tasks} />;
}
