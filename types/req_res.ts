import {AxiosResponse} from "axios";

export enum StatusCode {
    'OK'= 200,
    'Unauthorized'= 401
}

export type RequestFunc = () => Promise<AxiosResponse>
export type QueryResponse<T> = [error: string | null, data: T | null]