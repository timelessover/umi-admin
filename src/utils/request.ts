import { fetch } from 'dva';
const host = 'http://127.0.0.1:7001'

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export const post = async (url, params) => {
    const options = {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'content-type': 'application/json',
            'Authorization': localStorage.getItem('token') || ''
        }
    }

    const response = await fetch(host + url, options);

    checkStatus(response);

    const data = await response.json();

    return data;
};

export const get = async (url) => {

    const options = {
        'Authorization': JSON.parse(localStorage.getItem('token')) || ''
    }

    const response = await fetch(host + url, options);

    checkStatus(response);

    const data = await response.json();

    return data;
};
