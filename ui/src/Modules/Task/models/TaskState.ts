import { NeedToCreate } from "./NeedToCreate";
import { Task } from "./Task";

export type TaskState = {
    currentTask: Task | null;
    loadingCurrent: boolean;
    needToCreate: NeedToCreate | null;
    loadingNeedToCreate: boolean;
};
