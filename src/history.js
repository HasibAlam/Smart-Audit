import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';  // Import axios

const History = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch the audit history data when the component mounts
    fetchAuditHistory();
  }, []);

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const fetchAuditHistory = () => {
    axios
      .get('http://localhost:8000/api/audit-history') // Replace with your server URL
      .then((response) => {
        if (response.status === 200) {
          setData(response.data);  // Update the data state with the fetched data
        }
      })
      .catch((error) => {
        console.error('Error fetching audit history:', error);
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
  >      
      <div className="container" style={{ maxWidth: '800px', width: '100%', padding: '40px', boxSizing: 'border-box', textAlign: 'center' }}>
        <h1>Audit History</h1>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          style={{ padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '10px', width: '100%', maxWidth: '300px' }}
        />
        <div style={{ margin: '20px' }}>
          <table>
            <thead>
              <tr>
                <th style={{ border: '1px solid red', padding: '8px', textAlign: 'center', background: 'lightgray' }}>Report Id</th>
                <th style={{ border: '1px solid red', padding: '8px', textAlign: 'center', background: 'lightgray' }}>Date Received</th>
                <th style={{ border: '1px solid red', padding: '8px', textAlign: 'center', background: 'lightgray' }}>Name</th>
                <th style={{ border: '1px solid red', padding: '8px', textAlign: 'center', background: 'lightgray' }}>File Submitted</th>
                <th style={{ border: '1px solid red', padding: '8px', textAlign: 'center', background: 'lightgray' }}>Categories of Vulnerabilities</th>
                <th style={{ border: '1px solid red', padding: '8px', textAlign: 'center', background: 'lightgray' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter((record) =>
                  record.date.includes(searchTerm) ||
                  record.name.includes(searchTerm) ||
                  record.id.toString().includes(searchTerm)
                )
                .map((record) => (
                  <tr key={record.id}>
                    <td style={{ border: '1px solid red', padding: '8px', textAlign: 'center' }}>{record.id}</td>
                    <td style={{ border: '1px solid red', padding: '8px', textAlign: 'center' }}>{record.date}</td>
                    <td style={{ border: '1px solid red', padding: '8px', textAlign: 'center' }}>{record.name}</td>
                    <td style={{ border: '1px solid red', padding: '8px', textAlign: 'center' }}>{record.uploaded_file}</td>
                    <td style={{ border: '1px solid red', padding: '8px', textAlign: 'center' }}>{record.description}</td>
                    <td style={{ border: '1px solid red', padding: '8px', textAlign: 'center' }}>
                      <Link to="/audithistory">Report</Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
