import * as React from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
    RouteProps,
} from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useDeps } from 'deps';
import { InitialisingPage } from 'Modules/User/pages/initialisingPage';
import { AuthPage } from 'Modules/User/pages/authPage';
import { ROUTES } from './constants';
import { CurrentTaskPage } from 'Modules/Task/components/currentTaskPage';
import { AddTaskPage } from 'Modules/Task/components/addTaskPage';


const PrivateRoute: React.FC<RouteProps> = observer(({ children, ...rest }) => {
    const { user } = useDeps();

    if (user.initialising) {
        return <InitialisingPage />;
    }
    return !!user.data
        ? children as React.ReactElement
        : <Redirect to={{ pathname: ROUTES.LOGIN }} />
});

const PublicRoute: React.FC<RouteProps> = observer(({ children, ...rest }) => {
    const { user } = useDeps();

    if (user.initialising) {
        return <InitialisingPage />;
    }
    return !user.data
        ? children as React.ReactElement
        : <Redirect to={{ pathname: ROUTES.ROOT }} />
});

export const Router = () =>
    <BrowserRouter>
        <Switch>
            <Route exact path={ROUTES.ROOT}>
                <PrivateRoute>
                    <CurrentTaskPage />
                </PrivateRoute>
            </Route>
            <Route exact path={ROUTES.ADD_TASK}>
                <PrivateRoute>
                    <AddTaskPage />
                </PrivateRoute>
            </Route>
            <Route exact path={ROUTES.LOGIN}>
                <PublicRoute>
                    <AuthPage />
                </PublicRoute>
            </Route>
            <Redirect to={{ pathname: ROUTES.ROOT }} />
        </Switch>
    </BrowserRouter>
