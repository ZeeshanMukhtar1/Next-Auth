import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="text-center text-white">
        <h1 className="mb-4 text-4xl font-bold">
          Welcome to Next.Js Authentication
        </h1>
        <p className="mb-6 text-lg flex-wrap mx-12">
          A Straightforward Next.js auth system with key API endpoints for
          signup, login, profile retrieval, email verification, logout, and
          password recovery.
        </p>
      </div>
    </div>
  );
}
