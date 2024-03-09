import React, { useState } from 'react';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { NavLink } from 'react-router-dom';
import apiCall from '../../Functions/Axios';
import ProfileForm from './ProfileForm';
import { HiUser, HiShieldCheck, HiMail } from 'react-icons/hi';

function RegisterForm() {
  // State variable for form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    repeatPassword: '',
    nick_name: ''
  });
  const [isLoading, setIsLoading] = useState(false)
  const [profileFormShow, setProfileFormShow] = useState(false)

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    const onSuccess = (data) => {
      return setProfileFormShow(true)
    }
    if (formData.password === formData.repeatPassword){
      apiCall(
        'users/register',
        formData,
        'post',
        setIsLoading,
        onSuccess
      )
    }

  };

  return (
    <>
      {
        profileFormShow ?
        <ProfileForm email={formData.email} nickName = {formData.nick_name}/>
        :
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="nick-name" color={'white'} value="Nick Name" />
            </div>
            <TextInput id="nick-name" icon={HiUser} name="nick_name" type="text" placeholder="Enter your nick name.." value={formData.nick_name} onChange={handleInputChange} required shadow />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" color={'white'} value="Your email" />
            </div>
            <TextInput id="email" icon={HiMail} name="email" type="email" placeholder="Enter your email.." value={formData.email} onChange={handleInputChange} required shadow />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" color={'white'} value="Your password" />
            </div>
            <TextInput id="password" icon ={HiShieldCheck} name="password" type="password" value={formData.password} onChange={handleInputChange} required shadow />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="repeat-password" color={'white'} value="Repeat password" />
            </div>
            <TextInput id="repeat-password" icon ={HiShieldCheck} name="repeatPassword" type="password" value={formData.repeatPassword} onChange={handleInputChange} required shadow />
          </div>
          {/* Nick Name field */}
          <div className="flex items-center gap-2">
            <Checkbox id="agree" />
            <Label htmlFor="agree" color={'white'} className="flex">
              I agree with the&nbsp;
              <NavLink to='/privacy-policy' className="text-main hover:underline dark:text-cyan-500">
                terms and conditions
              </NavLink>
            </Label>
          </div>
          <Button isProcessing = {isLoading} gradientMonochrome={'info'} pill type="submit">Register new account</Button>
          <div className="flex items-center gap-2">
            <Label htmlFor="agree" color={'white'} className="flex">
              Already registered&nbsp;
              <NavLink to="/login" className="text-main hover:underline dark:text-cyan-500">
                Login
              </NavLink>
            </Label>
          </div>
        </form>
      }
    </>
  );
}

export default RegisterForm;
