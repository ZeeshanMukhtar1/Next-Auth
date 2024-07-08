'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // if you are using next.js 12 or above, use 'next/navigation' instead of 'next/router otherwise u will see error "NextRouter was not mounted" 😁

interface userData {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  isAdmin: boolean;
}

export default function Profilepage() {
  const [userData, setUserData] = useState<userData | null>(null);
  const router = useRouter();

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const response = await axios.get('/api/users/me');
      setUserData(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch user details');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success('Logout successful');
      router.push('/');
    } catch (error) {
      console.error(error);
      toast.error('Logout failed');
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4 bg-gray-700 rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold mb-4 text-center">Profile Page</h1>
      <p className="text-lg mb-6 text-center">Welcome to your profile page</p>

      {userData && (
        <div>
          <p>
            <strong>Id:</strong>{' '}
            <Link
              className="text-blue-500 hover:underline"
              href={`/profile/${userData._id}`}
            >
              {userData._id}
            </Link>
          </p>
          <p>
            <strong>Username:</strong> {userData.username}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Creation Date:</strong>{' '}
            {new Date(userData.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Creation Date:</strong>{' '}
            {new Date(userData.updatedAt).toLocaleString()}
          </p>
          <p>
            <strong>Verified:</strong> {userData.isVerified ? 'Yes' : 'No'}
          </p>
          <p>
            <strong>Admin:</strong> {userData.isAdmin ? 'Yes' : 'No'}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <button
          className="btn bg-blue-500 text-white hover:bg-blue-600 px-4 py-2"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
