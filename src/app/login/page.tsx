'use client';
import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Loginpage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: { target: { id: any; value: any } }) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/users/login', formData);
      setFormData({ email: '', password: '' });
      router.push('/');
      toast.success('Login successful');
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        // If the error response contains a specific error message
        const errorMessage = error.response.data.error;
        toast.error(`Singn failed: ${errorMessage}`);
      } else {
        // If there's a generic error or no response from the server
        toast.error('Signup failed. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.email && formData.password;

  return (
    <div className="max-w-md mx-auto mt-8 p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold mb-4 text-center">Login </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-xl mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="p-2 border rounded-md w-full bg-gray-700"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-xl mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="p-2 border rounded-md w-full bg-gray-700"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out w-full ${
            loading || !isFormValid ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading || !isFormValid}
        >
          {loading ? 'Logging In...' : 'Login'}
        </button>
      </form>
      <Toaster />
    </div>
  );
}
