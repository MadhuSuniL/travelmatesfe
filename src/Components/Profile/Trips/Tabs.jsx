import { Tabs } from 'flowbite-react';
import { BiCalendarEvent, BiCheckCircle } from 'react-icons/bi';
import ProfileTripsSkeleton from '../../Skeletons/Trips/ProfileTripsSkeleton';
import apiCall from '../../../Functions/Axios';
import {useState, useEffect } from 'react';



function TripTabs({
  userData
}) {

  const [upCommingTrips, setUpCommingTrips] = useState([])
  const [completedTrips, setCompletedTrips] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getTrips = () => {
    let url = `users/user-trips/${userData.email}`
    let body = {}
    let method = 'get'
    const onSuccess = (data) => {
        setCompletedTrips(data.completed_trips)
        setUpCommingTrips(data.upcoming_trips)
    }

    apiCall(url, body, method, setIsLoading, onSuccess )
  }

  useEffect(()=>{
    getTrips()
  },[])

  return (
    <Tabs aria-label="Tabs with underline" className='justify-around border-0' style="underline">
      <Tabs.Item active title="Upcoming Trips" icon={BiCalendarEvent}>
          <ProfileTripsSkeleton usePrivate={true} trips = {upCommingTrips} skeletonCount={10} isLoading={isLoading} />
      </Tabs.Item>
      <Tabs.Item title="Old Trips" icon={BiCheckCircle}>
          <ProfileTripsSkeleton usePrivate={true} trips = {completedTrips} skeletonCount={10} isLoading={isLoading} />
      </Tabs.Item>
    </Tabs>
  );
}

export default TripTabs