import React, { useState } from 'react'
import { Button } from 'flowbite-react';
import { IoIosPersonAdd } from "react-icons/io";
import { IoCheckmarkDone } from "react-icons/io5";
import apiCall from '../../Functions/Axios';

const Join = ({
    requested,
    tripId
}) => {
    const [isRequested, setIsRequested] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleRequest = () => {
        let url = `trips/requests/${tripId}`
        let body = {}
        let method = 'post'
        const onSuccess = (data) => {
            setIsRequested(true)
        }

        apiCall(url, body, method, setIsLoading, onSuccess)
    }

  return (
    <>
        {
            isRequested ?
            <Button disabled gradientDuoTone="greenToBlue" className='flexitems-center font-bold' ><IoCheckmarkDone className='mx-1 ' size={20}/> Requeted</Button>
            :
            <Button isProcessing = {isLoading} onClick={handleRequest} gradientDuoTone="cyanToBlue" className='flexitems-center font-bold' ><IoIosPersonAdd className='mx-1' size={17}/> {isLoading ? 'Requesting..' : 'Join'}</Button>
        }
    </>
  )
}

export default Join