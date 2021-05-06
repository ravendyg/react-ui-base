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
                    <div>not implemeted</div>
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
