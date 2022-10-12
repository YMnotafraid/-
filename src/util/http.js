import axios from 'axios'
import {store} from '../redux/store'
axios.defaults.baseURL="http://localhost:5000"

axios.interceptors.request.use(function (config) {
    store.dispatch({
        type:'change_spinning',
        payload:true
    })
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    store.dispatch({
        type:'change_spinning',
        payload:false
    })
    return response;
  }, function (error) {
    store.dispatch({
        type:'change_spinning',
        payload:false
    })
    return Promise.reject(error);
  });