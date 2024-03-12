import React, { useEffect, useState } from 'react'
import TripResultSkeleton from '../Skeletons/Trips/TripResultSkeleton'
import TripFilter from './TripFilter'
import { Drawer } from 'antd'
import apiCall from '../../Functions/Axios'

const TripSearchResults = ({
  trips,
  isLoading,
  showFilters,
  setShowFilters
}) => {

  return (
    <div>
        <div className='flex justify-around items-center'>
            <div className='flex flex-col items-center justify-center'>
                <h1 onClick={()=>setShowFilters(true)} className='text-main md:hidden'>Filters</h1>
                <h1 className='flex justify-end text-sm m-1 mx-2'>{trips.length} trips found</h1>
            </div>
        </div>
        <div className='pb-36 md:pb-20 overflow-auto h-screen'>
            <TripResultSkeleton trips={trips} skeletonCount={10} isLoading={isLoading}/>
        </div>
        <Drawer
        className='!bg-gray-800'
        placement={'bottom'}
        closable={false}
        onClose={()=> setShowFilters(false)}
        open={showFilters}
      >
        <TripFilter/>
      </Drawer>
    </div>
  )
}

export default TripSearchResults