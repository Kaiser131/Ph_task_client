import axios from "axios";
import React from 'react';
const axiosSecure = axios.create({
    baseURL: 'https://ph-task-back.vercel.app',
    withCredentials: true
});

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;