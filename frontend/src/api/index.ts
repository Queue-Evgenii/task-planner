import axios from 'axios';
const httpProtocol = import.meta.env.VUE_APP_HTTP_PROTOCOL || 'http';
const httpsProtocol = import.meta.env.VUE_APP_HTTPS_PROTOCOL || 'https';

axios.defaults.baseURL = 'http://localhost:3000/api';

axios.defaults.httpAgent =
  import.meta.env.NODE_ENV === 'production' ? false : httpProtocol === 'http';
axios.defaults.httpsAgent =
  import.meta.env.NODE_ENV === 'production' ? true : httpsProtocol === 'https';

axios.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json';
  config.headers['Accept'] = 'application/json';

  const rawToken = localStorage.getItem('access_token');
  const token = rawToken ? JSON.parse(rawToken) : '';
  const authorizationToken = token ? `Bearer ${token}` : '';
  config.headers.Authorization = authorizationToken;
  return config;
});

export default axios;
