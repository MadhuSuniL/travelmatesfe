import React, { useEffect, useState } from 'react';
import { TextInput, Textarea, Label, Button, FileInput } from 'flowbite-react';
import { Select } from 'antd';
import { AiOutlineGlobal, AiOutlineCalendar, AiOutlineUsergroupAdd, AiOutlineFileText } from 'react-icons/ai';
import { MdTitle } from "react-icons/md";
import Buffer from '../buffer/Buffer';
import apiCall from '../../Functions/Axios';
import { useNavigate } from 'react-router-dom';
import { getData } from '../../Functions/LocalStorage';

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
    user,
    title: '',
    address_from: '',
    address_to: '',
    category: 'adventure',
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
            <Label htmlFor="title" value="Title" />
            <TextInput
              id="title"
              name="title"
              placeholder="Add title to your trip .."
              value={formData.title}
              onChange={handleChange}
              required
              icon={MdTitle}
            />
          </div>
          <div>
            <Label htmlFor="category" value="Category" />
            <Select
              defaultValue="adventure"
              className='w-full h-10'
              onChange={(value) => {
                setFormData(prev => ({
                  ...prev,
                  category : value
                }))
              }}
              loading = {isLoading}
              options={categories}
            />
            {/* <Select
              id="category"
              name="category"
              placeholder="Enter category"
              value={formData.category}
              onChange={handleChange}
              required
              
              icon={AiOutlineGlobal}
            >
              <option value={''}>Select Category</option>
              {
                categories.map((category) =><option key={category.value} value={category.value}>{category.label}</option>)
              }
            </Select> */}
          </div>
          <div>
            <Label htmlFor="from-country" value="From" />
            <Textarea
              id="from-country"
              name="address_from"
              placeholder={'Enter Your Dispature ... '}
              onChange={handleChange}
              required
              icon={AiOutlineGlobal}
            />
          </div>
          <div>
            <Label htmlFor="to-country" value="To" />
            <Textarea
              id="to-country"
              name="address_to"
              placeholder={'Enter Your Destination ...'}
              onChange={handleChange}
              required
              icon={AiOutlineGlobal}
            />
          </div>
          <div>
            <Label htmlFor="date" value="Date" />
            <TextInput
              id="date"
              name="date"
              type="date"
              min={today}
              onChange={handleChange}
              required
              icon={AiOutlineCalendar}
            />
          </div>
          <div>
            <Label htmlFor="date" value="Time" />
            <TextInput
              id="time"
              name="time"
              type="time"
              max={currentTime}
              onChange={handleChange}
              required
              icon={AiOutlineCalendar}
            />
          </div>
          <div>
            <Label htmlFor="group-size" value="Group Size" />
            <TextInput
              id="group-size"
              name="group_size"
              type="number"
              placeholder="Enter group size"
              value={formData.group_size}
              onChange={handleChange}
              required
              icon={AiOutlineUsergroupAdd}
            />
          </div>
          <div>
            <Label htmlFor="distance" value="Distance (KM)" />
            <TextInput
              id="distance"
              name="distance"
              type="number"
              placeholder="Enter distance"
              value={formData.distance}
              onChange={handleChange}
              icon={AiOutlineGlobal}
              required
            />
          </div>
          <div className="col-span-2 flex w-full items-center justify-center">
            <Label
              htmlFor="dropzone-file"
              className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
              <FileInput id="dropzone-file" onChange={(e)=>{
                setFormData(prev => ({
                  ...prev,
                  trip_cover_img : e.target.files[0]
                }))
              }} className="hidden" />
            </Label>
          </div>
          <div className='col-span-2'>
            <Label htmlFor="description" value="Description" />
            <Textarea
              id="description"
              name="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              icon={AiOutlineGlobal}
            />
          </div>
          <Button isProcessing = {isLoading} className='col-span-2' gradientMonochrome={'info'} type="submit">Submit</Button>
        </form>
  );
};

export default TripForm;
