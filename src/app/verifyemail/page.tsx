'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function verifyEmailPage() {
  const [token, settoken] = useState('');
  const [verified, setverified] = useState(false);
  const [error, seterror] = useState(false);
  // const router = useRouter();

  const verifyEmail = async () => {
    try {
      await axios.post('/api/users/verifyemail', { token });
      setverified(true);
      seterror(false);
    } catch (error: any) {
      seterror(true);
      console.error(error.response.data);
      toast.error('Error verifying email');
    }
  };

  useEffect(() => {
    seterror(false);
    // core javascript to get the token from the URL
    const tokenFromURL = window.location.search.split('=')[1];
    settoken(tokenFromURL || '');

    //Next.js way to get the token from the URL
    // const { query } = router;
    // const tokenFromURL = query.token; ;
  }, []);

  useEffect(() => {
    seterror(false);
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);

  return (
    <>
      <div className="max-w-md mx-auto mt-8 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-4 text-center">
          Verify Account
        </h1>
        <p className="mb-4">
          We are verifying your token. Please wait a moment.
        </p>
        <p className="mb-4 text-center mt-4">
          {token ? `${token}` : 'No token found'}
        </p>

        {verified && (
          <div className="mb-4">
            <p className="mb-2">Your email has been verified</p>
            <Link
              href="/login"
              className="text-blue-500 hover:underline text-center mx-auto"
            >
              Login here
            </Link>
          </div>
        )}

        {error && (
          <div className="mb-4">
            <p className="mb-2">
              There was an error verifying your email. Please try again later.
            </p>
            <Link
              href="/login"
              className="text-blue-500 hover:underline text-center"
            >
              Login here
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
