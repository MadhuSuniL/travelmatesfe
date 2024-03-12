import React, { useEffect, useState } from 'react';
import { TextInput, Textarea, Label, Button, FileInput } from 'flowbite-react';
import { Select } from 'antd';
import { AiOutlineGlobal, AiOutlineCalendar, AiOutlineUsergroupAdd, AiOutlineFileText } from 'react-icons/ai';
import { MdTitle } from "react-icons/md";
import Buffer from '../buffer/Buffer';
import apiCall from '../../Functions/Axios';
import { useNavigate } from 'react-router-dom';
import { getData } from '../../Functions/LocalStorage';
import Autocomplete from '../Custom/AutoComplete';

const TripForm = ({
  show,
  onHide
}) => {

  const today = new Date().toISOString().split('T')[0];
  const now = new Date();
  const currentTime = now.toISOString().split('T')[1].substring(0, 5); // Extract HH:MM from the ISO string
  const [categories, setCategories] = useState([])
  const [isLoading, setIsloading] = useState(false)
  const user = getData('user')?.email

  useEffect(()=>{
    const onSuccess = (categories) => {
      setCategories(categories);
    }
    apiCall(
      '/trips/meta/categories',
      {},
      'get',
      setIsloading,
      onSuccess,
    )
  },[])

  const [formData, setFormData] = useState({
    user : user,
    title: '',
    address_from: '',
    address_to: '',
    category: 'Adventure',
    date: '',
    time: '',
    group_size: 2,
    distance: null,
    trip_cover_img : null,
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const nav = useNavigate()

  function convertToFormData(data) {
    const formData = new FormData();
    
    // Iterate through each key-value pair in the data object
    for (const key in data) {
      // If the value is a File object (for example, for file uploads)
      if (data[key] instanceof File) {
        formData.append(key, data[key]);
      } else if (Array.isArray(data[key])) {
        // If the value is an array, iterate through each element and append it to the FormData
        data[key].forEach((value) => {
          formData.append(`${key}[]`, value);
        });
      } else {
        // For other types of values, simply append them to the FormData
        formData.append(key, data[key]);
      }
    }
    
    return formData;
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const onSuccess = (data) => {
      nav('/profile')
    }
    apiCall(
      '/trips/',
      convertToFormData(formData),
      'post',
      setIsloading,
      onSuccess,
    )
  };

  return (
        <form onSubmit={handleSubmit} className="grid gap-1 md:gap-4 grid-cols-1 md:grid-cols-2">
          <Buffer show={isLoading}/>
          <div>
            <label htmlFor="title">Title</label><br/>
            <input
              id="title"
              className='input input-bordered w-full'
              name="title"
              placeholder="Add title to your trip .."
              value={formData.title}
              onChange={handleChange}
              maxLength={50}
              required
              icon={MdTitle}
            />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <select
              defaultValue="adventure"
              className='w-full h-10 select select-bordered'
              onChange={(e) => {
                setFormData(prev => ({
                  ...prev,
                  category : e.target.value
                }))
              }}
              >
                <option value={''}>Select Category</option>
                {
                  categories.map(category => <option value={category.label} key = {category.label}>{category.label}</option>)
                }
            </select>
          </div>
          <div>
            <label htmlFor="from-country">From</label>
            <input 
              id="from-country"
              placeholder={'Place/City, State, Country ... '}
              name="address_from"
              className='input group input-bordered w-full'
              maxLength={'50'}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="to-country">To</label>
            <input
              id="to-country"
              name="address_to"
              placeholder={'Place/City, State, Country ... '}
              className='input group input-bordered w-full'
              onChange={handleChange}
              maxLength={'50'}
              required
            />
          </div>
          <div>
            <label htmlFor="date">Choose Departure Date</label><br/>
            <input
              id="date"
              type="date"
              className='input input-bordered bg-transparent rounded-lg w-full'
              name="date"
              min={today}
              onChange={handleChange}
              required
              icon={AiOutlineCalendar}
            />
          </div>
          <div>
            <label htmlFor="time">Choose Departure Time</label><br/>
            <input
              id="time"
              name="time"
              className='input input-bordered bg-transparent rounded-lg w-full'
              type="time"
              max={currentTime}
              onChange={handleChange}
              required
              icon={AiOutlineCalendar}
            />
          </div>
          <div>
            <label htmlFor="group-size">Group Size</label>
            <input
              id="group-size"
              className='input input-bordered bg-transparent rounded-lg w-full'
              name="group_size"
              placeholder="Enter group size"
              value={formData.group_size}
              onChange={handleChange}
              pattern='[0-9]*'
              required
              icon={AiOutlineUsergroupAdd}
            />
          </div>
          <div>
            <abel htmlFor="distance">Distance (KM)</abel>
            <input
              id="distance"
              className='input input-bordered bg-transparent rounded-lg w-full'
              name="distance"
              placeholder="Enter distance"
              value={formData.distance}
              onChange={handleChange}
              icon={AiOutlineGlobal}
              pattern='[0-9]*'
              required
            />
          </div>
          <div className="col-span-2 flex w-full items-center justify-center">
            <label
              htmlFor="dropzone-file"
              className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-500 bg-transparent dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                {
                  formData.trip_cover_img ? 
                  <div className='flex flex-col justify-center items-center'>
                  <img src={URL.createObjectURL(formData.trip_cover_img)} alt="Trip cover" className="mb-4 h-44 border-2 border-gray-700 rounded-lg" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">Name :{formData.trip_cover_img.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Size :{formData.trip_cover_img.size/1000} KB</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">(Click to change the image)</p>
                  </div>
                  :
                  <div>
                    <svg
                      className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLineJoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop the cover img
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (Max size 5MB)</p>
                  </div>
                }
              </div>
              <input type='file' id="dropzone-file" onChange={(e)=>{
                setFormData(prev => ({
                  ...prev,
                  trip_cover_img : e.target.files[0]
                }))
              }} className="hidden" />
            </label>
          </div>
          <div className='col-span-2'>
            <label>Description ( {formData.description.length || 0} /255)</label>
            <textarea
              id="description"
              className='i input input-bordered w-full h-20'
              name="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
              icon={AiOutlineGlobal}
              maxLength = {255}
            />
          </div>
          <Button isProcessing = {isLoading} className='col-span-2' gradientMonochrome={'info'} type="submit">Journey Bigins</Button>
        </form>
  );
};

export default TripForm;
