import {BiTime} from 'react-icons/bi'
import {ImLocation2} from 'react-icons/im'
import {FaBan} from 'react-icons/fa'
import {RiDeviceRecoverLine} from 'react-icons/ri'
import { Link } from 'react-router-dom'
function StolenCarCard({id,data}) {
    const {stolenDate, stolenFrom, theftDesc,imgPath,modelName, recover, uid} =data;
  return (
  <>
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-xl w-72 relative">
        <Link to={`/listings/${id}/${uid}`}>
            <img className="rounded-t-lg" src={imgPath} alt="car-img" />
        </Link>
        <span className={`${recover?'bg-green-600':"bg-red-700"} inline-flex items-center rounded-tl-lg px-2 text-sm text-white py-1 font-medium font-mono absolute top-0`}>
            {recover?<><RiDeviceRecoverLine className='mx-'/>Recovered</>:<><FaBan className='mx-1' />Stolen</>}
        </span>
        <div className="p-5">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900">{modelName}</h5>
                <div className='text-xs flex'>
                <p className='inline'><BiTime className='inline mb-1'/><span>{stolenDate}</span></p>,<p><ImLocation2 className='inline mb-1' /><span>{stolenFrom}</span></p>
                </div>
            <p className="text-sm text-gray-700 dark:text-gray-400">{theftDesc.substring(0,70)}  <Link to={`/listings/${id}/${uid}`} className="text-rose-400 hover:text-rose-600">View Details</Link> </p>
        </div>
    </div>
 </>
  )
}

export default StolenCarCard