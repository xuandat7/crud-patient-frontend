import React, { useEffect, useState } from 'react'
import { createPatient, getPatient, updatePatient } from '../services/PatientService';
import { useNavigate, useParams } from 'react-router-dom';
import { createResult, updateResult, getResult } from '../services/ResultService';

const ResultComponent = () => {
  
  const [resultInfo, setResultInfo] = useState({
    medicalHistory: '',
    symptom: '',
    allergy: '',
    isCured: false,
    diagnosis: '',
    prescription: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResultInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const [errors, setErrors] = useState({});
  
  function validateForm(data) {
    const errorsCopy = {... errors};
    let valid = true;
    // Kiểm tra các trường string
    if (data.medicalHistory.trim()) {
      errorsCopy.medicalHistory = '';
    }
    else{
      valid = false;
      errorsCopy.medicalHistory = 'Medical History is required';
    }

    if (data.symptom.trim()) {
      errorsCopy.symptom = '';
    }
    else{
      errorsCopy.symptom = 'Symptom is required';
      valid = false;
    }
    if (data.allergy.trim()) {
      errorsCopy.allergy = '';
    }
    else{
      errorsCopy.allergy = 'Allergy is required';
      valid = false;
    }
    if (data.diagnosis.trim()) {
      errorsCopy.diagnosis = '';
    }
    else{
      valid = false;
      errorsCopy.diagnosis = 'diagnosis is required';
    }
    if (data.prescription.trim()) {
      errorsCopy.prescription = '';
    }
    else{
      valid = false;
      errorsCopy.prescription = 'Prescription is required';
    }
    
    setErrors(errorsCopy);
  
    return valid;
  }
  
  const {id} = useParams();
  
  const navigator = useNavigate();

  useEffect(() => {
    if(id){
      getResult(id).then((response) => {
        setResultInfo(response.data);
      }).catch(error => console.log(error));
    }
  }, [id])

  const saveOrUpdateResult = (e) => {
    e.preventDefault();
    if(validateForm(resultInfo)){

      const result = resultInfo;

      if(id){
        updateResult(id, result).then((response) => {
          console.log(response.data);
          navigator('/patients')
        }).catch(error => {
          console.error(error)
        })
      }
      else{

        // Thực hiện các hành động khi submit biểu mẫu, ví dụ: gửi dữ liệu đến server
        createResult(resultInfo).then((response) => {
          console.log(response.data);
          navigator("/patients")
        }).catch(error => {
          console.error(error);
        }) 
      }
    }
  };

  function pageTitle(){
    if(id){
      return <h2>Update Result</h2>
    }
    else{
      return <h2>Add Result</h2> 
    }
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3 mb-4 mt-4'>
          {
            pageTitle()
          }
          <div className='card-body'>

            <form onSubmit={saveOrUpdateResult}>
              <div className='form-group mb-2'>

                <label className='form-label'> Medical History:</label>
                  <input 
                    type="text" 
                    name="medicalHistory" 
                    className={`form-control ${errors.medicalHistory ? 'is-invalid' : ''}`}
                    value={resultInfo.medicalHistory} 
                    onChange={handleInputChange} 
                  />
                  {errors.medicalHistory && <div className='invalid-feedback'>{errors.medicalHistory}</div>}
              </div>
              <div className='form-group mb-2'>

                <label className='form-label'> Symptom:</label>
                  <input 
                    type="text" 
                    name="symptom" 
                    className={`form-control ${errors.symptom ? 'is-invalid' : ''}`}
                    value={resultInfo.symptom} 
                    onChange={handleInputChange} 
                  />
                  {errors.symptom && <div className='invalid-feedback'>{errors.symptom}</div>}
              </div>
              
              <div className='form-group mb-2'>

                <label className='form-label'> Allergy: </label>
                  <input 
                    type="text" 
                    name="allergy" 
                    className={`form-control ${errors.allergy ? 'is-invalid' : ''}`}
                    value={resultInfo.allergy} 
                    onChange={handleInputChange} 
                    />
                  {errors.allergy && <div className='invalid-feedback'>{errors.allergy}</div>}

              </div>
              <div className='form-group mb-2'>

                <label className='form-label'> Diagnosis: </label>
                  <input 
                    type="text" 
                    name="diagnosis" 
                    className={`form-control ${errors.gender ? 'is-invalid' : ''}`}
                    value={resultInfo.diagnosis} 
                    onChange={handleInputChange} 
                    />
                  {errors.diagnosis && <div className='invalid-feedback'>{errors.diagnosis}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'> Prescription:</label>
                  <input 
                    type="text" 
                    name="prescription" 
                    className={`form-control ${errors.prescription ? 'is-invalid' : ''}`}
                    value={resultInfo.prescription} 
                    onChange={handleInputChange} 
                    />
                  {errors.prescription&& <div className='invalid-feedback'>{errors.prescription}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'> Is Cured: </label>
                  <input 
                    type="checkbox" 
                    name="isCured" 
                    className='form-check-input'
                    checked={resultInfo.isCured} 
                    onChange={() => setResultInfo(prevState => ({ ...prevState, isCured: !prevState.isCured }))} 
                  />
              </div>
              <button type="submit" className="btn btn-success" onClick={saveOrUpdateResult}>Save</button>
            </form> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultComponent