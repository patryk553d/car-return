import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import {useEffect, useState} from 'react'
import {MdPersonAdd ,MdAttachEmail,MdLock} from 'react-icons/md'
import { auth, db } from '../../Firebase';
import {IoCarSportOutline} from 'react-icons/io5'
import { useNavigate  ,Link} from 'react-router-dom';
import Google from './Google';
function Signup() {
    const navigate = useNavigate()
    useEffect(()=>{
        if(auth.currentUser){
            navigate("/")
        }
    },[])// eslint-disable-line react-hooks/exhaustive-deps
    const [userSignUpForm,setUserSignUpForm] =useState({
        name:'', 
        email:'', 
        password:'', 
    })
   const handleChange = (e)=>{
   setUserSignUpForm({...userSignUpForm,  [e.target.name]: e.target.value})
   }
    //Register user with email and password only
    const handleSignUp = (e) => {
        e.preventDefault()
        const {email, name, password} = userSignUpForm;
        if(name.length===0 || email.length===0 || password.length===0){
            alert("Enter the correct Details")
        }
        if(password.length<8){
            alert("Password must contain 8 character")
        }else{
            try {
                createUserWithEmailAndPassword(auth, email, password)
                    .then(async (userCredential) => {
                        // Signed in 
                        const user = userCredential.user;

                        localStorage.setItem('car-return', JSON.stringify(user));
                            await setDoc(doc(db, "users", user.uid), {
                                uid: user.uid,
                                name: name,
                                email: user.email,
                                profileImg: '',
                                profileImgPath: '',
                                timeStamp: serverTimestamp()
                            });
                            if(user.uid){
                                navigate("/profile");
                            }
                        
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorMessage, errorCode);
                        // ..
                    });
            } catch (error) {
                console.log(error);
            }
        }
    }
  return (
    <>
    <section className="relative py-20 2xl:py-40 dark:bg-gray-800 overflow-hidden">
        <img className="hidden lg:block absolute inset-0 mt-32" src="zospace-assets/lines/line-mountain.svg" alt=""/>
        <img className="hidden lg:block absolute inset-y-0 right-0 -mr-40 -mt-32" src="zospace-assets/lines/line-right-long.svg" alt=""/>
        <div className="relative container px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
                <div className="flex justify-center">
                    <IoCarSportOutline className='text-4xl lg:text-8xl dark:text-white' />
                  <h1 className="self-center heading text-4xl lg:text-6xl font-semibold whitespace-nowrap dark:text-white lg:underline decoration-dashed dark:decoration-white underline-offset-8">CarReturn.co.uk</h1>
                </div>
            </div>
            <div className="w-full lg:w-1/2 px-4">
                <div className="px-6 lg:px-20 py-12 lg:py-24 bg-gray-600 rounded-lg">
                <form action="#">
                    <h3 className="mb-10 text-2xl text-white font-bold font-heading">Register Account</h3>
                    <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                        <MdPersonAdd />
                        <input className="w-full pl-4 pr-6 py-4 font-bold placeholder-gray-900 rounded-r-full focus:outline-none" type="text" name='name' placeholder="Full Name" value={userSignUpForm.name} onChange={handleChange} />
                    </div>
                    <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                        <MdAttachEmail/>
                        <input className="w-full pl-4 pr-6 py-4 font-bold placeholder-gray-900 rounded-r-full focus:outline-none" type="email" name='email' placeholder="Email" autoComplete='username' value={userSignUpForm.email} onChange={handleChange}/>
                    </div>
                    <div className="flex items-center pl-6 mb-2 bg-white rounded-full">
                        <MdLock/>
                        <input className="w-full pl-4 pr-6 py-4 font-bold placeholder-gray-900 rounded-r-full focus:outline-none" type="password" name='password' placeholder="Password" autoComplete="current-password" value={userSignUpForm.password} onChange={handleChange}/>
                    </div>
                    <p className='text-sm my-2'>Already have an account? <Link to="/login" className='text-blue-400'>Login</Link> </p>
                    <button className="py-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition duration-200"  onClick={handleSignUp} >Get started</button>
                    <div className='flex justify-center mt-10'>
                            <Google/>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>
        </div>
    </section>
    </>
  )
}

export default Signup