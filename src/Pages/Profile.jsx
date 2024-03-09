import React from 'react'
import Stats from '../Components/Profile/Stats/Stats';
import {getData} from '../Functions/LocalStorage'
import TripTabs from '../Components/Profile/Trips/Tabs';



const Profile = () => {
    const userData = getData('user') || {};

  return (
    <div className='grid md:grid-cols-2 gap-2'>
        <div className='p-1'>
          {/* Stats  */}
          <div className='border-0 rounded-lg shadow shadow-gray-400 border-cyan-600'>
            <Stats userData={userData}/>
          </div>
        </div>
        <div >
          <div sclassName='border-2 px-2 rounded-lg shadow-md shadow-cyan-400 border-cyan-600'>
            <TripTabs/>
          </div>
        </div>
    </div>
  )
}

export default Profile