import {url} from "../constants";

export const handleFetch = async (method, body, specificUrl) => {
    const data = await fetch(`${url}${specificUrl}`,{
        method,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return await data.json();
}