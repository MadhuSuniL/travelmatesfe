import React, { useState } from 'react'
import { Avatar, Button, Card } from 'flowbite-react';
import apiCall from '../../Functions/Axios';

const ProfileAvatarSection = ({
    name,
    joinedIn,
    isFollower,
    isFollowing,
    className,
    callBack,
    email
}) => {

    const [isLoading, setIsloading] = useState(false)

    const handleFollowUnFollow = () => {
        let url = `users/follow-unfollow/${email}`
        let body = {}
        let method = 'put'
        const onSuccess = (data) => {
            return callBack ? callBack() : ''
        }
        apiCall(url, body, method, setIsloading, onSuccess)
    }


    const getFollowButton = () => {
        if (isFollower) {
            return <Button pill onClick={handleFollowUnFollow} isProcessing= {isLoading} gradientMonochrome={'success'}>FollowBack</Button>
        }
        else if (isFollowing) {
            return <Button pill onClick={handleFollowUnFollow} isProcessing= {isLoading} gradientMonochrome={'failure'}>UnFollow</Button>
        }
        return <Button pill onClick={handleFollowUnFollow} isProcessing= {isLoading} gradientMonochrome={'info'}>Follow</Button>
    }


  return (
    <div className={'flex justify-between items-center ' + className}>
        <Avatar className='justify-start' img="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" rounded>
        <div className="space-y-1 font-medium dark:text-white">
            <div>{name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Joined in {joinedIn}</div>
        </div>
        </Avatar>
        {/* <div>
            <div className='badge badge-outline'>UnFollow</div>
        </div> */}
        <div>
            {getFollowButton()}
        </div>
  </div>
  )
}

export default ProfileAvatarSection