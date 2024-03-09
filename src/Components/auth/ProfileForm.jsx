import React, { useState } from 'react';
import { TextInput, Textarea, Label, Button } from 'flowbite-react';
import { HiPhone, HiUser } from 'react-icons/hi';
import apiCall from '../../Functions/Axios';
import { useNavigate } from 'react-router-dom';

const ProfileForm = ({
    email,
    nickName
}) => {
    const nav = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        user : email,
        nick_name: nickName,
        phone_no: '',
        gender: 'Male',
        bio: ''
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value, // For file input, use files[0], otherwise use value
        });
    };

    const handleRadioChange = (value) => {
        setFormData({
            ...formData,
            gender: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const onSuccess = (data) => {
            return nav('/login');
        };
        apiCall(
            'users/user_details',
            formData,
            'post',
            setIsLoading,
            onSuccess
        );
    };

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
                <Label htmlFor="nick-name" color="white" value="Nick Name" />
                <TextInput
                    id="nick-name"
                    name="nick_name"
                    placeholder="Enter your nickname"
                    value={formData.nick_name}
                    onChange={handleChange}
                    icon={HiUser}
                    required
                    shadow
                />
            </div>
            <div className="flex flex-col">
                <Label htmlFor="phone-no" color="white" value="Phone Number" />
                <TextInput
                    id="phone-no"
                    name="phone_no"
                    placeholder="Enter your phone number"
                    value={formData.phone_no}
                    onChange={handleChange}
                    required
                    icon={HiPhone}
                    addon="+91"
                    shadow
                />
            </div>
            <div className='flex justify-around'>
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <span className="label-text">Male</span>
                        <input type="radio" name="gender" value="Male" className="radio mx-2 checked:bg-cyan-500" onChange={() => handleRadioChange('Male')} checked={formData.gender === 'Male'} />
                    </label>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <span className="label-text">Don't Say</span>
                        <input type="radio" name="gender" value="Don't Say" className="radio mx-2 checked:bg-gray-500" onChange={() => handleRadioChange("Don't Say")} checked={formData.gender === "Don't Say"} />
                    </label>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <span className="label-text">Female</span>
                        <input type="radio" name="gender" value="Female" className="radio mx-2 checked:bg-cyan-500" onChange={() => handleRadioChange('Female')} checked={formData.gender === 'Female'} />
                    </label>
                </div>
            </div>
            <div className="flex flex-col">
                <Label htmlFor="bio" color="white" value="Bio" />
                <Textarea
                    id="bio"
                    name="bio"
                    placeholder="Enter your bio"
                    value={formData.bio}
                    onChange={handleChange}
                    required
                    rows={4}
                    shadow
                />
            </div>
            <Button isProcessing={isLoading} type="submit">Submit</Button>
        </form>
    );
};

export default ProfileForm;
