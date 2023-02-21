import { collection, doc, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import NewPost from "../../components/NewPost";
import { auth, db, storage } from "../../Firebase";
import {useState ,useEffect} from 'react'
import {MdEdit} from 'react-icons/md'
import { useNavigate } from "react-router-dom";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import ReportCardDetail from "./ReportedCarsDetails";
import Loader from "../Loader/Loader";
function Profile() {
  const navigate = useNavigate()
  // const [loader,setLoader] = useState(false)
  const [profileImg, setProfileImg] =useState(null);
  const [userData, setUserData] = useState([])
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchReports = async () => {
    try {
        // Get reference
        setLoading(true)
        const listingsRef = collection(db, 'posts')
        const localAuth = JSON.parse(localStorage.getItem('car-return'))
        // Create a query
        const q = query(
            listingsRef,
            where("uid", "==",localAuth.uid),
            orderBy('postedAt', 'desc'),
            // limit(10),
        )
        // Execute query
        // const querySnap = await getDocs(q)
        const post= []
        onSnapshot(q,(snapShot)=>{
          snapShot.forEach((doc)=>{
                post.push({
                    id: doc.id,
                    data: doc.data(),
                })
          })
        })
        setPosts(post);
        setLoading(false)
    } catch (error) {
      console.log(error)
        // toast.error('Could not fetch Posts')
    }
}
  const uploadAvatar = async () => {
    // setLoading(true)
    if(profileImg){
      const imgRef = ref(storage, `avatar/${new Date().getTime()} - ${profileImg?.name}`)
      try {
        if (userData.profileImgPath) {
          await deleteObject(ref(storage, userData.profileImgPath)); //deleting the last avatar 
        }
        const snap = await uploadBytes(imgRef, profileImg);
        
        const url = await getDownloadURL(ref(storage, snap.ref.fullPath))
        
        await updateDoc(doc(db, 'users', userData?.uid), {
          profileImg: url,
          profileImgPath: snap.ref.fullPath,
        })
        setProfileImg(null);
      } catch (e) {
        console.log(e);
        setProfileImg(null)
      }
    }else{
      alert("Select Pictures firstly")
    }
    // setLoading(false);
  }
  const getUserData = async()=>{
    try {
      const localAuth = JSON.parse(localStorage.getItem('car-return'))
      const docRef = doc(db, "users", localAuth.uid);
      onSnapshot(docRef,(snapShot)=>{
        if(snapShot.exists()){
          setUserData(snapShot.data())
        }
        else {
            console.log("No such document!");
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{ 
    if(!auth.currentUser){
      navigate('/login')
    }
    else{
      getUserData();
      fetchReports()
    }
  },[])// eslint-disable-line react-hooks/exhaustive-deps
  const handleFileUpload = (evt)=>{
    if (evt.target.files != null) {
      setProfileImg(evt.target.files[0]);
    }
  }
  if(loading){
    return <div className="h-screen"><Loader /></div>
  }
  return (
    <>
    <div className="dark:bg-slate-900 bg-slate-100 lg:flex lg:justify-around">
      <div className="lg:px-2 md:flex justify-around">
          <div className="dark:bg-slate-900 px-2 py-5 h-auto rounded ">
          <div className="max-w-sm mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="h-40 flex justify-center bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-300 via-green-400 to-rose-700">
              <h1 className="self-center heading text-4xl font-semibold whitespace-nowrap text-black ">CarReturn.co.uk</h1>
            </div>
            <div className="border-b px-4 pb-6">
                <div className="relative text-center sm:text-left sm:flex mb-4">
                    <img className="h-32 w-32 rounded-full border-2 border-white -mt-16 mr-4" src={userData.profileImg} alt=""/>
                    <div className="cursor-pointer absolute left-14 top-14 bg-gray-400 rounded-full">
                      <label htmlFor="profileImg" className="flex cursor-pointer">
                          <MdEdit className="text-lg cursor-pointer text-gray-900" />
                      </label>
                      <input type="file" accept="image/*" style={{ display: "none" }} id="profileImg" onChange={handleFileUpload} />
                    </div>
                    <div className="py-2">
                        <h3 className="font-bold text-2xl mb-1">{userData.name}</h3>
                        {/* <div className="inline-flex text-grey-dark sm:flex items-center">
                          <ImLocation2 />
                            {userData.home}
                        </div> */}
                    </div>
                </div>
                <div className="flex">
                    <button onClick={uploadAvatar} className="flex-1 rounded-full border-2 border-grey font-semibold text-black px-4 py-2">{loading?'Uploading':'Upload'}</button>
                </div>
            </div>
        </div>
        </div>
        </div>
     <div>
     </div>
      <div className="flex justify-start mx-2.5">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
              <NewPost userData={userData}/>
              <div className="my-2">
                {loading?<>Loading..</>:posts?.map((item)=>{
                  return <ReportCardDetail key={item.id} id={item.id} userData={userData} data ={item.data} />
                })}
              </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Profile;
