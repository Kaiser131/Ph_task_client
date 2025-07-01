import axios from "axios";
import React from 'react';
const axiosCommon = axios.create({
    baseURL: 'http://localhost:5000'
});

const useAxiosCommon = () => {
    return axiosCommon;
};

export default useAxiosCommon;