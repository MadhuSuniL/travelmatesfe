import React, {useState} from 'react';
import TripForm from '../Components/Trips/TripForm';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'flowbite-react';
import { ReactTyped } from 'react-typed';

const Publish = () => {
  const nav = useNavigate()
  const [openModal, setOpenModal] = useState(true);
  
  const handleCloseModal = () => {
    return nav(-1)
  };

  return (
      <div>
            <h1 className='text-center md:text-xl'>
              <ReactTyped strings={['Publish Your Trip Now']} cursorChar='' typeSpeed={40} />
              </h1>
            <TripForm/>
      </div>
  );
};

export default Publish;
