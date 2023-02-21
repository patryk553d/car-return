import {ImLocation2} from 'react-icons/im';
import {Link} from 'react-router-dom'
import {FaBan} from 'react-icons/fa'
import { BsCalendarWeekFill } from 'react-icons/bs'
import {RiDeviceRecoverLine} from 'react-icons/ri'
function ListingCard({id,data}) {
  const {stolenDate, stolenFrom, theftDesc,imgPath,modelName,recover ,registrationPlate , uid} = data;
  return (
    <>
    <div>
        <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-2xl p-3 max-w-xs md:max-w-3xl mx-auto border border-black bg-white my-2.5">
            <div className="w-full md:w-1/3 bg-white grid place-items-center">
              <Link to={`/listings/${id}/${uid}`}>
                <img src={imgPath} alt="tailwind logo" className="rounded h-auto" />
              </Link>
            <span className={`${recover?'bg-green-600':"bg-red-700"} inline-flex items-center rounded-tl-xl px-2 text-sm text-white py-1 font-medium font-mono absolute top-0 left-0`}>
                {recover?<><RiDeviceRecoverLine className='mx-'/>Recovered</>:<><FaBan className='mx-1' />Stolen</>}
            </span>
            </div>
            <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
              <Link to={`/listings/${id}/${uid}`}>
                <h3 className="font-black text-gray-800 md:text-2xl text-xl">{modelName} {" "} ({registrationPlate})</h3>
              </Link>
                <div className="flex justify-between text-xs "><span><BsCalendarWeekFill className='text-xs inline mb-0.5 mx-0.5'/>{stolenDate}</span> <span> <ImLocation2 className='text-xs inline'/> {stolenFrom}</span></div>
                <p className="md:text-sm text-gray-500 text-base">{theftDesc}</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default ListingCard