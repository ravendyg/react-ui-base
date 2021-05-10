import { BusEvents } from "./BusEvents";
import { EventBus } from './EventBus';

export class EventBusImpl implements EventBus {
  private _listeners: Map<BusEvents, Array<(p: unknown) => void>>;

  constructor() {
    this._listeners = new Map<BusEvents, Array<(p: unknown) => void>>();
  }

  subscribe<T = unknown>(event: BusEvents, fn: (p: T) => void): () => void {
    let cbList = this._listeners.get(event);
    if (!cbList) {
      cbList = [];
      this._listeners.set(event, cbList);
    }

    const unsubscribe = this._makeUnsubscribe(event, fn);

    for (const _cb of cbList) {
      if (_cb === fn) {
        return unsubscribe;
      }
    }

    cbList.push(fn as any);
    this._listeners.set(event, cbList);
    return unsubscribe;
  }

  emit(event: BusEvents, p?: unknown): void {
    const cbs = this._listeners.get(event) || [];
    if (process.env.REACT_APP_MODE === 'debug') {
      console.log(event, p, cbs.length + ' subscribers');
    }
    for (const cb of cbs) {
      cb(p);
    }
  }

  private _makeUnsubscribe<T = unknown>(event: BusEvents, fn: (p: T) => void): () => void {
    const unsubscribe = () => {
      let _cbList = this._listeners.get(event);
      if (_cbList) {
        _cbList = _cbList.filter((c) => c !== fn);
        this._listeners.set(event, _cbList);
      }
    };
    return unsubscribe;
  }
}
