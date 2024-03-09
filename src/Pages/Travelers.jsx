import React, {useState, useEffect} from 'react'
import TripFilter from '../Components/Trips/TripFilter'
import TripSearchResults from '../Components/Trips/TripSearchResults'
import { useSelector } from 'react-redux'
import apiCall from '../Functions/Axios'

const Travelers = () => {

    const [trips, setTrips] = useState([])
    const [isLoading, setIsloading] = useState(false)
    const [showFilters, setShowFilters] = useState(false)
    const tripFilterState = useSelector(state => state.tripFilter.value);

    const getTrips = () => {
      const onSuccess = (data) => {
        setTrips(data)
      }
      let url = 'trips'
      let filters = Object.keys(tripFilterState).map(key => `${key}=${tripFilterState[key]}`)      
      url = url + '?' + filters.join('&')
      apiCall(
        url,
        {},
        'get',
        setIsloading,
        onSuccess
      )
    }

    useEffect(()=>{
      getTrips()
    },[tripFilterState])

  return (
    <div>
      <div className='grid md:grid-cols-12 gap-2'>
        <div className='hidden md:inline md:col-span-5 sshadow shadow-gray-500 rounded-md p-2'>
          <TripFilter trips = {trips}/>
        </div>
        <div className='md:col-span-7 sshadow shadow-gray-500 rounded-md p-2'>
          <TripSearchResults 
            trips = {trips}
            isLoading={isLoading}
            setShowFilters={setShowFilters}
            showFilters={showFilters}
          />
        </div>

      </div>

    </div>
  )
}

export default Travelers