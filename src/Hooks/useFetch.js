import {url} from "../constants";

export const handleFetch = async (method, body, specificUrl, goodCallback, badCallback) => {
    const data = await fetch(`${url}${specificUrl}`,{
        method,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if (data.status === 200) {
        console.log(data);
        goodCallback();
    }
    else {
        badCallback();
    }
    return await data.json();
}