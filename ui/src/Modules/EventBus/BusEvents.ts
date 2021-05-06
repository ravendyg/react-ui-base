export const BUS_EVENTS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
} as const;

export type BusEvents = keyof typeof BUS_EVENTS;
