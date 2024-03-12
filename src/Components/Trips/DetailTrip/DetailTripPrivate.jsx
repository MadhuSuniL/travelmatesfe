import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import apiCall from '../../../Functions/Axios'
import ProfileAvatarSection from '../../Profile/ProfileAvatarSection'
import DestinationImg from '../../../assests/destination.png'
import { Button } from 'flowbite-react';
import { HiCalendar, HiInformationCircle} from 'react-icons/hi';
import Interactions from '../Interactions';
import Join from '../Join';

const DetailTripPrivate = () => {

  const {trip_id} = useParams()
  const [trip, setTrip] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const getTrip = () => {
    let url = `trips/${trip_id}`
    let body = {}
    let method = 'get'
    const onSuccess = (data) => {
      setTrip(data)
    }
    apiCall(url, body, method, setIsLoading, onSuccess)
  }

  useEffect(() => {
    getTrip()
  },[trip_id])
 
  return (
    <div className='grid lg:grid-cols-2 gap-2 items-center pb-20'>
      <div className='shadow-lg shadow-gray-700 p-2 my-2 rounded-lg'>
        <ProfileAvatarSection 
          name = {trip?.user_name}
          joinedIn={trip?.user?.user_details?.created_at}
          isFollower={trip?.user?.user_details?.is_follower_to_current_user}
          isFollowing={trip?.user?.user_details?.is_following_by_current_user}
          callBack={getTrip}
          email = {trip?.user?.email}
        />
      <div className="divider m-0"/> 
      <img className=' rounded-md duration-200 shadow-sm shadow-white' src= {trip?.trip_cover_img}/>
      {/* <img className=' rounded-md hover:scale-105 duration-200 shadow-sm shadow-white' src= "https://i1.wp.com/worldupclose.in/wp-content/uploads/2020/03/taj.jpg"/> */}
      <h5 className="text-xl text-main font-bold tracking-tight dark:text-white">
        {trip?.title}
      </h5>
      <div className='badge badge-outline mb-2'>{trip?.category}</div>
        <Button gradientMonochrome={'info'} className='badge px-0 mb-2 badge-outline'>
            <HiCalendar className='mr-1'/> {trip?.date} {trip?.time}
        </Button>
        <Button className='badge bg-success mb-2 px-0'><HiInformationCircle className='mr-1'/> {trip?.human_readable_time} </Button>

      <div className='flex justify-evenly gap-2'>
            <div>
                <h1>Available Slots</h1>
                <h1 className='text-center text-success'>{ trip?.group_size - trip?.connected_users} </h1>
            </div>
            <div className="divider lg:divider-horizontal"></div> 
            <div>
                <h1>Group Size</h1>
                <h1 className='text-center'>{trip?.connected_users} / {trip?.group_size}</h1>
            </div>
            <div className="divider lg:divider-horizontal"></div> 
            <div>
                <h1>Distance</h1>
                <h1 className='text-center'>{trip?.distance} KM</h1>
            </div>
      </div>

      <div className='flex justify-around items-center gap-2'>
          <div className='flex flex-col justify-center items-center'>
            <h1>From</h1>
            <h1 className='text-main text-center'>{trip?.address_to}</h1>
          </div>
          <img src={DestinationImg} className='h-10 mx-2' alt='img'/>
          <div className='flex flex-col justify-center items-center'>
            <h1>To</h1>
            <h1 className='text-main text-center'>{trip?.address_to}</h1>
          </div>
      </div>
      <Interactions trip = {trip} getTripData = {getTrip} />
      
      <Join tripId = {trip.uiid} />
      </div>


      <div>

      </div>
    </div>
  )
}

export default DetailTripPrivate