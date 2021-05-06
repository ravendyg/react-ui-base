import { action, makeObservable, observable, runInAction } from "mobx";
import { GoogleAuthArgs } from "Models/GoogleAuth";
import { RESPONSE_STATUSES } from "Modules/Api/constants";
import { Api } from "Modules/Api/models/Api";
import { Response } from "Modules/Api/models/Response";
import { EventBus } from "Modules/EventBus/EventBus";
import { User } from "./models/User";
import { UserState } from "./models/UserState";

const googleLibScriptId = 'google-auth-lib';

export class UserStateImp implements UserState {
    data: User | null = null;
    initialising = true;
    loading = false;
    error = '';

    constructor(
        private _api: Api,
        private _eventBus: EventBus,
    ) {
        makeObservable(this, {
            initialising: observable,
            data: observable,
            loading: observable,
            error: observable,
            loadUser: action.bound,
            loginWithGoogle: action.bound,
        });
    }

    async loadUser() {
        this.loading = true;
        const resp = await this._api.getUser();
        if (resp.status === RESPONSE_STATUSES.SUCCESS) {
            runInAction(() => {
                this.data = resp.data;
                this.error = '';
                this.loading = false;
                this.initialising = false;
            });
        } else {
            runInAction(() => {
                this.data = null;
                this.error = resp.error;
                this.loading = false;
                this.initialising = false;
            });
        }
    }

    loginWithGoogle() {
        try {
            this.loading = true;
            this._init(() => {
                // @ts-ignore
                const auth2 = window.gapi.auth2.getAuthInstance();
                auth2.currentUser.listen(this._handleGoogleSignIn);
                auth2.signIn();
            });
        } catch (e) {
            // @todo: handle error
            console.error(e);
            runInAction(() => this.loading = false)
        }
    }

    private async _init(cb: Function) {
        const doInit = () => {
            const googleClietnId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
            // @ts-ignore
            window.gapi.load('auth2', () => {
                // @ts-ignore
                window.gapi.auth2.init({
                    client_id: googleClietnId,
                    scope: 'profile email',
                }).then(cb);
            });
        };

        // Do not need to load google lib, if already have the user.
        let scr = document.querySelector(`#${googleLibScriptId}`) as HTMLScriptElement | null;
        if (!scr) {
            scr = document.createElement("script");
            scr.setAttribute('id', googleLibScriptId);
            scr.setAttribute('src', 'https://apis.google.com/js/platform.js');
            scr.onload = doInit;
            document.head.appendChild(scr);
        } else {
            doInit();
        }
    }

    private _handleGoogleSignIn = async (ga: GoogleAuthArgs) => {
        runInAction(() => {
            const idToken = ga.getAuthResponse()?.id_token;
            if (!idToken) {
                this.data = null;
                this.loading = false;
            } else {
                this._api.loginWithGoogle(idToken).then(this._handleUser);
            }
        });
    }

    private _handleUser = (resp: Response<User | null>) => {
        runInAction(() => {
            if (resp.status === RESPONSE_STATUSES.SUCCESS) {
                this.data = resp.data;
                this.error = '';
            } else {
                this.data = null;
                this.error = resp.error;
            }
            this.loading = false;
        });
    }
}
