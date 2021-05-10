import { NeedToCreate } from "Modules/Task/models/NeedToCreate";
import { Task } from "Modules/Task/models/Task";
import { User } from "Modules/User/models/User";
import { RequestCancel } from "./RequestCancel";
import { Response } from './Response';

export type Api = {
    getUser: () => Promise<Response<User | null>>;
    loginWithGoogle: (idToken: string) => Promise<Response<User | null>>;
    signOut: () => Promise<Response<void>>;
    getCurrentTask: (cancelToken?: RequestCancel) => Promise<Response<Task | null>>;
    getNeedToCreate: (cancelToken?: RequestCancel) => Promise<Response<NeedToCreate | null>>;
    getRequestCancel: () => RequestCancel;
};
