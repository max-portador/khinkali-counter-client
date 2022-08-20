import {fetcher, instance} from "./baseApi";
import {IUserDetail} from "../types/user";
import {fetcherSSR} from "./fetcherSSR";


export const authApi = {
    login: async (email: string, password: string): Promise<IUserDetail> => {
        try {

            let request = () => instance.post( 'auth/login', {email, password})

            const [errors, data] = await fetcher<{user: IUserDetail}>(request)

            if (!errors && data) {
                return data.user
            }
            else {
                throw errors
            }
        } catch
            (e: any) {
            alert(e.message)
        }
    },

    logout: async (user: IUserDetail): Promise<boolean> => {
        try {
            const response = await instance.post<boolean>('/auth/logout', {
                user
            })
            const data = await response.data
            if (data) {
                return true
            } else throw new Error()
        } catch
            (e: any) {
            alert(e)
        }
    },

    meSSR: async (req, res): Promise<IUserDetail> => {
        try {
            let [errors, user] = await fetcherSSR.post<IUserDetail>(req, res, 'auth/me', undefined)
            if (!errors && user){
                return user
            }
            else throw errors

        } catch (e) {
            console.log(e.response?.data?.message)
        }
    },

    me: async (): Promise<IUserDetail> => {
        try{
            let response = await instance.post<IUserDetail>('auth/refresh')
            let user = response.data
            if (user.name) {
                return user
            }
            else throw new Error()
        }
        catch (e) {
            throw e
        }
    }


}


export interface ILoginResponse {
    user: IUserDetail;
    access_token: string;
}

