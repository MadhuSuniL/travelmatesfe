import React, {useState} from 'react';
import TripForm from '../Components/Trips/TripForm';
import { useNavigate } from 'react-router-dom';
import { ReactTyped } from 'react-typed';
import "primereact/resources/themes/lara-light-cyan/theme.css";

const Publish = () => {
  const nav = useNavigate()
  const [openModal, setOpenModal] = useState(true);
  
  const handleCloseModal = () => {
    return nav(-1)
  };

  return (
      <div>
            <h1 className='text-center mb-3 md:text-xl'>
              <ReactTyped strings={['Publish Your Trip Now']} cursorChar='' typeSpeed={40} />
            </h1>
            <div className='p-2 pb-20'>
              <TripForm/>
            </div>
      </div>
  );
};

export default Publish;
