import type { NextApiRequest, NextApiResponse } from 'next'
import {instanceSSR} from "../../../api/fetcherSSR";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    let {email, password} = req.body as {email: string, password: string}

    let backendRes = await instanceSSR.post('auth/login', {
        email, password
    } )
    let data = backendRes.data

    res.status(200).json(data)
}