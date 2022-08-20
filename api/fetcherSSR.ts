import {IncomingMessage, ServerResponse} from "http";
import {QueryResponse, RequestFunc, StatusCode} from "../types/req_res";
import axios, {AxiosError} from "axios";
import {ILoginResponse} from "./authApi";

export const serverURL = process.env.SERVER_URL

export const instanceSSR = axios.create({
    baseURL: serverURL,
    withCredentials: true,
})

const refreshTokens = async (req: IncomingMessage, res: ServerResponse) => {
    const response = await instanceSSR.post<ILoginResponse>(`auth/refresh`, undefined, {
        headers: {
            cookie: req.headers.cookie || ''
        },
    })
    const cookies = response.headers['set-cookie'] as unknown as string
    req.headers.cookie = cookies || ''
    res.setHeader('set-cookie', cookies || '')
}


const handleRequest = async (req: IncomingMessage, res: ServerResponse, request: RequestFunc) => {
    try {
        return await request()
    } catch (error: any) {
        if (error instanceof AxiosError &&
            error?.response?.status === StatusCode.Unauthorized) {
            try {
                await refreshTokens(req, res)
                return await request()
            } catch (innerError) {
                return innerError
            }
        }
        else {
            return  error
        }

    }
}
export const fetcherSSR = {
    baseRequest: async function <T>(
        req: IncomingMessage,
        res: ServerResponse,
        request: RequestFunc): Promise<QueryResponse<T>> {
        try {
            const {data} = await handleRequest(req, res, request)
            return [null, data]
        } catch (e) {
            return [e, null]
        }
    },

    get: async function <T>(req: IncomingMessage, res: ServerResponse, url: string) {
        const getRequestFunc = () => instanceSSR.get<T>(url, {headers: {cookie: req.headers?.cookie || ''}})
        return fetcherSSR.baseRequest<T>(req, res, getRequestFunc)
    },

    post: async function <T>(req: IncomingMessage, res: ServerResponse, url: string, payload: unknown) {
        const getRequestFunc = () => instanceSSR.post<T>(url, payload, {headers: {cookie: req?.headers?.cookie || ' '}})
        return fetcherSSR.baseRequest<T>(req, res, getRequestFunc)
    },


}