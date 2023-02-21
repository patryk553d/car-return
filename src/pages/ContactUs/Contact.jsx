import { useRef, useState } from 'react';
import {IoCarSportOutline} from 'react-icons/io5';
import emailjs from "@emailjs/browser";
function Contact() {
  const form = useRef();
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    user_name:'', 
    user_email:'', 
    message:''
  })
  // function to validateEmail
  const validateEmail = (email) => {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
    if(email.match(regex))
    {
      return true;
    }
    else
    {
      return false;
    }
  };
  const handleChange =(e)=>{
    setFormData({...formData, [e.target.name]:e.target.value})
  }
  const sendEmail = (e) => {
    e.preventDefault();
    const {user_email, user_name, message} = formData;
    if(validateEmail(user_email) && user_name.length>=5 && message.length>=5)
    {
     const {current} = form;
      setLoading(true)
      emailjs.sendForm("Gmail","template_b7rw3g6",current,"tJMWCSp5r9SAuE95e")
      .then(
      (result) => {
          console.log(result.text);
          setLoading(false)
        },
        (error) => {
            setLoading(false)
            console.log(error.text);
        }).catch((e)=>console.log(e));
       setFormData({...formData,user_email:'',user_name:'',message:''})
      setLoading(false)
      alert("Email sended successfully")
    }else{
      setLoading(false)
      alert("Please add proper Details")
    }
  }
  return (
    <>
    <section className="bg-white py-2">
          <div className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 bg-slate-800 text-gray-100 border">
          <div className="flex flex-col justify-between">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold leading-tight lg:text-5xl text-blue-400">Let's talk!</h2>
              <div className="text-gray-300 text-sm">Please submit your information and we will get back to you.</div>
            </div>
              <div className='flex'>
                <IoCarSportOutline className='text-4xl lg:text-5xl text-gray-400 mr-1.5' />
                <h1 className="self-center heading text-4xl lg:text-5xl font-semibold whitespace-nowrap text-gray-400">CarReturn.co.uk</h1>
              </div>
           <div>
               
           </div>
          </div>
          <form ref={form} onSubmit={sendEmail} className="space-y-6 ng-untouched ng-pristine ng-valid">
            <input type="email" className="hidden"  name="to_email" value={'jarlog251@fuwari.be'} readOnly/>
            <div>
              <label htmlFor="name" className="text-sm">Full name</label>
              <input id="user_name" name="user_name" type="text" onChange={handleChange} value={formData.user_name} placeholder="Full Name" className="w-full p-3 rounded bg-gray-700 border-2"  required/>
            </div>
            <div>
              <label htmlFor="email" className="text-sm">Email</label>
              <input id="user_email" type="email" name="user_email" onChange={handleChange} value={formData.user_email}  placeholder="Email" className="w-full p-3 rounded bg-gray-700 border-2" required />
            </div>
            <div>
              <label htmlFor="message" className="text-sm">Message</label>
              <textarea id="message" name="message" placeholder="Message..." onChange={handleChange} value={formData.message}  className="w-full p-3 rounded bg-gray-700 border-2" required/>
            </div>
            <button type="submit" className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded bg-blue-400 shadow-lg px-5 py-2">{!loading?"Send Message":"Sending..."}</button>
          </form>
        </div>
    </section>
    </>
  )
}

export default Contact