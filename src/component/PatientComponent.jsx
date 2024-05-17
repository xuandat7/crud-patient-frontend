import React, { useEffect, useState } from 'react'
import { createPatient, getPatient, updatePatient } from '../services/PatientService';
import { useNavigate, useParams } from 'react-router-dom';

const PatientComponent = () => {
  
  const [doctorId, setDoctorId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [patientInfo, setPatientInfo] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    bloodGroup: '',
    medicalHistory: '',
    healthInsurance: '',
    allergy: '',
    isCured: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const [errors, setErrors] = useState({});
  function confirmDelete(id) {
    setDeleteId(id);
    setShowModal(true);
}

function handleCloseModal() {
    setShowModal(false);
    setDoctorId('');
}

function handleDeletePatient() {
    const fixedDoctorId = 'BS116'; // Thay 'your_fixed_doctor_id_here' bằng ID bác sĩ cố định của bạn
    if (doctorId === fixedDoctorId) {
        deletePatient(deleteId).then(() => {
            getAllPatients();
        }).catch(error => {
            console.log(error);
        });
        setShowModal(false);
        setDoctorId('');
    } else {
        alert("Wrong Doctor ID");
    }
}
  
  function validateForm(data) {
    const errorsCopy = {... errors};
    let valid = true;
    // Kiểm tra các trường string
    if (data.firstName.trim()) {
      errorsCopy.firstName = '';
    }
    else{
      valid = false;
      errorsCopy.firstName = 'First name is required';
    }

    if (data.lastName.trim()) {
      errorsCopy.lastName = '';
    }
    else{
      errorsCopy.lastName = 'Last name is required';
      valid = false;
    }
    if (data.gender.trim()) {
      errorsCopy.gender = '';
    }
    else{
      errorsCopy.gender = 'Gender is required';
      valid = false;
    }
    if (data.bloodGroup.trim()) {
      errorsCopy.bloodGroup = '';
    }
    else{
      valid = false;
      errorsCopy.bloodGroup = 'Blood group is required';
    }
    if (data.medicalHistory.trim()) {
      errorsCopy.medicalHistory = '';
    }
    else{
      valid = false;
      errorsCopy.medicalHistory = 'Medical history is required';
    }
    if (data.healthInsurance.trim()) {
      errorsCopy.healthInsurance = '';
    }
    else{
      valid = false;
      errorsCopy.healthInsurance = 'Health insurance is required';
    }
    if (data.allergy.trim()) {
      errorsCopy.allergy = '';
    }
    else{
      valid = false;
      errorsCopy.allergy = 'Allergy is required';
    }
    
    setErrors(errorsCopy);
  
    return valid;
  }
  
  const {id} = useParams();
  
  const navigator = useNavigate();

  useEffect(() => {
    if(id){
      getPatient(id).then((response) => {
        setPatientInfo(response.data);
      }).catch(error => console.log(error));
    }
  }, [id])

  const saveOrUpdatePatient = (e) => {
    e.preventDefault();
    if(validateForm(patientInfo)){

      const patient = patientInfo;

      if(id){
        updatePatient(id, patient).then((response) => {
          console.log(response.data);
          navigator('/patients')
        }).catch(error => {
          console.error(error)
        })
      }
      else{

        // Thực hiện các hành động khi submit biểu mẫu, ví dụ: gửi dữ liệu đến server
        createPatient(patientInfo).then((response) => {
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
      return <h2>Update Patient</h2>
    }
    else{
      return <h2>Add Patient</h2> 
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

            <form onSubmit={saveOrUpdatePatient}>
              <div className='form-group mb-2'>

                <label className='form-label'> First Name:</label>
                  <input 
                    type="text" 
                    name="firstName" 
                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                    value={patientInfo.firstName} 
                    onChange={handleInputChange} 
                  />
                  {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
              </div>
              
              <div className='form-group mb-2'>

                <label className='form-label'> Last Name:</label>
                  <input 
                    type="text" 
                    name="lastName" 
                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                    value={patientInfo.lastName} 
                    onChange={handleInputChange} 
                    />
                  {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}

              </div>
              <div className='form-group mb-2'>

                <label className='form-label'> Gender:</label>
                  <input 
                    type="text" 
                    name="gender" 
                    className={`form-control ${errors.gender ? 'is-invalid' : ''}`}
                    value={patientInfo.gender} 
                    onChange={handleInputChange} 
                    />
                  {errors.gender && <div className='invalid-feedback'>{errors.gender}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'> Blood Group:</label>
                  <input 
                    type="text" 
                    name="bloodGroup" 
                    className={`form-control ${errors.bloodGroup ? 'is-invalid' : ''}`}
                    value={patientInfo.bloodGroup} 
                    onChange={handleInputChange} 
                    />
                  {errors.bloodGroup && <div className='invalid-feedback'>{errors.bloodGroup}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'> Medical History:</label>
                  <input 
                    type="text" 
                    name="medicalHistory" 
                    className={`form-control ${errors.medicalHistory ? 'is-invalid' : ''}`}
                    value={patientInfo.medicalHistory} 
                    onChange={handleInputChange} 
                    />
                  {errors.medicalHistory && <div className='invalid-feedback'>{errors.medicalHistory}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'> Health Insurance Information:</label>
                  <input 
                    type="text" 
                    name="healthInsurance" 
                    className={`form-control ${errors.healthInsurance ? 'is-invalid' : ''}`}
                    value={patientInfo.healthInsurance} 
                    onChange={handleInputChange} 
                    />
                  {errors.healthInsurance && <div className='invalid-feedback'>{errors.healthInsurance}</div>}
              </div>
              {/* <div className='form-group mb-2'>
                <label className='form-label'> Allergy:</label>
                  <input 
                    type="text" 
                    name="allergy" 
                    className={`form-control ${errors.allergy ? 'is-invalid' : ''}`}
                    value={patientInfo.allergy} 
                    onChange={handleInputChange} 
                    />
                  {errors.allergy&& <div className='invalid-feedback'>{errors.allergy}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'> Is Cured:</label>
                  <input 
                    type="checkbox" 
                    name="isCured" 
                    className='form-check-input'
                    checked={patientInfo.isCured} 
                    onChange={() => setPatientInfo(prevState => ({ ...prevState, isCured: !prevState.isCured }))} 
                  />
              </div> */}
              <button type="submit" className="btn btn-success" onClick={saveOrUpdatePatient}>Save</button>
            </form> 
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default PatientComponent