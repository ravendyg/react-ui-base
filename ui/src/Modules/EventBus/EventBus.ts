import { BusEvents } from "./BusEvents";

export type EventBus = {
  subscribe: (event: BusEvents, fn: (p: unknown) => void) => () => void;
  emit: (event: BusEvents, p?: unknown) => void;
};
