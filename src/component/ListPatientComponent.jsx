import React, { useEffect, useState } from 'react';
import { deletePatient, listPatients } from '../services/PatientService';
import { useNavigate } from 'react-router-dom';

const ListPatientComponent = () => {

    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('all');
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortField, setSortField] = useState('id');
    const [doctorId, setDoctorId] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [updateId, setUpdateId] = useState(null);

    const navigator = useNavigate();

    useEffect(() => {
        getAllPatients();
    }, []);

    function getAllPatients() {
        listPatients().then((response) => {
            setPatients(response.data);
        }).catch(error => console.error(error));
    }

    function addNewPatient() {
        navigator('/add-patient');
    }

    function viewResult(id) {
        navigator(`/edit-result/${id}`);
    }

    function updatePatient(id) {
        setUpdateId(id);
        setShowUpdateModal(true);
    }

    function confirmDelete(id) {
        setDeleteId(id);
        setShowDeleteModal(true);
    }

    function handleCloseDeleteModal() {
        setShowDeleteModal(false);
        setDoctorId('');
    }

    function handleCloseUpdateModal() {
        setShowUpdateModal(false);
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
            setShowDeleteModal(false);
            setDoctorId('');
        } else {
            alert("Wrong Doctor ID");
        }
    }

    function handleUpdatePatient() {
        const fixedDoctorId = 'BS116'; // Thay 'your_fixed_doctor_id_here' bằng ID bác sĩ cố định của bạn
        if (doctorId === fixedDoctorId) {
            navigator(`/edit-patient/${updateId}`);
            setShowUpdateModal(false);
            setDoctorId('');
        } else {
            alert("Wrong Doctor ID");
        }
    }

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };

    const handleSortFieldChange = (event) => {
        setSortField(event.target.value);
    };

    const sortedPatients = patients.slice().sort((a, b) => {
        const sortOrderFactor = sortOrder === 'asc' ? 1 : -1;
        if (sortField === 'id') {
            return sortOrderFactor * (a.id - b.id);
        } else {
            return sortOrderFactor * a.lastName.localeCompare(b.lastName);
        }
    });

    const filteredPatients = sortedPatients.filter(patient =>
        searchField === 'all' ||
        patient[searchField].toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    const fields = [
        { value: 'all', label: 'All' },
        { value: 'id', label: 'ID' },
        { value: 'firstName', label: 'First Name' },
        { value: 'lastName', label: 'Last Name' },
        { value: 'gender', label: 'Gender' },
        { value: 'bloodGroup', label: 'Blood Group' },
        { value: 'healthInsurance', label: 'Health Insurance' }
    ];

    const sortOptions = [
        { value: 'id', label: 'Sort by ID' },
        { value: 'lastName', label: 'Sort by Last Name' }
    ];

    return (
        <div className='container'>
            <h2 className='text-center'>Thông tin bệnh nhân</h2>
            <div className=''>
                {/* <button className='btn btn-primary mb-2' onClick={addNewPatient}> Add Patient</button> */}
            </div>
            <div className='row'>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="form-group mb-2">
                    <select
                        className="form-select-sm"
                        value={searchField}
                        onChange={(e) => setSearchField(e.target.value)}
                    >
                        {fields.map((field, index) => (
                            <option key={index} value={field.value}>{field.label}</option>
                        ))}
                    </select>
                    <select
                        className="form-select-sm"
                        value={sortField}
                        onChange={handleSortFieldChange}
                    >
                        {sortOptions.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <select
                        className="form-select-sm"
                        value={sortOrder}
                        onChange={handleSortOrderChange}
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>

                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Gender</th>
                            <th>Blood Group</th>
                            <th>Health Insurance</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPatients.map(patient => (
                            <tr key={patient.id}>
                                <td>{patient.id}</td>
                                <td>{patient.firstName}</td>
                                <td>{patient.lastName}</td>
                                <td>{patient.gender}</td>
                                <td>{patient.bloodGroup}</td>
                                <td>{patient.healthInsurance}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => updatePatient(patient.id)}>Update Patient Info</button>
                                    <button className='btn btn-danger' onClick={() => confirmDelete(patient.id)} style={{ marginLeft: '5px' }}>Delete Patient</button>
                                    <button className='btn btn-dark' onClick={() => viewResult(patient.id)} style={{ marginLeft: '5px' }}>Latest Result</button>
                                    {/* <button className='btn btn-info' onClick={() => addResult()} style={{ marginLeft: '5px' }}>Add Result</button> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showDeleteModal && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Fill your doctorID to verify your delete</h5>
                                <button type="button" className="btn-close" onClick={handleCloseDeleteModal}></button>
                            </div>
                            <div className="modal-body">
                                <label htmlFor="doctorId">Enter Doctor ID:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="doctorId"
                                    value={doctorId}
                                    onChange={(e) => setDoctorId(e.target.value)}
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseDeleteModal}>Close</button>
                                <button type="button" className="btn btn-danger" onClick={handleDeletePatient}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showUpdateModal && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Fill your doctorID to Update PatientInfo</h5>
                                <button type="button" className="btn-close" onClick={handleCloseUpdateModal}></button>
                            </div>
                            <div className="modal-body">
                                <label htmlFor="doctorId">Enter Doctor ID:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="doctorId"
                                    value={doctorId}
                                    onChange={(e) => setDoctorId(e.target.value)}
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseUpdateModal}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleUpdatePatient}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListPatientComponent;
