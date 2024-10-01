import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for API requests
import { Link, useNavigate } from 'react-router-dom';

const AuditPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    email: '',
    phonenum: '',
    pwd: '',
    uploadedFile: null,
  });

  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, uploadedFile: file });
  };

  const handleSubmit = async () => {
    if (!formData.uploadedFile) {
      alert('Please upload a .sol file.');
      return; // Gives a message if no file is uploaded
    }

    // Create a FormData object to send the form data and file
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('date', formData.date);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phonenum', formData.phonenum);
    formDataToSend.append('pwd', formData.pwd);
    formDataToSend.append('uploadedFile', formData.uploadedFile);

    try {
      // Send the form data and file to the API endpoint
      const response = await axios.post('http://localhost:8000/api/upload/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        alert('Audit completed successfully.');
        // Takes you to the Results page if successful
        navigate('/results', { state: formData });
      } else {
        // Handle processing error if needed
        alert('Audit failed: ' + response.data.message);
      }
    } catch (error) {
      // Handle upload or processing errors
      alert('An error occurred: ' + error.message);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url("/homepack.jpeg")`, // Update background to use your image
        backgroundSize: 'cover', // Ensures the image covers the whole page
        backgroundPosition: 'center', // Centers the image
        backgroundRepeat: 'no-repeat', // Prevents the image from repeating
      }}
    >
      <h1 style={{ fontStyle: 'italic', marginBottom: '20px' }}>Submit Your Audit</h1>
      <div
        className="container"
        style={{
          maxWidth: '800px',
          width: '100%',
          padding: '40px',
          boxSizing: 'border-box',
          textAlign: 'center',
        }}
      >
        <form>
          {/* Name input field */}
          <label style={{ marginBottom: '20px', display: 'block' }}>Name:</label>
          <input
            type="text"
            name="name"
            maxLength="20"
            required
            pattern="[A-Za-z0-9 ,.!]+"
            title="name"
            style={{ marginBottom: '40px', width: '100%' }}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          {/* Description input field */}
          <label>Description:</label>
          <textarea
            name="description"
            rows="4"
            cols="50"
            maxLength="250"
            required
            style={{ marginBottom: '40px', width: '100%' }}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          ></textarea>

          {/* Date input field */}
          <label>Date:</label>
          <input
            type="date"
            name="date"
            required
            style={{ marginBottom: '40px' }}
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <br></br>

          {/* Email input field */}
          <label>Your email address:</label>
          <input
            type="text"
            name="email"
            maxLength="40"
            title="email"
            style={{ marginBottom: '40px', width: '100%' }}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          {/* Phone Number input field */}
          <label>Phone Number:</label>
          <input
            type="text"
            name="phonenum"
            required
            pattern="+\\d{2-3}-\\d{9}"
            title="phonenum"
            style={{ marginBottom: '40px', width: '100%' }}
            value={formData.phonenum}
            onChange={(e) => setFormData({ ...formData, phonenum: e.target.value })}
          />

          {/* Password input field */}
          <label>Password:</label>
          <input
            type="text"
            name="pwd"
            maxLength="15"
            required
            pattern="[A-Za-z0-9 ,.!]+"
            title="pwd"
            style={{ marginBottom: '40px', width: '100%' }}
            value={formData.pwd}
            onChange={(e) => setFormData({ ...formData, pwd: e.target.value })}
          />

          {/* File upload section */}
          <div className="upload-section" style={{ marginTop: '40px' }}>
            <label className="upload-label">Upload Your .sol File:</label>
            <input
              type="file"
              accept=".sol"
              onChange={handleFileUpload}
              style={{ marginBottom: '40px' }}
            />
            {formData.uploadedFile && (
              <div className="uploaded-file">
                <p>Uploaded File: {formData.uploadedFile.name}</p>
              </div>
            )}
          </div>

          {/* Submit button */}
          <input
            className="submit"
            type="button"
            value="Submit"
            style={{
              marginTop: '40px',
              background: 'red',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '10px',
              fontSize: '18px',
              cursor: 'pointer',
              transition: 'background-color 0.3s, color 0.3s',
            }}
            onClick={handleSubmit} // Call handleSubmit on button click
          />
        </form>

        {/* Back to Home Page link */}
        <div className="footer-nav" style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link to="/" style={{ color: 'violet' }}>Back to Home Page</Link>
        </div>
      </div>
    </div>
  );
};

export default AuditPage;