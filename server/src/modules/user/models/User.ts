import { GoogleUser } from "./GoogleUser";

export type User = {
    id: number;
    googleData: GoogleUser | null;
};
