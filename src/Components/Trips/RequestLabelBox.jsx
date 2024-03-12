import React from 'react'
import { Button } from 'flowbite-react'

const RequestLabelBox = ({request}) => {
  return (
    <div className='mt-2 grid grid-cols-12 gap-1 items-center shadow shadow-gray-500 p-2 py-3 rounded-md'>
        <div className='col-span-2 flex justify-center'>
            <img className='rounded-full w-8' src = {request.profile_pic ? request.profile_pic : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}/>
        </div>
        <div className='col-span-5'>
            <sub className='text-main text-[12px]'>{request.user.user_details.nick_name}</sub><sub className='mx-2 text-[9px]'>{request.time}</sub>
            <h1 className='text-[12px] py-2'>{'2 hours ago'}</h1>
            {/* <h1 className='text-[12px] py-2'>{request.created_at}</h1> */}
        </div>
        <div className='col-span-5 flex items-center'>
          <Button gradientMonochrome={'info'} pill className='py-0 mx-1'>Accept</Button>
          <Button gradientMonochrome={'failure'} pill className='py-0 mx-1'>Reject</Button>
        </div>
    </div>
  )
}

export default RequestLabelBox