import React from 'react'
import { Avatar, Button, Card } from 'flowbite-react';

const TripPrivateCard = () => {
  return (
    <Card href="#" className="bg-transparent hover:bg-transparent">
      <div className='flex justify-between items-center'>
        <Avatar className='justify-start' img="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" rounded>
        <div className="space-y-1 font-medium dark:text-white">
            <div>Jese Leos</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Joined in August 2014</div>
        </div>
        </Avatar>
        <div>
            <Button pill gradientMonochrome={'info'}>Follow</Button>
        </div>
      </div>
      <h5 className="text-xl font-bold tracking-tight text-gray-300 dark:text-white">
        Noteworthy technology acquisitions 2021
      </h5>
    </Card>
  )
}

export default TripPrivateCard