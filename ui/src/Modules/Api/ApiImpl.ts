import axios, { CancelTokenSource } from 'axios';
import { EventBus } from 'Modules/EventBus/EventBus';
import { NeedToCreate } from 'Modules/Task/models/NeedToCreate';
import { Task } from 'Modules/Task/models/Task';
import { User } from 'Modules/User/models/User';
import { getEnv } from 'utils';
import { RESPONSE_STATUSES } from './constants';

import { Api } from "./models/Api";
import { RequestCancel } from './models/RequestCancel';
import { Response } from './models/Response';
import { UserDto } from './models/UserDto';
import { RequestCancelImpl } from './RequestCancelImpl';

const AXIOS_SETTINGS = {
    baseURL: getEnv('REACT_APP_API_URL'),
    withCredentials: true,
};
const api = axios.create(AXIOS_SETTINGS);
const cancelTokens = new WeakMap<RequestCancel, CancelTokenSource>();

export class ApiImpl implements Api {
    constructor(private _eventBus: EventBus) { }

    async getUser() {
        return this._run<User | null>(async () => {
            const {
                data: {
                    user,
                },
            } = await api.get<UserDto>('/users');
            return user;
        });
    }

    async loginWithGoogle(idToken: string) {
        return this._run<User | null>(async () => {
            const {
                data: { user }
            } = await api.post('/users/signup-google', {
                idToken
            });
            return user;
        });
    }

    async signOut() {
        return this._run<void>(async () => await api.post('/users/sign-out'));
    }

    getRequestCancel() {
        return new RequestCancelImpl(
            (self) => {
                const token = cancelTokens.get(self);
                if (token) {
                    token.cancel();
                }
            },
        );
    }

    async getCurrentTask(_cancelToken?: RequestCancel) {
        return this._run<Task | null>(async () => {
            const cancelToken = _cancelToken
                ? cancelTokens.get(_cancelToken)?.token
                : undefined;
            const { data } = await api.get('/tasks/current', { cancelToken });
            return data;
        });
    }

    async getNeedToCreate(_cancelToken?: RequestCancel) {
        return this._run<NeedToCreate | null>(async () => {
            const cancelToken = _cancelToken
                ? cancelTokens.get(_cancelToken)?.token
                : undefined;
            const { data } = await api.get('/tasks/need-to-create', { cancelToken });
            return data;
        });
    }

    private async _run<T>(cb: () => Promise<T>): Promise<Response<T>> {
        try {
            const data = await cb();
            return {
                status: RESPONSE_STATUSES.SUCCESS,
                data,
            };
        } catch (e) {
            console.error(e);
            return {
                status: RESPONSE_STATUSES.ERROR,
                error: 'Server error',
            };
        }
    }
}
