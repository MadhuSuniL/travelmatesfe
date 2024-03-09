import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFilter, resetFilter } from '../../redux/Trips/TripFilterSlice';
import { FaPeopleGroup } from "react-icons/fa6";
import {
    Label,
  } from 'flowbite-react';

const TripFilter = ({trips}) => {

    const tripFilterState = useSelector(state => state.tripFilter.value);
    const { search, address_from, address_to, distance__lte, distance__gte, order_by, group_size, date__lte, data__gte, category } = tripFilterState;
    const dispatch = useDispatch(); 

    const handleChangeState = (e) => {
        const {name, value} = e.target
        dispatch(setFilter({field : name, value: value}));
    }

    const handleChangeState2 = (e) => {
        const {name, checked} = e.target
        dispatch(setFilter({field : name, value: checked ? 'distance' : ''}));
    }

    const clearFilters = () => {
        dispatch(resetFilter());
    }

    const [fromAddresses, setFromAddresses] = useState([]);      
    const [toAddresses, setToAddresses] = useState([]);
    const [categories, setCategories] = useState([]);

     const getFromAddress = () =>{
        let addresses = trips.map(trip => ({label : trip.address_from, value : trip.address_from}))
        setFromAddresses(prev => addresses)
    }
     
     const getToAddress = () =>{
        let addresses = trips.map(trip => ({label : trip.address_from, value : trip.address_from}))
        setToAddresses(prev => addresses)
     }

     const getCategories = () => {
        let categories = trips.map(trip => ({label : trip.category, value : trip.category}))
        setCategories(prev => categories)
     }

    useEffect(()=> {
        getCategories()
        getToAddress()
        getFromAddress()
    },[trips])





  return (
    <div>
        <h1 className='text-main'>Filters</h1>    
        <div className='divider m-0'/>
        
        <div>
            <label className="label cursor-pointer">Search Trips</label>
            <div className="join w-full">
                <input placeholder='Search Trips ...' name = 'search' value={search} onChange={handleChangeState} className="input input-bordered join-item w-full"/>
                <button className='btn join-item bg-main'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </button>
            </div>
            <br />
            <label className="label cursor-pointer">Address From</label>
            <select className="select select-bordered w-full" name = 'address_from' value={address_from} onChange={handleChangeState}>
                <option  value = ''>Filter From Address</option>
                {
                    fromAddresses.map((address) =><option key = {address.value} value = {address.value}>{address.label}</option>)
                }
            </select>
            <br/>
            <label className="label cursor-pointer">Address To</label>
            <select className="select select-bordered w-full" name = 'address_to' value={address_to} onChange={handleChangeState}>
                <option  value = ''>Filter To Address</option>
                {
                    toAddresses.map((address) =><option key = {address.value} value = {address.value}>{address.label}</option>)
                }
            </select>
            <br/>
            <label className="label cursor-pointer">Distance Range</label>
            <div className='grid grid-cols-2 gap-2'>
                <div className="join">
                    <button className="btn join-item bg-main rounded-r-full">Min</button>
                    <input type='number' name = 'distance__lte' value={distance__lte} onChange={handleChangeState} className="input w-28 md:w-32 bg-transparent rounded-xl input-bordered join-item" placeholder="Min Distance Range"/>
                </div>
                <div className="join">
                    <button className="btn join-item bg-main rounded-r-full">Max</button>
                    <input type='number' name = 'distance__gte' value={distance__gte} onChange={handleChangeState} className="input w-28 md:w-32 bg-transparent rounded-xl input-bordered join-item" placeholder="Max Distance Range"/>
                </div>
            </div>
        </div>

        <div className='flex flex-wrap justify-between items-center'>
            <div>
                <label className="label cursor-pointer">Date From</label>
                <input type = 'date' name = 'date__gte' value={data__gte} onChange={handleChangeState} className="input bg-transparent rounded-xl input-bordered" />
            </div>
            <div className='hidden md:flex divider m-0 mt-5 divider-horizontal' />
            <div>
                <label className="label cursor-pointer">Date To</label>
                <input type = 'date' name = 'date__lte' value={date__lte} onChange={handleChangeState} className="input bg-transparent rounded-xl input-bordered" />
            </div>
        </div>

        <div>
            <label className="label cursor-pointer">Category</label>
            <select className="select select-bordered w-full" name = 'category' value={category} onChange={handleChangeState}>
                <option value = ''>Filter Category</option>
                {
                    categories.map((address) =><option key = {address.value} value = {address.value}>{address.label}</option>)
                }
            </select>
        </div>

        <div className='flex flex-wrap justify-between items-center'>
            <div>
                <label className="label cursor-pointer">Group Size</label>
                <input type='number' name = 'group_size' value={group_size} onChange={handleChangeState} className="input bg-transparent md:w-[100%] rounded-xl input-bordered" placeholder="Minimum Group Size .."/>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">Order By Distance</span> 
                    <input type="checkbox" name='ordering' onChange={handleChangeState2} className="mx-2 rounded-md" checked = {order_by} />
                </label>
            </div>
        </div>

    <button onClick={clearFilters} className='f float-end m-2'>Clear Filters</button>
    </div>
  )
}

export default TripFilter