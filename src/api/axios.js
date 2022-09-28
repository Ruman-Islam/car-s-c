import axios from 'axios';
const baseURL = 'https://car-s-s-sn55.vercel.app/api/v1/'

const fetcher = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// fetcher.interceptors.request.use(
//     (config) => {
//         // const token = `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`;
//         const token = JSON.parse(localStorage.getItem('accessToken'));
//         if (token) {
//             config.headers.authorization = token;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error),
// );

// fetcher.interceptors.response.use(function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
// }, function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
// });

export default fetcher;