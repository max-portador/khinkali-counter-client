import {NextApiRequest, NextApiResponse} from "next";
import {ILoginResponse} from "../../../api/authApi";
import {instanceSSR} from "../../../api/fetcherSSR";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ILoginResponse>
) {
    console.log('SSR REFRESH')
    try {
        let backendRes = await instanceSSR.get<ILoginResponse>('auth/refresh', {
            headers: { cookie: req.headers.cookie}
        })
        res.status(200).json(backendRes.data)
    }
    catch (error) {
        if (error.response.status == 401) {
            return res.status(401)
        } else {
            return error
        }

    }
}