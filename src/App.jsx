import React, { useState } from 'react';
import './App.css';
import Header from './Header.jsx';
import AboutUs from './AboutUs.jsx';
import ImageCarousel from './ImageCarousel.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Send the first and last name to the PHP script
    fetch('http://kpj.c24.mytemp.website/dbconnect.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ first_name: firstName, last_name: lastName }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data); // Add this line to see the fetched data
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  };

  return (
    <div className="App">
      <Header />
      <AboutUs />
      <ImageCarousel />

      <div className="volunteer-form">
        <h2>Enter Your Name to View Events</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>

      <div className="data-display">
        <h2>Event Information</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : data.length > 0 ? (
          <ul>
            {data.map((item, index) => (
              <li key={index}>
                <strong>Event Name:</strong> {item.Event_Name}<br />
                <strong>Description:</strong> {item.Event_Desc}<br />
                <strong>Date:</strong> {item.Event_Date}<br />
                <strong>Location:</strong> {item.Event_Location}<br />
                <strong>Hours Worked:</strong> {item.Event_Hours}<br />
                <strong>Accomplishments:</strong> {item.Event_Accomplishment}<br /><br />
              </li>
            ))}
          </ul>
        ) : (
          <p>No events found for this volunteer.</p>
        )}
      </div>
    </div>
  );
}

export default App;
