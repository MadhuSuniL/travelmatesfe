import React, {useEffect, useState } from 'react'
import { Button, Card } from 'flowbite-react';
import { HiCalendar, HiInformationCircle} from 'react-icons/hi';
import DestinationImg from '../../../assests/destination.png'
import Interactions from '../Interactions';
import apiCall from '../../../Functions/Axios';
import EditTrip from '../EditTrip';
import Requests from '../Requests';

const TripPrivateCard = ({
  tripData
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
      <div className="divider m-0"/> 
      <img className=' rounded-md hover:scale-105 duration-200 shadow-sm shadow-white' src= {trip.trip_cover_img}/>
      <h5 className="text-xl text-main font-bold tracking-tight dark:text-white">
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
      <div className='flex justify-evenly items-center'>
        <EditTrip/>
        <Requests tripData={trip}/>
      </div>
    </Card>
  )
}

export default TripPrivateCard