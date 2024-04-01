import React from 'react';

function Page({ params }: any) {
  return (
    <>
      <h1>Dynamic Profile </h1>
      <h2>{params.id}</h2>
    </>
  );
}

export default Page;
