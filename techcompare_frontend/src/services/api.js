// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: 'http://techcompare.azurewebsites.net/techCompare',
//   timeout: 1000,
// });

// axiosInstance.interceptors.request.use(function (config) {
//     const token = localStorage.getItem('authToken');
//     console.log("token");
//     console.log(token);
//     if (token) {
//     //  headers.Authorization = "1232";
//       config.headers.Authorization = `Bearer ${token}`;
//       config.headers['Authorization'] = token;
//       config.headers['Authorization2'] = token;
//       console.log(config.headers.Authorization);
//     }
//     return config;
//   }, function (error) {
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
