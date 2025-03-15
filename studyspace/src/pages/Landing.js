import React from 'react';
import NavBar from '../components/NavBar';
import logo_with_clouds from '../imgs/logo_with_clouds.png';
import main_page from '../imgs/main_page.png';

function LandingPage() {
  return (
  <div>
    <NavBar />
    <div style={{ marginTop: '80px'}}>
        <h1 style={{ paddingBottom: '10px', fontSize: '70px', fontWeight: 'bold' }}>Study Space</h1>
        <h4 style={{ paddingBottom: '30px', fontSize: '40px', }}>Get into flow state.</h4>
        <button type="button" class="btn btn-dark">Get started</button>
        <h5 style={{ paddingTop: '100px' }}>✨ One workspace for all your study needs ✨</h5>
    </div>

    <div style={{ marginTop: '40px'}}>
      <img src={main_page} alt="main_page" height="500"/>
    </div>
    
    <div style={{ marginTop: '120px' }} class="row justify-content-center">
      <div class="col-5 text-start">
        <h4 style={{ paddingBottom: '5px' }}>Getting into flow state is hard.</h4>
        <h5 class="text-muted">And one key barrier? Scattered study tools.</h5>
        <p style={{ paddingTop: '10px' }}>Imagine being so immersed in your studies that the perception of time fades away, 
          distractions magically disappear, and learning feels practically effortless. This is 
          the flow state, a powerful cognitive mode of complete focus and clarity.</p>
        <p style={{ paddingTop: '10px' }}>But getting into flow state is hard. And one key barrier? Scattered study tools. It 
          often feel like students spend more time setting up to study than actually studying. 
          Constant application flipping and context switching breaks concentration and makes it 
          harder to enter and sustain a flow state.</p>
        <p style={{ paddingTop: '10px', fontWeight: 'bold' }}>Study Space solves this problem.</p>
      </div>
      <div class="col-5">
        <img src={logo_with_clouds} alt="logo_with_clouds" height="350"/>
      </div>
    </div>

    <div style={{ marginTop: '120px', marginBottom: '80px' }} class="row justify-content-center">
      <div class="col-5 text-start">
        <h4 style={{ paddingBottom: '5px' }}>No more scattered tools. No more wasted time.</h4>
        <h5 class="text-muted">Just one platform to help you stay organized and focused.</h5>
      </div>
      <div class="col-5"></div>
    </div>
    
  </div>
  );
}

 export default LandingPage;
