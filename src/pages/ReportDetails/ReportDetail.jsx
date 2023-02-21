import {useEffect , useState} from 'react'
import { ImLocation2 } from 'react-icons/im'
import { BsCalendarWeekFill } from 'react-icons/bs'
import {  doc, getDoc, onSnapshot,} from 'firebase/firestore';
import { db } from '../../Firebase';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import ReportCardDetail from './ReportCardDetail';
function ReportDetail() {
    // This component will show in profile page 
    const params = useParams();
    const { id, uid } = params; 
    const [listDetail, setListDetail] = useState([])
    const [userData, setUserData] = useState([])
    const [loader, setLoader] = useState(false)
    const fetchDetailListing = ()=>{
        setLoader(true)
        try {
            const postRef = doc(db, "posts",id);
            onSnapshot(postRef,(snapShot)=>{
                if(snapShot.exists()){
                    setListDetail(snapShot?.data())
                    setLoader(false)
                }
                else {
                    console.log("No such document!");
                    setLoader(false)
                }
              })
            } catch (error) {
                setLoader(false)
                console.log(error);
            }
        setLoader(false)
    }
    
    useEffect(()=>{
        setLoader(true)
        const getUserData = async() =>{
            setLoader(true)
            const docRef= doc(db, 'users', uid); 
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserData(docSnap?.data());
                setLoader(false)
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
            setLoader(false)
        }
        getUserData();
        fetchDetailListing();
        setLoader(false)
    },[])// eslint-disable-line react-hooks/exhaustive-deps
    if(loader){
        return <div className='h-screen'><Loader /></div>
    }
    return (
        <>
            <section>
                <div className="bg-blue-300 text-start lg:mt-10">
                    <div className="py-16 lg:pl-32 pl-5">
                        <h1 className="text-3xl lg:text-5xl font-medium text-gray-100">{listDetail?.modelName}{" "}({listDetail?.registrationPlate})</h1>
                        <div className='flex justify-start text-sm lg:text-base'>
                            <p className='mx-1'><ImLocation2 className='inline mb-1' /><span className='my-1'>{listDetail?.stolenFrom}</span></p> <p className='mx-1'> <BsCalendarWeekFill className='inline mb-1 mx-1' /><span>{listDetail?.stolenDate}</span></p>
                        </div>
                    </div>
                </div>
                <div className='md:flex md:justify-around'>
                    <div>
                        <div className='lg:pl-32 mx-2'>
                            <ul className='list-none  flex text-gray-500 list-inside'>
                                <div className='lg:mr-10'>

                                    <li> <span className='font-medium text-black'>Registration Plate:</span> <br />{listDetail?.registrationPlate}</li>
                                    <li><span className='font-medium text-black'>Color: </span><br /> {listDetail?.color}</li>
                                    <li><span className='font-medium text-black'>VIN:</span><br /> {listDetail?.vin}</li>
                                </div>
                                <div className='lg:mx-10 mx-2'>
                                    <li><span className='font-medium text-black'>Stolen Date:</span> <br /> {listDetail?.stolenDate}</li>
                                    <li><span className='font-medium text-black'>Stolen From:</span><br /> {listDetail?.stolenFrom}</li>
                                </div>
                            </ul>
                            <div className='text-gray-500'>
                            <p> <span className='font-medium text-black'>Car Description:</span> <br /> {listDetail?.carDesc}</p>
                            <p><span className='font-medium text-black'>Recovery Description:</span><br />{listDetail?.theftDesc}</p>
                            </div>
                        </div>
                    </div>
                    <div className='relative mx-2'>
                        {/* picture and sharing */}
                       <div className='lg:-mt-28 mr-10 w-full'>
                           <ReportCardDetail id={id} uid={listDetail?.uid} postData={listDetail} userData={userData}/>
                       </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default ReportDetail