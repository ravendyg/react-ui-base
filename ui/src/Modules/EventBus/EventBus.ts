import { BusEvents } from "./BusEvents";

export type EventBus = {
  subscribe: <T = unknown>(event: BusEvents, fn: (p: T) => void) => () => void;
  emit: <T = unknown>(event: BusEvents, p?: T) => void;
};
