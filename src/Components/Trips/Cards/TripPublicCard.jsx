import React from 'react'
import { Avatar, Button, Card } from 'flowbite-react';
import { HiCalendar, HiInformationCircle} from 'react-icons/hi';
import { IoUnlink, IoPersonRemove } from 'react-icons/io5';
import DestinationImg from '../../../assests/destination.png'

const TripPublicCard = ({
  trip
}) => {
  return (
    <Card href="#" className="bg-transparent my-2 hover:bg-transparent">
      <div className='flex justify-between items-center'>
        <Avatar className='justify-start' img="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" rounded>
        <div className="space-y-1 font-medium dark:text-white">
            <div>{trip.user_name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Joined in August 2014</div>
        </div>
        </Avatar>
        {/* <div>
            <div className='badge badge-outline'>UnFollow</div>
        </div> */}
        <div>
            <Button pill gradientMonochrome={'info'}>Follow</Button>
        </div>
      </div>
      <div className="divider m-0"/> 
      <img className=' rounded-md hover:scale-105 duration-200 shadow-sm shadow-white' src= {trip.trip_cover_img}/>
      {/* <img className=' rounded-md hover:scale-105 duration-200 shadow-sm shadow-white' src= "https://i1.wp.com/worldupclose.in/wp-content/uploads/2020/03/taj.jpg"/> */}
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
                <h1 className='text-center text-success'>{ trip.group_size - trip.connected_users} </h1>
            </div>
            <div className="divider lg:divider-horizontal"></div> 
            <div>
                <h1>Group Size</h1>
                <h1 className='text-center'>{trip.connected_users} / {trip.group_size}</h1>
            </div>
            <div className="divider lg:divider-horizontal"></div> 
            <div>
                <h1>Distance</h1>
                <h1 className='text-center'>{trip.distance} KM</h1>
            </div>
      </div>

      <div className='flex justify-around items-center gap-2'>
          <div>
            <h1>From</h1>
            <h1 className='text-main text-center'>{trip.from_address}</h1>
          </div>
          <img src={DestinationImg} className='h-14' alt='img'/>
          <div>
            <h1>To</h1>
            <h1 className='text-main text-center'>{trip.to_address}</h1>
          </div>
      </div>
      <Button gradientDuoTone="greenToBlue" sgradientMonochrome={'info'}>Join</Button>
    </Card>
  )
}

export default TripPublicCard