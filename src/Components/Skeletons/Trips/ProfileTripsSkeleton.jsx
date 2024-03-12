import React from 'react'
import TripPublicCard from '../../Trips/Cards/TripPublicCard'
import { Card } from 'flowbite-react';
import { SiYourtraveldottv } from "react-icons/si";
import TripPrivateCard from '../../Trips/Cards/TripPrivateCard';

const NoData = () => {
    return (
        <div className='mt-10'>
            <center>
                <SiYourtraveldottv size={25} className='my-2'/>
            </center>
            <h1 className='text-center'>No trips found</h1>
        </div>
    )
}

const Skeleton = () => {
    return (
        <Card className='bg-main my-3'>
            <div className="flex flex-col gap-4 w-full">
                <div className="flex gap-4 items-center w-full">
                    <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
                    <div className="flex flex-col gap-4">
                    <div className="skeleton h-4 w-20"></div>
                    <div className="skeleton h-4 w-28"></div>
                    </div>
                </div>
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
            </div>

        </Card>
    )
}

const ProfileTripsSkeleton = ({
    trips,
    isLoading,
    skeletonCount,
    usePrivate
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
                    trips.length > 0 ?
                    usePrivate ?
                        trips.map(trip => <TripPrivateCard tripData = {trip} key={trip.uiid}/>)
                        :
                        trips.map(trip => <TripPublicCard tripData = {trip} key={trip.uiid}/>)
                    :
                    <NoData/>
                }

            </div>
        }
    </>
  )
}

export default ProfileTripsSkeleton