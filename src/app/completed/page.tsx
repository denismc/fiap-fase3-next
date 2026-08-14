import { getTasks } from "../../services/tasks";
import CompletedTasks from "../../Pages/CompletedTasks/CompletedTasks";

export default async function CompletedPage() {
  const tasks = await getTasks();

  return <CompletedTasks tasks={tasks} />;
}
