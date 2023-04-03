import axios from "axios";

let refresh = false;

axios.interceptors.response.use(res => res, async err => {
    if (err.message === 401 && !refresh) {
        refresh = true;

        console.log(localStorage.getItem('refresh_token'));
        const response = await axios.post('http://localhost:8000/token/refresh/', {
                refresh: localStorage.getItem('refresh_token')
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }            
            }, { withCredentials: true });

        if (response.status === 200) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['access']}`;
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);

            return axios(err.config);
        }
    }
    refresh = false;
    return err;
})