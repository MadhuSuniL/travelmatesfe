import React, { useEffect, useState } from 'react'
import { Button, Card } from 'flowbite-react';
import { HiCalendar, HiInformationCircle} from 'react-icons/hi';
import { IoUnlink, IoPersonRemove } from 'react-icons/io5';
import DestinationImg from '../../../assests/destination.png'
import Interactions from '../Interactions';
import ProfileAvatarSection from '../../Profile/ProfileAvatarSection';
import apiCall from '../../../Functions/Axios';
import Join from '../Join';
import { BsEmojiSmile } from "react-icons/bs";

const TripPublicCard = ({
  tripData,
  children,
}) => {

    const [trip, setTrip] = useState(tripData)
    const [isLoading, setIsloading] = useState(false)

    const getTripData =() => {
      let url = `trips/${trip.uiid}`
      let body = {}
      let method = 'get'
      const onSuccess = (data) => {
        setTrip(data)
      }
      apiCall(url, body, method, setIsloading, onSuccess)
    }

    useEffect(()=>{
      setTrip(tripData)
    },[tripData])

  return (
    <Card className="bg-transparent my-2 hover:bg-transparent">
      <ProfileAvatarSection 
        name = {trip.user_name}
        joinedIn={trip.trip_user?.user_details?.created_at}
        isFollower={trip.trip_user?.user_details?.is_follower_to_current_user}
        isFollowing={trip.trip_user?.user_details?.is_following_by_current_user}
        callBack={getTripData}
        email = {trip.trip_user?.email}
      />
      <div className="divider m-0"/> 
      <img className=' rounded-md hover:scale-105 duration-200 shadow-sm shadow-white' src= {trip.trip_cover_img}/>
      {/* <img className=' rounded-md hover:scale-105 duration-200 shadow-sm shadow-white' src= "https://i1.wp.com/worldupclose.in/wp-content/uploads/2020/03/taj.jpg"/> */}
      <h5 className="text-xl cp text-main font-bold tracking-tight dark:text-white">
        {trip.title}
      </h5>
      <div className='badge badge-outline m-0'>{trip.category}</div>
        <Button gradientMonochrome={'info'} className='badge px-0 badge-outline'>
            <HiCalendar className='mr-1'/> {trip.date} {trip.time}
        </Button>
        <Button className='badge bg-success px-0'><HiInformationCircle className='mr-1'/> {trip.human_readable_time} </Button>

      <div className='flex justify-evenly gap-2'>
            <div>
                <h1>Available Slots</h1>
                <h1 className='text-center text-success'>{ trip.group_size - trip.connected_users_count} </h1>
            </div>
            <div className="divider lg:divider-horizontal"></div> 
            <div>
                <h1>Group Size</h1>
                <h1 className='text-center'>{trip.connected_users_count} / {trip.group_size}</h1>
            </div>
            <div className="divider lg:divider-horizontal"></div> 
            <div>
                <h1>Distance</h1>
                <h1 className='text-center'>{trip.distance} KM</h1>
            </div>
      </div>

      <div className='flex justify-around items-center gap-2'>
          <div className='flex flex-col justify-center items-center'>
            <h1>From</h1>
            <h1 className='text-main text-center'>{trip.address_to}</h1>
          </div>
          <img src={DestinationImg} className='h-10 mx-2' alt='img'/>
          <div className='flex flex-col justify-center items-center'>
            <h1>To</h1>
            <h1 className='text-main text-center'>{trip.address_to}</h1>
          </div>
      </div>

      <Interactions trip = {trip} getTripData = {getTripData} />
      <div className='text-sm flex items-center bg-gray-800 rounded-badge p-3 text-gray-500'>
        <BsEmojiSmile size={20} className='mx-2'/>
        <p className='mx-3'>{trip.description}</p>
      </div>
      <Join tripId = {trip.uiid} />
    </Card>
  )
}

export default TripPublicCard