import React, { useEffect, useState } from 'react'
import { IoSettingsOutline } from "react-icons/io5";
import { formatValues } from '../../../Functions/Global';
import ProfileAvatarSection from '../ProfileAvatarSection';
import apiCall from '../../../Functions/Axios';


const Stats = ({
    userData
}) => {

    const [stats, setStats] = useState({})
    const [isLoading, setIsloading] = useState(false)

    const getStats = () => {
        let url = `users/user-stats-count/${userData.email}`
        let body = {}
        const onSuccess = (data) => {
            setStats(data)
        }
        apiCall(url, body, 'get', setIsloading, onSuccess)
    }

    useEffect(()=>{
        getStats()
    },[])

  return (
    <div>
        <h1 className='flex cp justify-end m-3 mb-0 p-2 items-center'>
            <IoSettingsOutline className='mx-1 text-cyan-600'/>
            <h1 className='text-main'>
              Settings
            </h1>
        </h1>
        <ProfileAvatarSection 
            name = {userData.nick_name}
            joinedIn={userData.created_at}
            email = {userData.email}
            callBack = {getStats}
            isFollower={stats.is_follower_to_current_user}
            isFollowing={stats.is_following_by_current_user}
            className = 'mx-4'
        />
        <div className="stats flex stats-horizontal text-center justify-center items-center shadow">
            <div className="stat">
                <div className="stat-title">Trips</div>
                <div className="stat-value duration-500 ">{formatValues(stats?.trips)}</div>
            </div>
            <div className="stat cp">
                <div className="stat-title">Followers</div>
                <div className="stat-value duration-500">{formatValues(stats?.followers)}</div>
            </div>
            
            <div className="stat cp">
                <div className="stat-title">Followings</div>
                <div className="stat-value duration-500">{formatValues(stats?.followings)}</div>
            </div>
            
        </div>
    </div>
  )
}

export default Stats