import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/patients';

export const listPatients = () => {
    return axios.get(REST_API_BASE_URL);
}

export const createPatient = (patientInfo) =>  {
    return axios.post(REST_API_BASE_URL, patientInfo)
}

export const getPatient = (patientId) => axios.get(REST_API_BASE_URL + '/' + patientId);

export const updatePatient = (patientId, patient) => axios.put(REST_API_BASE_URL + '/' + patientId, patient);

export const deletePatient = (patientId) => axios.delete(REST_API_BASE_URL + '/' + patientId);