import { Link } from 'react-router-dom';
import {ImCross} from 'react-icons/im'
import { auth, db, storage } from '../Firebase';
import {useState } from 'react'
import { ref, getDownloadURL, uploadBytes, } from 'firebase/storage';
import { addDoc, collection, doc, serverTimestamp, updateDoc, } from "firebase/firestore";
import Loader from '../pages/Loader/Loader';
function NewPost({userData}) { 
  const {profileImg} = userData
  const [showModal, setShowModal] = useState(false);
  const [carDetails ,setCarDetails] = useState({
      name:'',
      vin:'', 
      color:'',
      stolenDate:'', 
      stolenFrom:'',
      carDesc:'',
      theftDesc:'',
      registrationPlate:'',
  })
  const [loader, setLoader] = useState(false);
  const [file, setFile] = useState(null);


  const showAndHideModal = () => {
    setShowModal(!showModal);
  }
  const handleFileUpload = (evt)=>{
    if (evt.target.files != null) {
      setFile(evt.target.files[0]);
    }
  }
  const handleChange= (e)=>{
    setCarDetails({...carDetails,[e.target.name]:e.target.value})
  }
  const CreatePost = async (e) => {
    e.preventDefault();
    const {name,vin,color,stolenDate,stolenFrom,carDesc,theftDesc ,registrationPlate} = carDetails
    if (name.length !== 0 && file?.name !==null && vin.length!== 0 && stolenDate!=='') {
      const imgRef = ref(storage, `posts/${new Date().getTime()} - ${file?.name}`)
      try {
        setLoader(true);
        const snap = await uploadBytes(imgRef, file); 
        // url of the picture after uploading
        const url = await getDownloadURL(ref(storage, snap.ref.fullPath))

        setFile(null);

      const docRef = collection(db,'posts') // collectionRef
      const newListing =  await addDoc(docRef, {
          modelName:name,
          registrationPlate:registrationPlate,
          vin:vin,
          color:color,
          stolenDate:stolenDate, 
          carDesc:carDesc,
          stolenFrom:stolenFrom,
          theftDesc:theftDesc,
          comments: [],
          postedAt: serverTimestamp(),
          uid: auth?.currentUser?.uid,
          imgPath: file ? url : null,
          forDeletePath: file ? snap.ref.fullPath : null,
          recover:false,
        });
        const id= newListing.id;
        const updateDocId = doc(db, "posts", id) ;
        await updateDoc(updateDocId, {
          id: id
        })
        setLoader(false);
        showAndHideModal();
      } catch (e) {
        console.log(e)
      }
    } else {
      console.error('Enter data first')
    }
  }
  return (
    <div className="shadow lg:w-96 lg:rounded lg:m-2 bg-slate-900 bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white shadow-blue-500">
      <div>
        <h1 className='uppercase text-center font-medium'>Register a stolen car</h1>
      </div>
      <div className='flex py-2.5 px-2'>
        <Link to='/profile'>
          <img src={profileImg} alt="profilePic" className='w-10 rounded-3xl border border-gray-400' />
        </Link>
        <input type="text" className='px-8 border-2 mx-2 w-full border-gray-300 rounded-3xl bg-gray-200 text-gray-900' placeholder='Report the car stolen' onClick={showAndHideModal} />
      </div>
      {showModal ? (
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none text-sm">
      <div className="min-h-screen py-0 flex flex-col justify-center sm:py-12 pattern">
      <div className="relative py-0 sm:max-w-xl sm:mx-auto">
          <div className="relative px-5 md:px-20 py-5 lg:py-16 shadow-lg sm:rounded-3xl bg-blue-100">
              <button onClick={()=>setShowModal(!showModal)}><ImCross className='cursor-pointer text-xl text-red-600 absolute top-5 right-10 lg:top-16 lg:right-20 border-2 border-red-600 rounded-full'/></button>
              <div className="max-w-md mx-auto">
                  <form>
                      <div className="flex flex-wrap -m-2">
                          <div className="px-2 w-1/2">
                              <div className="relative">
                                  <label htmlFor="name" className="leading-7 text-sm text-gray-600">Car Model/Name</label>
                                  <input type="text" id="name" name="name" onChange={handleChange} value={carDetails.name} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="Car Model/Name" required />
                              </div>
                          </div>
                          <div className="px-2 w-1/2">
                              <div className="relative">
                                  <label htmlFor="stolenFrom" className="leading-7 text-sm text-gray-600">Stolen From</label>
                                  <input type="text" id="stolenFrom" name="stolenFrom" onChange={handleChange} value={carDetails.stolenFrom} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="Location" required/>
                              </div>
                          </div>
                          <div className="px-2 w-1/2">
                              <div className="relative">
                                  <label htmlFor="color" className="leading-7 text-sm text-gray-600">Color</label>
                                  <input type="text" id="color" name="color" onChange={handleChange} value={carDetails.color}  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder="color" required/>
                              </div>
                          </div>
                          <div className="px-2 w-1/2">
                              <div className="relative">
                                  <label htmlFor="stolenDate" className="leading-7 text-sm text-gray-600">Stolen When</label>
                                  <input type="date" id="stolenDate" name="stolenDate" onChange={handleChange} value={carDetails.stolenDate} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required/>
                              </div>
                          </div>
                          <div className="px-2 w-full">
                              <div className="relative">
                                  <label htmlFor="registrationPlate" className="leading-7 text-sm text-gray-600">Registration Plate Number</label>
                                  <input  type="text" onChange={handleChange} value={carDetails.registrationPlate}  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Registration Plate' name='registrationPlate' id='registrationPlate' required />
                              </div>
                          </div>
                          <div className="px-2 w-full">
                              <div className="relative">
                                  <label htmlFor="vin" className="leading-7 text-sm text-gray-600">Vehicle identifier number</label>
                                  <input  type="text" onChange={handleChange} value={carDetails.vin}  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='VIN' name='vin' id='vin'required />
                              </div>
                          </div>
                          <div className="px-2 w-full">
                              <div className="relative">
                                  <label htmlFor="date" className="leading-7 text-sm text-gray-600">Car Description</label>
                                  <textarea name='carDesc'rows={2} onChange={handleChange} value={carDetails.carDesc} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Car Description' />
                              </div>
                          </div>
                          <div className="px-2 w-full">
                              <div className="relative">
                                  <label htmlFor="theftDesc" className="leading-7 text-sm text-gray-600">Theft Description</label>
                                  <textarea name='theftDesc' rows={2} id='theftDesc' onChange={handleChange} value={carDetails.theftDesc} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Theft Description' required />
                              </div>
                          </div>
                          <div className="px-2 w-full">
                              <div className="relative">
                                  <label htmlFor="file" className="leading-7 text-sm text-gray-600">Image</label>
                                  <input  type="file" onChange={handleFileUpload} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Confirm password' required/>
                              </div>
                          </div>
                          <div className="flex py-2">
                              <button className="flex mx-2 border hover:shadow-sky-500 border-sky-500 px-3 py-1 font-medium rounded-lg  text-sky-500 hover:bg-sky-500 hover:text-slate-900  text-lg" type='submit' onClick={CreatePost} >{loader? <Loader/> :'Register'}</button>
                              <button className="flex mx-auto border hover:shadow-red-500 border-red-500 px-3 py-1 font-medium rounded-lg  text-red-500 hover:bg-red-500 hover:text-slate-900  text-lg" onClick={()=>setShowModal(!showModal)}>Cancel</button>
                          </div>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  </div>
  </div>
      ) : null}
    </div>
  )
}
export default NewPost