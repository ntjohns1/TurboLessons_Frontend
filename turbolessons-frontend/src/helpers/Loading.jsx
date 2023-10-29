import React from 'react';
import Spinner from 'react-bootstrap/Spinner';


const Loading = () => {
  return (
    <>
      <Spinner animation="grow" role="status" variant="info" className='mx-1'>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <Spinner animation="grow" role="status" variant="info" className='mx-1'>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <Spinner animation="grow" role="status" variant="info" className='mx-1'>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </>
  );
};

export default Loading;
