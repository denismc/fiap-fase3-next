import type { Task } from "../types";

export async function getTasks(): Promise<Task[]> {
  const response = await fetch("http://localhost:3001/tasks", {
    cache: "no-store",
  });
  return response.json();
}
