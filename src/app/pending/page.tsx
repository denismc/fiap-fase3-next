import { getTasks } from "../../services/tasks";
import PendingTasks from "../../Pages/PendingTasks/PendingTasks";

export default async function PendingPage() {
  const tasks = await getTasks();

  return <PendingTasks tasks={tasks} />;
}
