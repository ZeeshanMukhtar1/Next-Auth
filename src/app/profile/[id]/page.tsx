import React from 'react';

function Page({ params }: any) {
  return (
    <div className="mx-auto p-4  rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold mb-4 text-center text-white">
        Dynamic Profile
      </h1>
      <h2 className="text-xl font-semibold mb-2 text-center text-white">
        {params.id}
      </h2>
    </div>
  );
}

export default Page;
