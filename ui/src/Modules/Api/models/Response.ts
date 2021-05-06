export type Response<T> = {
    status: 'SUCCESS',
    data: T;
} | {
    status: 'ERROR',
    error: string;
};
