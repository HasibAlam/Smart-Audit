import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const Results = () => {
  // State to store vulnerabilities data
  const [vulnerabilities, setVulnerabilities] = useState([]);

  // Get the form data from the current location (passed from a previous page)
  const location = useLocation();
  const formData = location.state || {};

  useEffect(() => {
    // Fetch vulnerabilities when the component mounts
    fetchVulnerabilities();
  }, []);

  const fetchVulnerabilities = () => {
    console.log("Fetching vulnerabilities...");

    // Make an HTTP GET request to fetch vulnerabilities data from the API
    axios.get('http://localhost:8000/api/vulnerabilities')
      .then((response) => {
        if (response.status === 200) {
          // Update the state with the fetched vulnerabilities data
          setVulnerabilities(response.data.vulnerabilities);
          console.log("Fetched vulnerabilities:", response.data.vulnerabilities);
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .catch((error) => {
        console.error("API Fetch Error:", error);
        // Handle the error here, e.g., set an error state or display an error message.
      });
  };

  return (
    <div style={{ background: 'linear-gradient(to bottom, #2C001E, #190033)', color: 'white' }}>
      <div style={{ textAlign: 'center', padding: '20px', fontSize: '1.2em' }}>
        <h1>Congratulations, your upload was successful!</h1>

        {/* Display submitted form information */}
        <h2>Your submitted information:</h2>
        <p><strong>Name: </strong>{formData.name}</p>
        <p><strong>Description: </strong>{formData.description}</p>
        <p><strong>Date: </strong>{formData.date}</p>
        <p><strong>Email: </strong>{formData.email}</p>
        <p><strong>Phone Number: </strong>{formData.phonenum}</p>
        <p><strong>Uploaded File: </strong>{formData.uploadedFile ? formData.uploadedFile.name : 'No file uploaded'}</p>
      </div>

      {/* Smart Contract Audit Report */}
      <div style={{ fontSize: '1.2em' }}>
        <fieldset style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1>Smart Contract Audit Report</h1>
          <p><strong>Name: </strong>{formData.name}</p>
          <p><strong>Email: </strong>{formData.email}</p>
          <p><strong>Audit Date: </strong>{formData.date}</p>

          <h2>Vulnerabilities:</h2>

          {/* Check if there are vulnerabilities to display */}
          {vulnerabilities.length > 0 ? (
            <ul>
              {/* Map and display the first 15 vulnerabilities */}
              {vulnerabilities.slice(0, 15).map((vulnerability) => (
                <li key={vulnerability.vulnerability_id}>
                  <strong>Name:</strong> {vulnerability.vulnerability_name}
                  <br />
                  <strong>Impact:</strong> {vulnerability.impact}
                  <br />
                  <strong>Description:</strong> {vulnerability.description}
                  <br />
                  <ul>
                    {generateRecommendations(vulnerability)}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            // Display a message if there are no vulnerabilities
            <p>No vulnerabilities to display.</p>
          )}
        </fieldset>
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        {/* Link to the history page */}
        <Link to="/history.js">
          <button
            style={{
              backgroundColor: '#007BFF',
              color: 'white',
              padding: '10px 20px',
              fontSize: '16px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
          >
            View History
          </button>
        </Link>
      </div>
    </div>
  );
};

// Function to generate recommendations based on vulnerability name
const generateRecommendations = (vulnerability) => {
  switch (vulnerability.vulnerability_name) {
    case 'Reentrancy':
      return (
        <li>
          <strong>Recommendations:</strong>
          <br />
          For Reentrancy (High Impact): Implement proper access control and checks in your smart contract to prevent unauthorized or malicious calls to external contracts. Use the "checks-effects-interactions" pattern to avoid reentrancy vulnerabilities.
        </li>
      );
    case 'Overflow':
      return (
        <li>
          <strong>Recommendations:</strong>
          <br />
          For Overflow (Medium Impact): Carefully validate and sanitize user inputs to prevent integer overflows. Consider using SafeMath or similar libraries to handle arithmetic operations safely in your contract.
        </li>
      );
    case 'Underflow':
      return (
        <li>
          <strong>Recommendations:</strong>
          <br />
          For Underflow (Low Impact): Implement input validation and boundary checks to mitigate integer underflow vulnerabilities. Utilize SafeMath or similar libraries to ensure safe arithmetic operations in your contract.
        </li>
      );
    default:
      return null;
  }
};

export default Results;
