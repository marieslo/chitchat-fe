import './ProfilePage.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function ProfilePage() {

  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');
  const [userData, setUserData] = useState(null);

  useEffect(() => {

    axios.get(`http://localhost:8000/user/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('There was a problem with the request:', error);
      });
  }, []);

  return (
    <div>
      {userData ? (
        <div>
          <h1>User Info</h1>
          <p>Name: {userData.firstName}</p>
          <p>Surname: {userData.lastName}</p>
          <p>Email: {userData.email}</p>
          <p>Language level: {userData.level}</p>          
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
