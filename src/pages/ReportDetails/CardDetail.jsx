import { BsWhatsapp, BsTwitter, BsLinkedin } from 'react-icons/bs'
import {CiPaperplane} from 'react-icons/ci'
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton
  } from "react-share";
import { GrFacebook } from 'react-icons/gr';
import { useEffect, useState } from 'react';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db, auth} from '../../Firebase';
import { v4 as uuidv4 } from 'uuid';
import {FaBan} from 'react-icons/fa'
import {RiDeviceRecoverLine} from 'react-icons/ri'
import { Link } from 'react-router-dom'
import Comments from './Comments';
function CardDetail({id , data}) {
    const [userData, setUserData] = useState([])
    const [postData , setPostData] = useState({})
    const [textComment, setTextComment] = useState('')
    const shareUrl = window.location.href 
    const docRef = doc(db, 'posts', id)
    const getLoggedInUserData = async ()=>{
        try {
            const docRef = doc(db, "users", auth.currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserData(docSnap?.data());
                }
            } catch (error) {
                console.log(error)
            }
    }
    const getStolenCarDetails = ()=>{
        onSnapshot(docRef, (snapShot) => {
           setPostData(snapShot?.data())
        })
    }
    useEffect(()=>{
        getLoggedInUserData();
        getStolenCarDetails()
    },[])// eslint-disable-line react-hooks/exhaustive-deps
    const handleChangeComment = () => {
        try {
            const commentRef = doc(db, 'posts', id)
            if (textComment?.length !== 0) {
                updateDoc(commentRef, {
                    comments: arrayUnion({
                        user: userData.uid,
                        userName: userData.name,
                        comment: textComment,
                        createdAt: new Date(),
                        userImg:userData.profileImg,
                        commentId: uuidv4(),
                    }),
                }).then(() => {
                    setTextComment("")
                }).catch((e)=>{console.log(e)});
            } else {
                alert("Please enter something")
            }
        } catch (error) {
            console.log(error)
            // toast.error("Something went wrong...")
        }
    };
    const handleChangeState = async()=>{
        console.log("updating the state")
        const docRef= doc(db, "posts", id) ;
        await updateDoc(docRef, {
            recover:!postData?.recover,
        })
        console.log("Updated")
    }
  return (
    <>
    <div className='shadow rounded lg:m-2 bg-slate-900 bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white shadow-blue-500 lg:w-96'>
        <div className="mb-4 break-inside p-4 bg-white dark:bg-slate-800 flex flex-col bg-clip-border">
            <div className="flex pb-1 items-center justify-between">
                <div className="flex">
                    <Link className="inline-block mr-4" to={userData?.uid === auth.currentUser?.uid ? "/profile" : `/user/${userData?.uid}`}>
                        <img className="rounded-full max-w-none w-12 h-12" alt='profile-pic' src={userData?.profileImg} />
                    </Link>
                    <div className="flex flex-col">
                        <div>
                            <Link className="inline-block text-lg font-bold dark:text-white text-slate-9000" to={userData?.uid === auth.currentUser?.uid ? "/profile" : `/user/${userData?.uid}`}>{userData?.name}</Link>
                        </div>
                        <div className="text-slate-500 text-sm dark:text-slate-300">{postData?.stolenDate}</div>
                    </div>
                </div>
            </div>
            <h2 className="text-xl font-medium text-white">{postData?.modelName}</h2>
            <div className="py-4">
                <div className="flex justify-between gap-1 mb-1 relative">
                    <img src={postData?.imgPath} alt="Stolen-Car" />
                    <span onClick={data?.uid===(JSON.parse(localStorage.getItem('car-return'))).uid ?handleChangeState:()=>console.log("None")} className={`${postData?.recover?'bg-green-600 cursor-pointer':"bg-red-700 cursor-pointer"} inline-flex items-center rounded-br-lg px-2 text-sm text-white py-1 font-medium font-mono absolute top-0`}>
                        {postData?.recover?<><RiDeviceRecoverLine className='mx-'/>Recovered</>:<><FaBan className='mx-1' />Stolen</>}
                    </span>
                </div>
            </div>
            <div className="py-4 inline-flex justify-between items-center text-2xl">
                <WhatsappShareButton url={shareUrl}>
                    <BsWhatsapp className='text-green-500'/>
                </WhatsappShareButton>
                <TwitterShareButton url={shareUrl} >
                    <BsTwitter className='text-blue-400'/>
                </TwitterShareButton>
                <FacebookShareButton url={shareUrl}> 
                    <GrFacebook className='text-blue-400'/>
                </FacebookShareButton>
                <LinkedinShareButton url={shareUrl}>
                    <BsLinkedin className='text-blue-400'/>
                </LinkedinShareButton>
            </div>
            <div className="relative">
                <input className="pt-2 pb-2 pl-3 w-full h-11 bg-slate-100 dark:bg-slate-600 rounded-lg placeholder:text-slate-600 dark:placeholder:text-slate-300 font-medium pr-20" type="text" placeholder="Write a comment" value={textComment} onChange={e=>setTextComment(e.target.value)} />
                <span className="flex absolute right-4 top-2/4 -mt-3 items-center">
                    <button onClick={handleChangeComment} className="bg-slate-500">
                       <CiPaperplane className='text-2xl cursor-pointer text-slate-900' fill='black' />
                    </button>
                </span>
            </div>
            {/* comments */}
            {postData?.comments?.map((item)=>{
                return <Comments key={item.commentId} data={item}  uid={data?.uid} postId={id} />
            })}
        </div>
    </div>
    </>
  )
}

export default CardDetail