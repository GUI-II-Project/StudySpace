import React from 'react';
import NavBar from '../components/NavBar';
import logo_with_clouds from '../imgs/logo_with_clouds.png';
import main_page from '../imgs/main_page.png';

function LandingPage() {
  return (
  <div>
    <NavBar />

    <div style={{ marginTop: '4rem'}}>
        <h1 style={{ paddingBottom: '1rem', fontSize: '4rem', fontWeight: 'bold' }}>Study Space</h1>
        <h4 style={{ paddingBottom: '2rem', fontSize: '2rem', }}>Get into flow state.</h4>
        <button type="button" class="btn btn-dark">Get started</button>
        <h5 style={{ paddingTop: '7rem' }}>✨ One workspace for all your study needs ✨</h5>
    </div>

    <div style={{ marginTop: '2rem'}}>
      <img style={{ maxHeight: '500px' }} class="img-fluid" src={main_page} alt="main_page"/>
    </div>
    
    <div id="about" style={{ marginTop: '8rem', marginLeft: '8rem', marginRight: '8rem' }} class="row justify-content-left">
      <div class="col-6 text-start">
        <h4 style={{ paddingBottom: '5px', fontWeight: 'bold' }}>Getting into flow state is hard.</h4>
        <h5 class="text-muted" style={{ paddingBottom: '5px' }}>And one key barrier? Scattered study tools.</h5>
        <p style={{ paddingTop: '1rem' }}>Imagine being so immersed in your studies that the perception of time fades away, 
          distractions magically disappear, and learning feels practically effortless. This is 
          the flow state, a powerful cognitive mode of complete focus and clarity.</p>
        <p style={{ paddingTop: '1rem' }}>But getting into flow state is hard. And one key barrier? Scattered study tools. It 
          often feel like students spend more time setting up to study than actually studying. 
          Constant application flipping and context switching breaks concentration and makes it 
          harder to enter and sustain a flow state.</p>
        <p style={{ paddingTop: '1rem', fontWeight: 'bold' }}>Study Space solves this problem.</p>
      </div>
      <div class="col-6">
        <img style={{ maxHeight: '350px', paddingLeft: '5rem' }} class="img-fluid" src={logo_with_clouds} alt="logo_with_clouds"/>
      </div>
    </div>

    <div style={{ marginTop: '7rem', marginLeft: '8rem'}} class="row justify-content-left">
      <div class="col-5 text-start">
        <h4 style={{ paddingBottom: '5px', fontWeight: 'bold' }}>No more scattered tools. No more wasted time.</h4>
        <h5 class="text-muted">Just one platform to help you stay organized and focused.</h5>
      </div>
      <div class="col-5"></div>
    </div>

    <div id="features" style={{ marginTop: '2rem', marginBottom: '6rem', marginLeft: '8rem', marginRight: '8rem' }} class="row justify-content-left text-start row-gap-4">
      <div class="col-4">
        <h5 style={{ fontWeight: 'bold' }}>✏️ Take notes</h5>
        <p style={{ paddingTop: '5px' }}>Jot down and save your greatest ideas and thoughts in the notes tab.</p>
      </div>
      <div class="col-4">
        <h5 style={{ fontWeight: 'bold' }}>🗓️ Plan what's next</h5>
        <p style={{ paddingTop: '5px' }}>Access an integrated calendar to add events and see what's coming next.</p>
      </div>
      <div class="col-4">
        <h5 style={{ fontWeight: 'bold' }}>⏳ Stay focused</h5>
        <p style={{ paddingTop: '5px' }}>Enhance your productivity and time box your tasks with a Pomodoro timer.</p>
      </div>
      <div class="col-4">
        <h5 style={{ fontWeight: 'bold' }}>🎵 Feel the vibes</h5>
        <p style={{ paddingTop: '5px' }}>Set the mood with the music player and turn up that lofi.</p>
      </div>
      <div class="col-4">
        <h5 style={{ fontWeight: 'bold' }}>💡 Set the tasks</h5>
        <p style={{ paddingTop: '5px' }}>Keep track of deadlines and what you need to do with a handy task list.</p>
      </div>
      <div class="col-4">
        <h5 style={{ fontWeight: 'bold' }}>✨ Get inspired</h5>
        <p style={{ paddingTop: '5px' }}>Find some motivation with daily quotes to keep the flow going.</p>
     </div>
    </div>

    <footer class="bg-light pt-2 pb-2">
      <div class="container">
        <div class="text-center mt-3">
          <p>Study Space 2025. Created by Michelle, Sunny, David, Nik, and Lucas.</p>
        </div>
      </div>
    </footer>
  </div>
  );
}

 export default LandingPage;
