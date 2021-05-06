import axios from 'axios';
import { EventBus } from 'Modules/EventBus/EventBus';
import { User } from 'Modules/User/models/User';
import { getEnv } from 'utils';
import { RESPONSE_STATUSES } from './constants';

import { Api } from "./models/Api";
import { Response } from './models/Response';
import { UserDto } from './models/UserDto';

const AXIOS_SETTINGS = {
    baseURL: getEnv('REACT_APP_API_URL'),
    withCredentials: true,
};
const api = axios.create(AXIOS_SETTINGS);

export class ApiImpl implements Api {
    private _sessionId: string = '';

    constructor(private _eventBus: EventBus) { }

    async getUser(): Promise<Response<User | null>> {
        try {
            const {
                data: {
                    user,
                },
            } = await api.get<UserDto>('/user');
            return {
                status: RESPONSE_STATUSES.SUCCESS,
                data: user,
            };
        } catch (e) {
            console.error(e);
            return {
                status: RESPONSE_STATUSES.ERROR,
                error: 'Server error',
            };
        }
    }

    async loginWithGoogle(idToken: string) {
        try {
            const {
                data: {
                    user,
                    sessionId
                }
            } = await api.post('/user/signup-google', {
                idToken
            });
            this._sessionId = sessionId;
            return {
                status: RESPONSE_STATUSES.SUCCESS,
                data: user,
            };
        } catch (e) {
            console.error(e);
            return {
                status: RESPONSE_STATUSES.ERROR,
                error: 'Server error',
            };
        }
    }

    async signOut() {
        try {
            await api.post('/user/sign-out');
        } catch (e) {
            console.error(e);
        }
    }
}
