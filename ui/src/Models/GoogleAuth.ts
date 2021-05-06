export type GoogleBasicProfile = {
    getEmail: () => string;
    getName: () => string;
    getFamilyName: () => string;
    getGivenName: () => string;
    getId: () => string;
    getImageUrl: () => string;
}

export type GoogleAuthResponse = {
    access_token: string;
    expires_at: number;
    expires_in: number;
    first_issued_at: number;
    id_token: string;
    idpId: string;
    login_hint: string;
    scope: string;
    session_state: {
        extraQueryParam: {
            authuser: string;
        };
    };
    token_type: string;
};

export type GoogleAuthArgs = {
    getBasicProfile: () => GoogleBasicProfile;
    getAuthResponse: () => GoogleAuthResponse;
};
