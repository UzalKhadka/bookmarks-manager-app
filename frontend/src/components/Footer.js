import React from 'react'

const Footer = () => {
  return (
    // <!-- footer section -->
    <footer className='footer-section'>
      <div className='footer-container'>
        <div className='footer-content'>
          <div className='info'>
            <div className='about-us'>
              <p className='title'>About the Project</p>
              <p className='about-info'>
                Bookmarks Manager is a Web Application created using the
                currently trending MERN Stack where frontend development is done
                using React (R), database using MongoDB (M), and backend using
                Express.js (E) and Node.js (N), collectively making the MERN
                stack. In this app, users can create their own account, save
                bookmarks in a cattegorized format, and import and export
                bookmarks to and fro.
              </p>
            </div>
            <div className='members'>
              <p className='title'>Project Members</p>
              <ul>
                <li>
                  <strong>Project Manager</strong>
                  :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Sahaja Phuyal
                </li>
                <li>
                  <strong>Business Analyst</strong>
                  :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Bishistha Barma
                </li>
                <li>
                  <strong>Frontend Developer</strong>:&nbsp; Ganesh Acharya
                </li>
                <li>
                  <strong>Backend Developer</strong>:&nbsp;&nbsp; Pranab
                  Shrestha
                </li>
                <li>
                  <strong>Backend Developer</strong>:&nbsp;&nbsp; Ujjal Khadka
                </li>
              </ul>
            </div>
          </div>

          <div className='line'></div>

          <div className='copyright-bar'>
            <p>
              <span>Bookmark Manager App</span> &copy; 2021 - All Rights
              Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
