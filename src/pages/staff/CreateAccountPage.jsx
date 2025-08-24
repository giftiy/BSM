// /src/pages/staff/CreateAccountPage.jsx

import React, { useState } from 'react';
import StaffLayout from '../../components/layout/staff/StaffLayout';
import { FaUser, FaMapMarkerAlt, FaFileUpload, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import './CreateAccountPage.css'; // Faayilii CSS haaraa ni uumna

const CreateAccountPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    firstName: '', lastName: '', dateOfBirth: '', gender: 'Male', motherName: '',
    // Step 2
    address: '', city: '', country: 'Ethiopia',
    // Step 3
    nationalIdPhoto: null, customerPhoto: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    }
  };

  const nextStep = () => setStep(prev => prev < 3 ? prev + 1 : prev);
  const prevStep = () => setStep(prev => prev > 1 ? prev - 1 : prev);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission (e.g., API call)
    console.log('Form Data Submitted:', formData);
    alert('Account created successfully!');
    // Reset form or redirect
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="form-step">
            <h3 className="step-title"><FaUser /> Personal Information</h3>
            <div className="form-grid">
              <div className="form-group"><label>First Name</label><input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} /></div>
              <div className="form-group"><label>Last Name</label><input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} /></div>
              <div className="form-group"><label>Date of Birth</label><input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} /></div>
              <div className="form-group"><label>Gender</label><select name="gender" value={formData.gender} onChange={handleInputChange}><option>Male</option><option>Female</option></select></div>
              <div className="form-group full-width"><label>Mother's Maiden Name</label><input type="text" name="motherName" value={formData.motherName} onChange={handleInputChange} /></div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="form-step">
            <h3 className="step-title"><FaMapMarkerAlt /> Address Details</h3>
            <div className="form-grid">
              <div className="form-group full-width"><label>Full Address</label><input type="text" name="address" value={formData.address} onChange={handleInputChange} /></div>
              <div className="form-group"><label>City</label><input type="text" name="city" value={formData.city} onChange={handleInputChange} /></div>
              <div className="form-group"><label>Country</label><input type="text" name="country" value={formData.country} onChange={handleInputChange} readOnly /></div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="form-step">
            <h3 className="step-title"><FaFileUpload /> Document Upload</h3>
            <div className="form-grid">
                <div className="form-group file-upload">
                    <label>National ID Photo</label>
                    <input type="file" name="nationalIdPhoto" onChange={handleFileChange} />
                    {formData.nationalIdPhoto && <p className="file-name">{formData.nationalIdPhoto.name}</p>}
                </div>
                <div className="form-group file-upload">
                    <label>Customer Photo</label>
                    <input type="file" name="customerPhoto" onChange={handleFileChange} />
                    {formData.customerPhoto && <p className="file-name">{formData.customerPhoto.name}</p>}
                </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <StaffLayout>
      <div className="create-account-container">
        <div className="page-header">
          <h1>Create New Customer Account</h1>
          <p>Please fill out the form below in steps.</p>
        </div>

        <form className="account-form" onSubmit={handleSubmit}>
          {/* Progress Bar */}
          <div className="progress-bar">
            <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1. Personal</div>
            <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2. Address</div>
            <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>3. Documents</div>
          </div>

          <div className="form-content">
            {renderStep()}
          </div>

          <div className="form-navigation">
            {step > 1 && <button type="button" className="nav-btn prev" onClick={prevStep}><FaArrowLeft /> Previous</button>}
            {step < 3 && <button type="button" className="nav-btn next" onClick={nextStep}>Next <FaArrowRight /></button>}
            {step === 3 && <button type="submit" className="nav-btn submit">Create Account</button>}
          </div>
        </form>
      </div>
    </StaffLayout>
  );
};

export default CreateAccountPage;