import React from 'react';
import NavBar from '../components/NavBar';

function LandingPage() {
  return (
  <div>
    <NavBar />
    <div style={{ marginTop: '50px' }}>
        <h1 style={{ paddingBottom: '10px' }}>Study Space</h1>
        <h4 style={{ paddingBottom: '20px' }}>Get into flow state.</h4>
        <button type="button" class="btn btn-dark">Get started</button>

        <p style={{ paddingTop: '40px' }}>✨ One workspace for all your study needs ✨</p>
    </div>
  </div>
  );
}

 export default LandingPage;
