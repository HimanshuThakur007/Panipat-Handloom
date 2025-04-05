import axios from 'axios';

function useFetch() {
  const getsessionData = JSON.parse(sessionStorage.getItem('encryptedData'));
//   const port = process.env.REACT_APP_PRO_PORT;
    const myUrl = process.env.REACT_APP_PRO_BASEURL;
    const Token  =  getsessionData?.token;

    const ServerRequest = async (req) => {
        try {
            const response = await axios(req);
            return { response, data: response.data };
        } catch (error) {
            return { response: error.response, data: error.response.data };
        }
    };

    const callFetch = async (url, label, body) => {
        // const baseURL = `${myUrl}:${port}`;
        const baseURL = `${myUrl}`;
        const urlStr = baseURL + url;

        // Create headers conditionally based on the existence of the token
        const headers = {
            'Content-Type': 'application/json',
            ...(Token && { 'Authorization': `Bearer ${Token}` })
        };

        const config = { headers };

        try {
            let response;
            if (label === 'POST') {
                response = await axios.post(urlStr, body, config);
            } else {
                response = await axios.get(urlStr, config);
            }
            return { res: response, got: response.data };
        } catch (error) {
            return { res: error.response, got: error.response.data };
        }
    };

    return callFetch;
}

export default useFetch;
