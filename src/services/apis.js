import axios from 'axios';

const version = '1.0';

axios.interceptors.request.use(
  config => {
    config.headers['Accepts-Version'] = version;
    //// Add required header such as auth tokens here
    return config;
  },
  error => Promise.reject(error),
);

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status) {
      if (error.response.status === 401) {
        // unauthorized error
      } else if (error.response.status === 403) {
        // access denied error
      } else {
        console.log(`Request failed!!`);
        window.location = '/';
      }
    } else if (!error.response) {
      console.log(`Request failed!!`);
      window.location = '/';
    }
    return Promise.reject(error);
  },
);

export default axios;