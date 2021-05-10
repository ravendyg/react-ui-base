import { RequestCancel } from "./models/RequestCancel";

export class RequestCancelImpl implements RequestCancel {
    constructor(private _cancel: (self: RequestCancel) => void) { }

    cancel() {
        this._cancel(this);
    }
}
