import {IoCarSportOutline} from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase';
// import { toast } from "react-toastify";
function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    if (auth.currentUser) {
      localStorage.removeItem('car-return')
      signOut(auth)
        .then(() => {
          // toast.success("Log-out Successfully");
          console.log("Log out successfully")
          navigate('/login')
        })
        .catch((err) => { console.log(err) })
    } else {
      alert("already logout")
    }
  }
  return (
    <>
      <nav className='nav border-b flex flex-wrap items-center justify-between px-4 shadow bg-white dark:bg-slate-900 dark:text-white'>
        <div className="flex flex-no-shrink items-center lg:ml-24 sm:ml-10 py-3 text-grey-darkest">
          <h1 className="leading-none text-2xl font-medium text-grey-darkest">
            <Link className="no-underline flex text-grey-darkest" to="/">
                <IoCarSportOutline className='text-4xl dark:text-white text-slate-900 mr-1.5' />
                <span className="self-center heading text-2xl font-semibold whitespace-nowrap dark:text-white text-slate-900">CarReturn</span>
            </Link>
          </h1>
        </div>
        <input className="menu-btn hidden" type="checkbox" id="menu-btn" />
        <label className="menu-icon block cursor-pointer md:hidden px-2 py-4 relative select-none" htmlFor="menu-btn">
          <span className="navicon bg-grey-darkest flex items-center relative"></span>
        </label>
        <ul className="menu border-b md:border-none flex justify-end list-reset font-serif m-0 w-full md:w-auto">
            <li className="border-t md:border-none transition ease-in-out delay-150  duration-300">
              <Link to="/" className="block  hover:text-blue-400 md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker"><span className='text-sm font-medium'>Home</span></Link>
            </li>
            <li className="border-t md:border-none transition ease-in-out delay-150   duration-300">
              <Link to="/about" className="block hover:text-blue-400 md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker"><span className='text-sm font-medium '>About</span></Link>
            </li>
            <li className="border-t md:border-none transition ease-in-out delay-150   duration-300">
              <Link to="/listings" className="block hover:text-blue-400 md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker"><span className='text-sm font-medium'>Stolen Cars</span></Link>
            </li>
            <li className="border-t md:border-none transition ease-in-out delay-150   duration-300">
              <Link to="/contact" className="block  hover:text-blue-400 md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker"><span className='text-sm font-medium'>Contact Us</span></Link>
            </li>
          {localStorage.getItem('car-return') ? (<>
            <li className="border-t md:border-none transition ease-in-out delay-150   duration-300">
              <Link to="/profile" className="block  hover:text-blue-400 md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker"><span className='text-sm font-medium'>Report Stolen Car </span></Link>
            </li>
            <li className="border-t md:border-none flex md:block ">
              <button onClick={handleLogout} className='block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker md:bg-blue-400 rounded-md shadow-lg'>Logout</button>
            </li>
          </>) : (
            <>
              <li className="border-t md:border-none mx-1">
                <Link to="/signup" className="block md:inline-block px-4 py-2.5 no-underline text-grey-darkest hover:text-grey-darker hover:md:bg-blue-400 md:border md:shadow-lg md:border-blue-400 hover:text-slate-900 rounded shadow-lg">Sign up</Link>
              </li>
              <li className="border-t md:border-none ">
                <Link to="/login" className="block md:inline-block px-4 py-2.5 no-underline text-grey-darkest hover:text-grey-darker hover:md:bg-blue-400 md:border md:shadow-lg md:border-blue-400 hover:text-slate-900 rounded shadow-lg">Login</Link>
              </li>
            </>
          )}
        </ul>

      </nav>
    </>

  )
}

export default Navbar