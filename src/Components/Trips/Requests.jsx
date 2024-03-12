import React, {useState, useEffect} from 'react'
import { TiUserAddOutline } from "react-icons/ti";
import RequestsSkeleton from '../Skeletons/Trips/Requests/RequestsSkeleton';
import {formatValues} from '../../Functions/Global';
import apiCall from '../../Functions/Axios';
import { Popover } from 'antd';

const RequestsModal = ({handleRequest, requests, isLoading}) => {

    const [requestsData, setRequestsData] = useState(requests)

    useEffect(() => {
        setRequestsData(Requests)
    },[Requests])

    return (
        <dialog id="Requests_modal" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <div className="max-w-lg mx-auto mt-4">
                    <h3 className="font-bolds">Requests {formatValues(requestsData?.length)}</h3>
                    <div className='p-2 overflow-auto h-[300px]'>
                        <RequestsSkeleton requests={requestsData} isLoading={isLoading} skeletonCount={10} />
                    </div>
                </div>
            </div>
        </dialog>
    )
}

const RequestsPopover = ({children, requests, isLoading, getRequests}) => {
    
    const content = <div className="text-white max-w-lg mx-auto mt-4">
    <h3 className="font-bold">Requests ({formatValues(requests?.length)})</h3>
    <div className='p-2 overflow-auto h-[300px]'>
        <RequestsSkeleton requests={requests} isLoading={isLoading} skeletonCount={10} />
    </div>
</div>

    return (
        <Popover
        content = {content}
        style={{width:300}}
        trigger={'click'}
        color='#1f2937'
        onOpenChange={getRequests}
        >
            {children}
        </Popover>
    )
}

const Requests = ({tripData, getTripData}) => {
    const [trip, setTrip] = useState(tripData)
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const getRequests = () => {
        let url = `trips/requests/${trip.uiid}`
        let body = {}
        const onSuccess = (data) => {
            setRequests(data)
        }
        apiCall(url, body, 'get', setIsLoading, onSuccess)
    }

    const handleRequest = (status) => {
        let url = `trips/comments/${trip.uiid}`
        let body = {status}
        const onSuccess = (data) => {
            getTripData()
        }
        apiCall(url, body, 'post', setIsLoading, onSuccess)
    }

    useEffect(() =>{
        setTrip(tripData)
    },[trip])

  return (
    <RequestsPopover getRequests = {getRequests} requests={requests} isLoading = {isLoading}>
        <div className='flex cp badge badge-outline p-3 items-center'>
            <TiUserAddOutline size={20} className='mx-1'/>
            <span>Requests</span>
        </div>
    </RequestsPopover>
  )
}

export default Requests