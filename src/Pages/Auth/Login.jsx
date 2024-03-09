import LoginForm from '../../Components/auth/LoginForm';
import Logo from '../../assests/logo2.png';
import { ReactTyped } from "react-typed";
import LoginBgMp4 from '../../assests/videos/loginbg.mp4';

const Login = () => {
  return (
    <div className='' >
        <video className='opacity-20 overflow-hidden' autoPlay loop muted style={{ position: 'fixed', width: '100%', height: '100%', objectFit: 'cover', zIndex: '-1' }}>
          <source src={LoginBgMp4} type="video/mp4" />
          {/* Add additional <source> tags for other video formats if necessary */}
          Your browser does not support the video tag.
        </video>
        <center>
            <img src={Logo} className="h-20 md:h-32 mt-1" alt="Logo" />
        </center>
        <div className='grid gap-3 md:grid-cols-2 max-w-[1000px] overflow-y-auto mx-auto items-center bg-opacity-0 p-2 pt-0 rounded-lg'>
            <div className='font-new md:text-3xl px-5'>
                <ReactTyped strings={['"Traveling alone? Connect with a compatible partner through our platform. Say goodbye to loneliness and hello to shared adventures and unforgettable experiences."']} typeSpeed={40} />
            </div>
            <div className='border-blue-300 0border-2 0shadow-lg shadow-main p-2 rounded-lg my-2'>
                <h1 className='text-xl text-center my-2 text-main'>Login</h1>
                <LoginForm/>
            </div>
        </div>
    </div>
  )
}

export default Login
// export default AuthWrapper(Login);
