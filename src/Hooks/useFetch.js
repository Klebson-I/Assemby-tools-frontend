import {url} from "../constants";

export const handleFetch = async (method, body, specificUrl, goodCallback, badCallback) => {
    let requestObject;

    if (!specificUrl) {
        return {
            err: 'No url',
        }
    }

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

    const uncodeData = await data.json();

    console.log(uncodeData);

    console.log(data);

    if (data.status === 200) {
        goodCallback(uncodeData);
    }
    else {
        badCallback(uncodeData);
    }
    return uncodeData;
}