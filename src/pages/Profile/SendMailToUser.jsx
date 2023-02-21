import { useRef,useState } from "react";
import emailjs from "@emailjs/browser";
function SendMailToUser({email}) {
  const form = useRef();
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    user_name:'', 
    user_email:'', 
    message:'',
    to_email:email
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
    setLoading(true)
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
    }else{
      setLoading(false)
      alert("Please add proper Details")
    }
  };
  return (
    <>
      <div className="">
        <form ref={form} onSubmit={sendEmail}>
          <input type="email" className="hidden"  name="to_email" readOnly value={email} />
          <label>Name</label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder-gray-400  focus:border-blue-500" placeholder="name"
            name="user_name" onChange={handleChange} value={formData.user_name}
          />
          <label>Email</label>
          <input
            type="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5  placeholder-gray-400  focus:border-blue-500"
            name="user_email" placeholder="email" onChange={handleChange} value={formData.user_email}
          />
          <label>Message</label>
          <textarea
            name="message" onChange={handleChange} value={formData.message}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  placeholder-gray-400   focus:border-blue-500" placeholder="message"
          />
          <div className="flex justify-center mt-5">
            <input
              type="submit"
              className="bg-blue-400 px-2 py-2 w-full rounded cursor-pointer"
              value={loading?"Sending":"Send"}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default SendMailToUser;