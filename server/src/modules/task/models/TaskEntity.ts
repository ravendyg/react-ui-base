import { Task } from "./Task";

export type TaskEntity = {
    getCurrent: (userId: number) => Promise<Task | null>;
};
