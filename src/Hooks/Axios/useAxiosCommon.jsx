import axios from "axios";
import React from 'react';
const axiosCommon = axios.create({
    baseURL: 'https://ph-task-back.vercel.app'
});

const useAxiosCommon = () => {
    return axiosCommon;
};

export default useAxiosCommon;