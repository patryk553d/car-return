import ListingCard from "./ListingCard";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, orderBy, query, } from "firebase/firestore";
import { db } from "../../Firebase";
import Loader from "../Loader/Loader";
function Listings() {
  
  const [loading ,setLoading] = useState(false);
  const [reportListings,setReportListings] = useState([])
  const [searchText , setSearchText] = useState('')

  const handleSearchCarS = ()=>{
   try {
      setLoading(true)
      const postRef = collection(db, "posts");
      const unsub = onSnapshot(postRef, (querySnapshot) => {
        let posts = [];
        querySnapshot.forEach((doc) => { // here finding all the cars reported 
          posts.push(doc.data());
        })
        const filterData = posts.filter((value) => { 
          //logic to search car the inside details of cars 
          // search via modelName ,stolenFrom 
          return (value.modelName.toLowerCase().includes(searchText.toLowerCase()) || value.stolenFrom.toLowerCase().includes(searchText.toLowerCase()))
        })
        setLoading(false);
        setReportListings(filterData);
      });
    return () => unsub();
   } catch (error) {
      console.log(error)
   }
  }

  useEffect(() => {
    fetchListings()
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  const fetchListings  = async ()=>{
    try {
      // Get reference
      setLoading(true)
      const listingsRef = collection(db, 'posts')
      // Create a query
      const q = query(
        listingsRef,
        orderBy('postedAt', 'desc'), //limit can be add for making pagination
      )
      // Execute query
      const querySnap = await getDocs(q)

      const post =[];
      querySnap.forEach((doc) => {
          // post.push({ id: doc?.id, data:doc?.data() })
          post.push(doc.data());
      })
      setReportListings(post)
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }
  return (
    <>
      <section>
        <div className="bg-blue-300 text-center mt-10">
          <div className="py-16">
            <h1 className="text-3xl font-medium text-black">Stolen cars</h1>
            <p className="font-medium text-gray-700 text-sm lg:text-base">Cars reported as stolen from in and around the UK</p>
          </div>
        </div>
        <div className="flex justify-around mt-16">
           <div className="">
              <div className='flex rounded-xl'>
                  <input type="text" name="searchText" id="searchText" value={searchText} onChange={e=>setSearchText(e.target.value)} className='px-3 py-3 w-full lg:w-1/2 placeholder-slate-500 text-slate-600 relative bg-gray-200 rounded-l text-sm border-0 shadow outline-none focus:outline-none focus:ring-black' placeholder='Search' />
                  <button className='bg-black text-white rounded-r-xl px-5 py-3' onClick={handleSearchCarS}>Search</button>
              </div>
              <div className="">
                {loading?<> <h1 className="text-center mt-10"><Loader/></h1></>:reportListings?.map((item,i)=>{
                  return <ListingCard key={i} id={item.id} uid={item.uid} data = {item}/>
                })}
              </div>
            </div>
          <div>
            
          </div>
        </div>
      </section>
    </>
  );
}

export default Listings;
