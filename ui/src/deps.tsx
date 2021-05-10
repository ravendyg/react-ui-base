import { TaskState } from 'Modules/Task/models/TaskState';
import { UserState } from 'Modules/User/models/UserState';
import React, { useContext } from 'react';

export type Deps = {
  user: UserState;
  task: TaskState;
};

const DepsContext = React.createContext<Deps>(null as any);

export function useDeps() {
  return useContext(DepsContext);
}

export const DepsProvider: React.FC<{ deps: Deps }> =
  ({ children, deps }) => {
    return <DepsContext.Provider value={deps}>
      {children}
    </DepsContext.Provider>;
  };
