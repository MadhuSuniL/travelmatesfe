import React, { useEffect, useState } from 'react'
import { FaRegThumbsUp, FaThumbsUp, FaThumbsDown, FaRegThumbsDown } from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";
import apiCall from '../../Functions/Axios';
import {formatValues} from '../../Functions/Global';
import { FaPaperPlane } from 'react-icons/fa';
import CommentsSkeleton from '../Skeletons/Trips/Comments/CommentsSkeleton';
import { Popover } from 'antd';
import { MdConnectWithoutContact } from "react-icons/md";

const Like = ({
    status,
    count,
    handler
}) => {

    return (
        <h1 className='flex mx-2 justify-center items-center'>{status === 'like' ? <FaThumbsUp onClick={handler}/> : <FaRegThumbsUp className='active:animate-ping' onClick={handler}/>} <span className='mx-2 duration-700'>{formatValues(count)}</span></h1>
    )
}

const DisLike = ({
    status,
    count,
    handler
}) => {

    return (
        <h1 className='flex mx-2 justify-center items-center'>{status === 'dislike' ? <FaThumbsDown onClick={handler}/> : <FaRegThumbsDown className='active:animate-ping' onClick={handler}/>} <span className='mx-2 duration-700'>{formatValues(count)}</span></h1>
    )
}

const CommentsModal = ({addComment, comments, isLoading}) => {

    const [commentsData, setCommentsData] = useState(comments)
    const [commentText, setCommentText] = useState('');

    const handleCommentChange = (e) => {
      setCommentText(e.target.value);
    };

    const handleSubmitComment = () => {
        addComment(commentText)
    };

    useEffect(() => {
        setCommentsData(comments)
    },[comments])

    return (
        <dialog id="comments_modal" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">Post Comment</h3>
                <div className="max-w-lg mx-auto mt-4">
                    <textarea
                        className="w-full textarea textarea-bordered px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        rows="3"
                        value={commentText}
                        onChange={handleCommentChange}
                        placeholder="Add a comment..."
                    ></textarea>
                    <div className='flex justify-end'>
                        <button
                            className="mt-2 px-4 text-white rounded-md focus:outline-none badge py-3 bg-main"
                            onClick={handleSubmitComment}
                            disabled = {!commentText}
                        >
                            <FaPaperPlane className="inline-block mr-2" /> Post Comment
                        </button>
                    </div>
                    <h3 className="font-bolds">Comments {formatValues(commentsData.length)}</h3>
                    <div className='p-2 overflow-auto h-[300px]'>
                        <CommentsSkeleton comments={commentsData} isLoading={isLoading} skeletonCount={10} />
                    </div>
                </div>
            </div>
        </dialog>
    )
}

const Comment = ({tripData, getTripData}) => {
    const [trip, setTrip] = useState(tripData)
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const getComments = () => {
        let url = `trips/comments/${trip.uiid}`
        let body = {}
        const onSuccess = (data) => {
            setComments(data)
        }
        apiCall(url, body, 'get', setIsLoading, onSuccess)
    }

    useEffect(() =>{
        setTrip(tripData)
    },[trip])

    const addComment = (comment) => {
        let url = `trips/comments/${trip.uiid}`
        let body = {comment}
        const onSuccess = (data) => {
            setComments(prev => ([ data, ...prev]))
            getTripData()
        }
        apiCall(url, body, 'post', setIsLoading, onSuccess)
    }

    return (
        <>
            <h1 onClick={()=>{
                document.getElementById('comments_modal').showModal()
                getComments()
            }} className='flex mx-2 justify-center items-center'><AiOutlineComment size={22}/> <span className='mx-2'>{formatValues(trip.comments_count)}</span></h1>
            <CommentsModal 
                isLoading = {isLoading} 
                comments = {comments} 
                setComments={setComments} 
                trip={trip}
                addComment = {addComment}
            />
        </>
    )
}

const ConnectedUsers = ({
    trip
}) => {
    const [users, setUsers] = useState(trip.connected_users);
      
    const content = (
        <div className='text-white'>
            <h1 className='text-main fw-bold'>Connecetd Users ({users.length})</h1>
          {
            users.map(user =>
            <div className='flex cp items-center mt-2'>
                <img className='w-8 rounded-full mx-2' src={user.user_details.profile_pic} />
                <h1 className='text-gray-500 text-sm'>{user.user_details.nick_name}</h1>
            </div>
            )
          }
        </div>
      );

    return (
        <Popover content={content} color='#1f2937'>
            <h1 className='flex mx-2 justify-center items-center'><MdConnectWithoutContact size={25}/> <span className='mx-2'>{users.length}</span></h1>
        </Popover>
    )
}

const Interactions = ({trip, getTripData}) => {

    const [likeStatus, setLikeStatus] = useState(trip?.like_status)
    const [likeCount, setLikeCount] = useState(trip?.likes_count)
    const [disLikeCount, setDisLikeCount] = useState(trip?.dislikes_count)
    const [isLoading, setIsLoading] = useState(false)

    const handleLike = () => {
        let url = `trips/likes/${trip.uiid}`
        let body = {status : likeStatus === 'like' ? null : 'like'}
        const onSuccess = (data) => {
            setLikeStatus(data.status)
            setLikeCount(data.like_count)
            setDisLikeCount(data.dislike_count)
        }
        apiCall(url, body, 'put', setIsLoading, onSuccess)      
    }

    const handleDisLike = () => {
        let url = `trips/likes/${trip.uiid}`
        let body = {status : likeStatus === 'dislike' ? null : 'dislike'}
        const onSuccess = (data) => {
            setLikeStatus(data.status)
            setLikeCount(data.like_count)
            setDisLikeCount(data.dislike_count)
        }
        apiCall(url, body, 'put', setIsLoading, onSuccess)      
    }

  return (
    <div className='flex justify-around items-center px-2'>
        <div className='flex cp sbg-gray-700 sbadge sbadge-outline py-3 px-3'>
            <Like 
                trip = {trip} 
                status = {likeStatus} 
                count = {likeCount} 
                handler = {handleLike}
                />
            <DisLike 
                trip = {trip} 
                status = {likeStatus} 
                count = {disLikeCount} 
                handler = {handleDisLike}
            />
        </div>

        <div className='0bg-gray-700 cp 0badge 0badge-outline py-3 px-3'>
            <ConnectedUsers
                trip={trip}
            />
        </div>

        <div className='0bg-gray-700 cp 0badge 0badge-outline py-3 px-3'>
            <Comment tripData = {trip} getTripData = {getTripData} />
        </div>
    </div>
  )
}

export default Interactions