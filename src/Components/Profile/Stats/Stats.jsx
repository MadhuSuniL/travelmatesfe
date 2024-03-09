import React from 'react'
import { IoSettingsOutline } from "react-icons/io5";
import { Avatar } from 'flowbite-react';
const Stats = ({
    userData
}) => {

    function formatValues(count) {
        if (count >= 1000000) {
            return (count / 1000000).toFixed(2) + 'M';
        } else if (count >= 100000) {
            return (count / 100000).toFixed(2) + 'L';
        } else if (count >= 1000) {
            return (count / 1000).toFixed(2) + 'K';
        } else {
            return count?.toString();
        }
    }


  return (
    <div>
        <div className='flex justify-around py-2'>
        <Avatar img="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" rounded>
            <div className="space-y-1 font-medium dark:text-white">
                <div>{userData?.nick_name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Joined in {userData?.created_at}</div>
            </div>
        </Avatar>
        <h1 className='flex cp justify-end items-center'>
            <IoSettingsOutline className='mx-1 text-cyan-600'/>
            <h1 className='text-main'>
              Settings
            </h1>
          </h1>
        </div>
        <div className="stats flex stats-horizontal text-center justify-center items-center shadow">
            <div className="stat">
                <div className="stat-title">Trips</div>
                <div className="stat-value">{formatValues(userData?.trips)}</div>
            </div>
            <div className="stat cp">
                <div className="stat-title">Followers</div>
                <div className="stat-value">{formatValues(userData?.followers)}</div>
            </div>
            
            <div className="stat cp">
                <div className="stat-title">Followings</div>
                <div className="stat-value">{formatValues(userData?.following)}</div>
            </div>
            
        </div>
    </div>
  )
}

export default Stats