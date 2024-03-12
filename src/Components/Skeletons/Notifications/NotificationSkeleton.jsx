import React from 'react'
import { Card } from 'flowbite-react';
import { SiYourtraveldottv } from "react-icons/si";
import NotificationLabelBox from '../../Notifications/NotificationLabelBox';

const NoData = () => {
    return (
        <div className='mt-10'>
            <center>
                <SiYourtraveldottv size={25} className='my-2'/>
            </center>
            <h1 className='text-center'>No Comments</h1>
        </div>
    )
}

const Skeleton = () => {
    return (
        <Card className='bg-main my-3'>
            <div className="flex flex-col gap-4 w-full">
                <div className="flex gap-4 items-center w-full">
                    <div className="skeleton w-12 h-12 rounded-full shrink-0"></div>
                    <div className="flex flex-col gap-4">
                    <div className="skeleton h-1 w-20"></div>
                    <div className="skeleton h-2 w-72"></div>
                    <div className="skeleton h-2 w-44"></div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

const NotificationSkeleton = ({
    pings,
    isLoading,
    skeletonCount
}) => {
  return (
    <>
        {
            isLoading ?
            <div>
                {
                    Array.from({ length: skeletonCount }, (_, index) => index + 1)
                    .map(index => <Skeleton key={index}/>)
                }
            </div>
            : 
            <div>
                {
                    pings.length > 0 ?
                    pings.map(ping => <NotificationLabelBox ping = {ping} key={ping.id}/>)
                    :
                    <NoData/>
                }

            </div>
        }
    </>
  )
}

export default NotificationSkeleton