export type User = {
    id: number;
    googleData: GoogleUser | null;
};

export type GoogleUser = {
    email: string;
    familyName: string;
    givenName: string;
    imageUrl: string;
    name: string;
}
