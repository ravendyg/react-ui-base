export const BUS_EVENTS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  USER: 'USER',
} as const;

export type BusEvents = keyof typeof BUS_EVENTS;
