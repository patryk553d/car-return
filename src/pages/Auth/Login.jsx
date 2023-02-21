import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState , useEffect } from 'react'
import {IoCarSportOutline} from 'react-icons/io5';
import { useNavigate ,Link } from 'react-router-dom';
import { auth } from '../../Firebase';
import Loader from '../Loader/Loader';
import Google from './Google';
function Login() {
    const navigate = useNavigate()
    useEffect(()=>{
        if(auth.currentUser){
            navigate("/")
        }
    },[])// eslint-disable-line react-hooks/exhaustive-deps
    const [loader, setLoader] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const validateEmail = (email:string):boolean => {
    //     return  email.match(
    //         /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //       );
    //   };
    const handleLogin = async (e) => {
        e.preventDefault();
        // console.log(validateEmail(email))
        if(password.length===0 || email.length===0){
            alert("Please enter the correct details")
        }
        else{
            try {
                setLoader(true)
                const userCredential = await signInWithEmailAndPassword(auth, email, password)
                if (userCredential.user) {
                    localStorage.setItem("car-return", JSON.stringify(userCredential.user));
                }
                setLoader(false)
                if(auth.currentUser){
                    navigate('/profile')
                }
            } catch (error) {
                // toast.error("Invalid credentials")
                console.log(error);
                setLoader(false);
                // setEmail('');
                // setPassword('')
            }
        }
    }
  return (
    <>
    <div className="min-h-screen py-6 flex bg-white dark:bg-[#181F2A] flex-col justify-center sm:py-12 pattern">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                    </div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className="max-w-md mx-auto">
                            <div className='flex'>
                                <IoCarSportOutline className='text-4xl text-black mr-1.5' />
                                <span className="self-center heading text-2xl font-semibold whitespace-nowrap text-black">CarReturn</span>
                            </div>
                            <form>
                                <div className="divide-y divide-gray-200">
                                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                        <div className="relative">
                                            <input autoComplete="off" id="email" required name="email" onChange={e => setEmail(e.target.value)} type="email" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
                                            <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                                        </div>
                                        <div className="relative">
                                            <input autoComplete="off" required id="password" name="password" type="password" onChange={e => setPassword(e.target.value)} className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                                            <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                        </div>
                                        <p className='text-sm'>Don't have account ? <Link to="/signup" className='text-blue-400'>SignUp</Link> </p>
                                        <div className="relative">
                                            <button className="bg-blue-400 rounded-md shadow-lg px-5 py-2" type='submit' onClick={handleLogin}  >{loader ? <Loader /> : "Login"}</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className='flex justify-center'>
                            <Google/>
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}

export default Login