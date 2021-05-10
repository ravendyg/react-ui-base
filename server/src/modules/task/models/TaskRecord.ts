import { Task } from "./Task";

export type TaskRecord = Task & {
    userId: number;
};
