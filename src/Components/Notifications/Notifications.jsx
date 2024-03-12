import React, { useEffect, useState } from 'react';
import { Button, Popover } from 'antd';
import { FaHandshakeAngle } from "react-icons/fa6";
import NotificationSkeleton from '../Skeletons/Notifications/NotificationSkeleton';
import {getData} from '../../Functions/LocalStorage'
import apiCall from '../../Functions/Axios'

const Notifications = ({
    mobile,
}) => {

    const [unSeenCount, setUnSeenCount] = useState(100)


  return (
    <div>
        {
            mobile ?
            <NotificationPopover>
                <div className='relative'>
                    <FaHandshakeAngle size={20}/>
                    <span className='badge badge-outline border-error text-main text-[11px] -top-4 -left-7 mx-1 absolute p-1'>{unSeenCount > 99 ? '99+' : unSeenCount }</span>
                </div>
            </NotificationPopover>
            :
            <NotificationPopover>
                <button className={`mx-2 `}>
                    <center>
                        <div className='relative'>
                            <FaHandshakeAngle size={20}/>
                            <span className='badge badge-outline border-error text-main text-[11px] -top-3 left-7 mx-1 absolute p-1'>{unSeenCount > 99 ? '99+' : unSeenCount }</span>
                        </div>
                        <span className="ml-1">Pings</span>
                    </center>
                </button>
            </NotificationPopover>
        }
    </div>
  )
}

export default Notifications

const NotificationPopover = ({
    children
}) => {
  const [clicked, setClicked] = useState(false);
  const [pings, setPings] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const handleClickChange = (open) => {
    setClicked(open);
  };

  const getPings = () => {
    let url = `extra/pings`
    let body = {}
    const onSuccess = (data) => {
        setPings(data)
    }
    apiCall(url, body, 'get', setIsLoading, onSuccess)
}

    useEffect(()=>{
        getPings()
    },[])


  const clickContent = <div className='max-w-[400px] text-white'>
        <h1 className='text-main'>Pings 23.4K</h1>
        <div className='overflow-auto h-[400px]'>
            <NotificationSkeleton pings = {pings} isLoading={isLoading} skeletonCount={10}/>
        </div>
    </div>;

  return (
      <Popover
        content={clickContent}
        trigger="click"
        open={clicked}
        color = '#1f2937'
        onOpenChange={handleClickChange}
      >
        {children}
      </Popover>
  );
};