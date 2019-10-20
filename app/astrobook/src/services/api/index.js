import axios from 'axios'
import config from './config'

export const callApi = (call) => {
    let defaultHeaders = {}

    let {
        endpoint,
        method = 'GET',
        params = {},
        data = {},
        headers = {},
        showJSON = false
    } = call

    let url = config.url + endpoint

    // Merge headers info
    headers = Object.assign({}, defaultHeaders, headers);

    console.log(`[${title} - CALL API COMPLETE]`, { headers, method, url, params, data });

    axios.interceptors.response
    .use(function (response) {
        console.log(`${title} - RESPONSE`, response)
        return response;
    }, function (error) {
        console.log(`${title} - ERROR`, error)
        return Promise.reject(error);
    })

    if (showJSON) {
        console.log(`[${title} - CALL API JSON DATA]`, JSON.stringify(data))
    }
    if (method === 'GET') {
        return axios(url, {
            params,
            headers,
            method
        })
    } else {
        return axios(url, { headers, method, params, data });
    }
}
