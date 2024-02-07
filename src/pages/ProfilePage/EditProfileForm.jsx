import React, { useState } from 'react';
import './ProfilePage.css';
import localforage from 'localforage';
import { useAuth } from '../../context/AuthProvider';


export default function EditProfileForm({ onSave, initialData }) {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    languageLevel: '',
    ...initialData,
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      if (!user?.id) {
        throw new Error('User ID is not defined');
      }

      const updatedUser = { ...user, ...formData };

      const users = (await localforage.getItem('users')) || [];
      const updatedUsers = users.map((u) => (u.id === user.id ? updatedUser : u));
      await localforage.setItem('users', updatedUsers);

      updateUser(updatedUser);
      const userLocalStorageKey = `userData_${user.id}`;
      await localforage.setItem(userLocalStorageKey, updatedUser);

      onSave(updatedUser);

      setSuccessMessage('Your profile was successfully updated!');
    } catch (error) {
      console.error('Error updating user:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='success-edit-profile-msg'>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
      <div className='edit-profile-container'>
        <div className='editprofile-inputs'>
          <h2 className='edit-profile-name'>Edit Profile</h2>
          <br/>
          <br/>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Language Level:</label>
            <input
              type="text"
              name="languageLevel"
              value={formData.languageLevel}
              onChange={handleChange}
            />
          </div>
        </div>
        <button 
        className="edit-profile-page-btn" 
        type="button" 
        onClick={handleSave}>
          Save
        </button>
      </div>
    </>
  );
}