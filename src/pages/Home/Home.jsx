import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import StolenCarCard from './StolenCarCard'
import { db } from '../../Firebase';
import {IoCarSportOutline} from 'react-icons/io5'
import Loader from '../Loader/Loader';
function Home() {
  const [loading ,setLoading] = useState(false);
  const [reportListings,setReportListings] = useState([])
  useEffect(() => {
    const fetchListings  = async ()=>{
      try {
        // Get reference
        setLoading(true)
        const listingsRef = collection(db, 'posts')
        // Create a query
        const q = query(
          listingsRef,
          orderBy('postedAt', 'desc'),
          limit(6)
        )
        // Execute query
        const querySnap = await getDocs(q)
  
        const post =[];
        querySnap.forEach((doc) => {
            post.push({ id: doc?.id, data:doc?.data() })
        })
        setReportListings(post)
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    }
    fetchListings()
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
        <section>
          <div className='relative'>
              <div className='h-60 lg:h-screen bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-300 via-green-400 to-rose-700'></div>
              <div className='absolute top-1/4 left-10 lg:left-20'>
                <div className='flex'>
                  <IoCarSportOutline className='text-4xl  lg:text-8xl text-black mr-1.5' />
                  <h1 className="self-center heading text-4xl lg:text-8xl font-semibold whitespace-nowrap text-black lg:underline decoration-dashed decoration-white underline-offset-8">CarReturn.co.uk</h1>
                </div>
                <p className='m-1 pr-10 font-medium text-xs lg:text-lg'>Carreturn.co.uk - place where you can report your stolen vehicle.</p>
              </div>
          </div>
        </section>
        <section className="container mx-auto px-6 p-10">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Artoo!</h2>
          <div className="flex items-center flex-wrap mb-20">
            <div className="w-full md:w-1/2 pr-10">
              <h4 className="text-3xl text-gray-800 font-bold mb-3">Vortex</h4>
              <p className="text-gray-600 mb-8">Their primary target will be the power generators. Prepare to open the shield. Sir, Rebel ships are coming into our sector. Good. Our first catch of the day. Stand by, ion control....Fire! The first transport is away.</p>
            </div>
            <div className="w-full md:w-1/2">
              <img className="rounded-lg" src="https://pbs.twimg.com/media/CR45LOXVEAADG5E.jpg" alt="Vortex" />
            </div>
          </div>
          <div className="flex items-center flex-wrap mb-20">
            <div className="w-full md:w-1/2">
              <img className="rounded-lg" src="https://www.thesun.co.uk/wp-content/uploads/2019/06/SWJFO-EAPlay-08-1.jpg" alt="use the force" />
            </div>
            <div className="w-full md:w-1/2 pl-10">
              <h4 className="text-3xl text-gray-800 font-bold mb-3">Use the Force!</h4>
              <p className="text-gray-600 mb-8">We'll never get it out now. So certain are you. Always with you it cannot be done. Hear you nothing that I say? Master, moving stones around is one thing. This is totally different. No! No different!</p>
            </div>
          </div>
          <div className="flex items-center flex-wrap mb-20">
            <div className="w-full md:w-1/2 pr-10">
              <h4 className="text-3xl text-gray-800 font-bold mb-3">Life creates it</h4>
              <p className="text-gray-600 mb-8">There is no try. I can't. It's too big. Size matters not. Look at me. Judge me by my size, do you? Hm? Mmmm. And well you should not. For my ally in the Force. And a powerful ally it is.</p>
            </div>
            <div className="w-full md:w-1/2">
              <img className="rounded-lg" src="https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Ferikkain%2Ffiles%2F2018%2F01%2FRey-Luke.jpg" alt="Syncing" />
            </div>
          </div>
        </section>
        {/* some few register stolen cars */}
        <section className='bg-yellow-300'>
            <h1 className='text-center text-3xl font-serif font-medium'>Recent Stolen Cars</h1>
          <div className='w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5'>
            {loading?<><h1 className='text-center'><Loader/></h1></>:(
              reportListings.map((item)=>{
                return <StolenCarCard key={item.id} id={item.id} data = {item.data} />
              })
            )}
          </div>
          <div className=' flex justify-center'>
            <Link to="/listings"><button className='bg-blue-500 hover:bg-blue-400 rounded-md shadow-lg px-5 py-2 m-1'>Show More</button></Link>
          </div>
        </section>
        {/* got to theListings || Register  sections*/}
        <section className='bg-blue-400'>
          <div className="container mx-auto px-6 text-center py-20">
            <h2 className="mb-6 text-4xl font-bold text-center text-white font-serif">Report your stolen Car</h2>
            <h3 className="my-4 text-sm md:text-xl lg:text-2xl text-white">Let someone help you. Take it easy. Stolen Cars Register Now</h3>
            <Link to="/profile"><button className="bg-white font-bold rounded-full mt-6 py-4 px-8 shadow-lg uppercase tracking-wider hover:border-red hover:text-white hover:bg-blue-600">Register</button></Link>
          </div>
        </section>
        {/* Testimonials section */}
        <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1 className="text-3xl font-medium title-font text-gray-900 mb-12 text-center">Testimonials</h1>
          <div className="flex flex-wrap -m-4">
            <div className="p-4 md:w-1/2 w-full">
              <div className="h-full bg-gray-100 p-8 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="block w-5 h-5 text-gray-400 mb-4" viewBox="0 0 975.036 975.036">
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>
                <p className="leading-relaxed mb-6">I was devastated when I discovered that my car had been stolen, but this website made the process of reporting the theft much easier. The website provided clear instructions on what to do, and I was able to report the theft to the police within minutes. Thanks to this website, my car was recovered, and I am grateful for their help.</p>
                <a className="inline-flex items-center" href='/'>
                  <img alt="testimonial" src="https://dummyimage.com/106x106" className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"/>
                  <span className="flex-grow flex flex-col pl-4">
                    <span className="title-font font-medium text-gray-900">Rajan Kumar</span>
                    <span className="text-gray-500 text-sm">2023-03-20</span>
                  </span>
                </a>
              </div>
            </div>
            <div className="p-4 md:w-1/2 w-full">
              <div className="h-full bg-gray-100 p-8 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="block w-5 h-5 text-gray-400 mb-4" viewBox="0 0 975.036 975.036">
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>
                <p className="leading-relaxed mb-6">I highly recommend this website to anyone who has had their vehicle stolen. The website is user-friendly, and the reporting process is very straightforward. Thanks to this website, I was able to get the word out about my stolen car and work with law enforcement to recover it.</p>
                <a className="inline-flex items-center" href='/'>
                  <img alt="testimonial" src="https://dummyimage.com/107x107" className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"/>
                  <span className="flex-grow flex flex-col pl-4">
                    <span className="title-font font-medium text-gray-900">Patryak</span>
                    <span className="text-gray-500 text-sm">2023-02-14</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default Home