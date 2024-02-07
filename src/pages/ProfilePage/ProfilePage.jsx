import React, {useEffect} from 'react';
import localforage from 'localforage';
import { useAuth } from '../../context/AuthProvider.jsx';
import EditProfileForm from './EditProfileForm';

export default function MyProfilePage() {
  const { user, updateUser } = useAuth();

  const handleSave = async (formData) => {
    try {

      updateUser({ ...user, ...formData });
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };


useEffect(() => {
    const updateUserData = async () => {
      const userLocalStorageKey = `userData_${user.id}`;
      const existingUserData = await localforage.getItem(userLocalStorageKey) || {};
      const updatedUserData = { ...existingUserData, ...user };
      await localforage.setItem(userLocalStorageKey, updatedUserData);
    };

    if (user) {
      updateUserData();
    }
  }, [user]);

  return (
    <div className='profile-page-container'>
      {user && <EditProfileForm userId={user.id} initialData={user} onSave={handleSave} />}
    </div>
  );
}
