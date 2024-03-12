import React from 'react'

const CommentLabelBox = ({comment}) => {
  return (
    <div className='mt-2 grid grid-cols-12 gap-1 items-center shadow shadow-gray-500 p-2 py-3 rounded-md'>
        <div className='col-span-2 flex justify-center'>
            <img className='rounded-full w-10' src = {comment.profile_pic ? comment.profile_pic : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}/>
        </div>
        <div className='col-span-10'>
            <sub className='text-main text-[11px]'>{comment.user.user_details.nick_name}</sub><sub className='mx-2 text-[9px]'>{comment.time}</sub>
            <h1 className='text-[12px] py-2'>{comment.comment}</h1>
        </div>
    </div>
  )
}

export default CommentLabelBox