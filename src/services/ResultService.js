import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/results';

export const listResults = () => {
    return axios.get(REST_API_BASE_URL);
}

export const createResult = (resultInfo) =>  {
    return axios.post(REST_API_BASE_URL, resultInfo)
}

export const getResult = (resultId) => axios.get(REST_API_BASE_URL + '/' + resultId);

export const updateResult = (resultId, result) => axios.put(REST_API_BASE_URL + '/' + resultId, result);

export const deleteResult = (resultId) => axios.delete(REST_API_BASE_URL + '/' + resultId);