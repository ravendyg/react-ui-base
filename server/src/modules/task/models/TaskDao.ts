import { TaskRecord } from "./TaskRecord";

export type TaskDao = {
    getCurrent: (userId: number) => Promise<TaskRecord | null>;
};
