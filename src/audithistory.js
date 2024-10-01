import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Audithistory = () => {
  const [vulnerabilities, setVulnerabilities] = useState([]);

  useEffect(() => {
    fetchVulnerabilities();
  }, []);

  const fetchVulnerabilities = () => {
    console.log("Fetching vulnerabilities...");
    axios.get('http://localhost:8000/api/vulnerabilities') // Replace with your API endpoint
      .then((response) => {
        if (response.status === 200) {
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
    >      <div style={{ textAlign: 'center', padding: '20px', fontSize: '1.2em' }}>
        <h1>Smart Contract Audit History</h1>
      </div>

      <div style={{ fontSize: '1.2em' }}>
      
      <h2>Vulnerabilities:</h2>
          {vulnerabilities.length > 0 ? (
            <ul>
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
            <p>No vulnerabilities to display.</p>
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
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
            Back to Audit History
          </button>
        </Link>
      </div>
    </div>
  );
};

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

export default Audithistory;
