import {IoCarSportOutline} from 'react-icons/io5'
import { Link} from 'react-router-dom'
function Footer() {
  return (
 <>
    <footer className="p-4 bg-white  shadow md:px-6 md:py-8 dark:bg-gray-900">
        <div className="sm:flex sm:items-center sm:justify-between">
            <Link to="/" className="flex items-center mb-4 sm:mb-0 lg:px-10">
                    <IoCarSportOutline className='text-4xl dark:text-white mr-1.5' />
                    <span className="self-center heading text-2xl font-semibold whitespace-nowrap dark:text-white">CarReturn</span>
            </Link>
            <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <Link to="/about" className="mr-4 hover:underline md:mr-6 ">About</Link>
                </li>
                <li>
                    <Link to="/privacy-policy" className="mr-4 hover:underline md:mr-6">Privacy Policy</Link>
                </li>
                <li>
                    <Link to="/licensing" className="mr-4 hover:underline md:mr-6 ">Licensing</Link>
                </li>
                <li>
                    <Link to="/contact" className="hover:underline">Contact Us</Link>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© <Link to="/" className="hover:underline">CarReturn</Link>. All Rights Reserved.</span>
    </footer>
 </>
  )
}

export default Footer