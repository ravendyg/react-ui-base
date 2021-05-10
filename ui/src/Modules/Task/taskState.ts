import { makeObservable, observable, runInAction } from "mobx";
import { RESPONSE_STATUSES } from "Modules/Api/constants";
import { Api } from "Modules/Api/models/Api";
import { BUS_EVENTS } from "Modules/EventBus/BusEvents";
import { EventBus } from "Modules/EventBus/EventBus";
import { User } from "Modules/User/models/User";
import { NeedToCreate } from "./models/NeedToCreate";
import { Task } from "./models/Task";
import { TaskState } from "./models/TaskState";

export class TaskStateImpl implements TaskState {
    currentTask: Task | null = null;
    loadingCurrent: boolean = false;
    needToCreate: NeedToCreate | null = null;
    loadingNeedToCreate: boolean = false;

    constructor(
        private _api: Api,
        private _eventBus: EventBus
    ) {
        makeObservable(this, {
            currentTask: observable,
            loadingCurrent: observable,
            needToCreate: observable,
            loadingNeedToCreate: observable,
        });
        _eventBus.subscribe(BUS_EVENTS.USER, (user: User | null) => {
            if (user) {
                this._loadCurrent().catch(console.error);
                this._loadNeedToCreate().catch(console.error);
            } else {
                runInAction(() => {
                    this.currentTask = null;
                    this.loadingCurrent = false;
                    this.needToCreate = null;
                    this.loadingNeedToCreate = false;
                });
            }
        });
    }

    private async _loadCurrent() {
        runInAction(() => this.loadingCurrent = true);
        const cancelToken = this._api.getRequestCancel();
        const resp = await this._api.getCurrentTask(cancelToken);
        if (resp.status === RESPONSE_STATUSES.SUCCESS) {
            runInAction(() => this.currentTask = resp.data);
        }
        runInAction(() => this.loadingCurrent = false);
    }

    private async _loadNeedToCreate() {
        runInAction(() => this.loadingNeedToCreate = true);
        const cancelToken = this._api.getRequestCancel();
        const resp = await this._api.getNeedToCreate(cancelToken);
        if (resp.status === RESPONSE_STATUSES.SUCCESS) {
            runInAction(() => this.needToCreate = resp.data);
        }
        runInAction(() => this.loadingNeedToCreate = false);
    }
}
