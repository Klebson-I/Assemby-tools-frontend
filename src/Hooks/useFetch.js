import {url} from "../constants";

export const handleFetch = async (method, body, specificUrl, goodCallback, badCallback) => {
    let requestObject;
    if (method === 'GET') {
        requestObject = {
            method,
            headers: {
                'Content-Type': 'application/json',
            }
        }
    }
    else {
        requestObject = {
            method,
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            }
        }
    }
    const data = await fetch(`${url}${specificUrl}`,requestObject);

    if (data.status === 200) {
        goodCallback();
    }
    else {
        badCallback();
    }
    return await data.json();
}