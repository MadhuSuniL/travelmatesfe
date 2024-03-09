import { useState } from 'react';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { NavLink } from 'react-router-dom';
import apiCall from '../../Functions/Axios';
import { storeData } from '../../Functions/LocalStorage';

function Component() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const onSuccess = (data) => {
      let user_data = data.user_data
      let tokens_data = data.token_data
      storeData('user', user_data)
      storeData('accessToken', tokens_data.access)
      storeData('refreshToken', tokens_data.refresh)
      return window.location.href = '/'
    }
    apiCall(
      'users/login',
      {
        email,password
      },
      'post',
      setIsLoading,
      onSuccess
    )

  };

  return (
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
        <div>
            <div className="mb-2 block">
            <Label htmlFor="email1" color={'white'} value="Your email" />
            </div>
            <TextInput id="email1" type="email" placeholder="name@flowbite.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
            <div className="mb-2 block">
            <Label htmlFor="password1" color={'white'} value="Your password" />
            </div>
            <TextInput id="password1" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="flex items-center gap-2">
            <Checkbox id="remember" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
            <Label htmlFor="remember" color={'white'}>Remember me</Label>
        </div>
        <Button isProcessing = {isLoading} pill gradientMonochrome={'info'} type="submit">Submit</Button>
        <div className="flex items-center gap-2">
        <Label htmlFor="agree" color={'white'} className="flex">
          Don't have account&nbsp;
          <NavLink to="/register" className="text-main hover:underline dark:text-cyan-500">
            Register
          </NavLink>
        </Label>
      </div>
        </form>
  );
}

export default Component;
