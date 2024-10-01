import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
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
      {/* Main Text with Fade-in Animation */}
      <h1
        style={{
          fontFamily: 'Skulls and Crossbones, sans-serif',
          fontSize: '50px',
          color: 'white',
          textAlign: 'center',
          textTransform: 'uppercase',
          animation: 'fadeIn 2s ease-in-out',
        }}
      >
        Dead Lock
      </h1>

      {/* Subtitle with Slide-Up Animation */}
      <p
        style={{
          fontFamily: 'sans-serif',
          fontSize: '25px',
          color: 'white',
          textAlign: 'center',
          maxWidth: '80%',
          marginTop: '20px',
          animation: 'slideUp 3s ease-in-out',
        }}
      >
        Leading Edge Smart Contract Auditing Platform
      </p>

      {/* Animated Image */}
      <img
        src="/homepage.png"
        alt="Homepage Banner"
        style={{
          maxWidth: '50%',
          maxHeight: '50vh',
          marginBottom: '20px',
          marginTop: '15px',
          animation: 'fadeIn 4s ease-in-out',
        }}
      />

      {/* Link Button with Hover Animation */}
      <Link to="/audit">
        <button
          style={{
            marginTop: '20px',
            padding: '15px 30px',
            borderRadius: '12px',
            background: 'linear-gradient(to bottom, #6A1B9A, #283593)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontSize: '18px',
            transition: 'background-color 0.5s, transform 0.5s',
            animation: 'fadeIn 5s ease-in-out',
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#311B92';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#6A1B9A';
            e.target.style.transform = 'scale(1)';
          }}
        >
          Request an Audit
        </button>
      </Link>

      {/* What is Dead-Lock Section */}
      <div
        style={{
          color: 'white',
          textAlign: 'left',
          maxWidth: '80%',
          marginTop: '50px',
          lineHeight: '1.8',
          animation: 'fadeIn 6s ease-in-out',
        }}
      >
        <h1>What is Dead-Lock</h1>
        <p style={{ fontSize: '20px' }}>
          Dead-Lock is a Smart Contract Audit System designed to aid users in pinpointing potential weaknesses within smart contract code. The platform's objective is to offer an interactive web interface where users can upload their smart contract code. Through the utilization of pre-existing static analysis tools for smart contracts, the platform can swiftly evaluate the contract code and flag possible concerns. Detection outcomes are readily accessible on the website, empowering users to promptly recognize and resolve any susceptibilities in their contracts.
        </p>
      </div>

      {/* Features Section */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '80%',
          color: 'white',
          marginTop: '50px',
          animation: 'fadeIn 7s ease-in-out',
        }}
      >
        {/* Left Column with Text */}
        <div style={{ width: '48%', textAlign: 'left' }}>
          <h2 style={{ fontSize: '28px' }}>Features of Dead-Lock</h2>
          <ul
            style={{
              listStyleType: 'disc',
              paddingLeft: '30px',
              lineHeight: '1.6',
              fontSize: '20px',
            }}
          >
            <li>Submitters can offer their smart contracts for auditing in popular formats like Solidity (.sol) files.</li>
            <li>Utilizing static analysis techniques, the system assesses smart contracts for potential vulnerabilities and security risks.</li>
            <li>A dedicated page showcases comprehensive audit reports, highlighting identified vulnerabilities and their categories.</li>
          </ul>

          <img
            src="/company2.png"
            alt="Company Image"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              animation: 'fadeIn 8s ease-in-out',
            }}
          />
        </div>

        {/* Right Column with Text and Image */}
        <div
          style={{
            width: '48%',
            borderLeft: '2px solid rgba(255, 255, 255, 0.4)', // Semi-transparent line
            paddingLeft: '20px',
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparent background color
          }}
        >
          <img
            src="/company1.png"
            alt="Company Image"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              animation: 'fadeIn 8s ease-in-out',
            }}
          />
          <ul
            style={{
              listStyleType: 'disc',
              paddingLeft: '30px',
              lineHeight: '1.6',
              fontSize: '20px',
              marginTop: '50px',
              textAlign: 'left',
            }}
          >
            <li>The platform offers tailored suggestions for each vulnerability category, enhancing the auditing process.</li>
            <li>Users have access to and can review previous audit reports for their convenience.</li>
            <li>Our company has some of the best experts in cybersecurity, auditing, data science, and blockchain.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
