'use client';
import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toast } from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Profilepage() {
  const [data, setdata] = useState('');
  const router = useRouter();

  const getUserDetails = async () => {
    try {
      const res = await axios.get('/api/users/me');
      // console.log(res.data.data._id);
      setdata(res.data.data._id);
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch user details');
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axios.get('/api/users/logout');
      toast.success('Logout successful');
      router.push('/');
    } catch (error) {
      console.log(error);
      toast.error('Logout failed');
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4 bg-gray-700 rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold mb-4">Profile Page</h1>
      <p className="text-lg mb-6">Welcome to your profile page</p>
      <div className="flex items-center justify-between">
        <h2 className="text-xl mb-4">
          {data === '' ? (
            'No data found'
          ) : (
            <Link
              className="text-blue-500 hover:underline"
              href={`/profile/${data}`}
            >
              {data}
            </Link>
          )}
        </h2>
        <div>
          <button
            className="btn bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 mr-4"
            onClick={handleLogout}
          >
            Logout
          </button>
          <button
            className="btn bg-blue-500 text-white hover:bg-blue-600 px-4 py-2"
            onClick={getUserDetails}
          >
            Get User Details
          </button>
        </div>
      </div>
    </div>
  );
}
