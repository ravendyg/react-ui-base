import React, { useEffect } from 'react';
import 'antd/dist/antd.css';

import { Deps, DepsProvider } from './deps';
import './index.css';

import { UserStateImp } from 'Modules/User/userState';
import { Router } from 'Modules/Router/pages';
import { EventBusImpl } from 'Modules/EventBus/EventBusImpl';
import { ApiImpl } from 'Modules/Api/ApiImpl';
import { TaskStateImpl } from 'Modules/Task/taskState';

const eventBus = new EventBusImpl();
const api = new ApiImpl(eventBus);
const deps: Deps = {
  user: new UserStateImp(api, eventBus),
  task: new TaskStateImpl(api, eventBus),
};

export const AppComponent: React.FC<{}> = () => {
  useEffect(() => {
    deps.user.loadUser();
  }, []);

  return <DepsProvider deps={deps} >
    <Router />
  </DepsProvider>;
}

export const App = React.memo(AppComponent);
