import { db } from "../../Firebase";
import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import {useState ,useEffect} from 'react'
import CardDetail from "../ReportDetails/CardDetail";
import { useParams } from "react-router-dom";
import SendMailToUser from "./SendMailToUser";
function UserProfile() {
  const params = useParams();
  const { id } = params;
  const [posts, setPosts] = useState([]);
  const [userData,setUserData]=useState([])
  const [loading, setLoading] = useState(false);
  const fetchPosts = async () => {
    try {
        // Get reference
        setLoading(true)
        const listingsRef = collection(db, 'posts')
        // Create a query
        const q = query(
            listingsRef,
            where("uid", "==",id),
            orderBy('postedAt', 'desc'),
            limit(10),
        )
        // Execute query
        const querySnap = await getDocs(q)

        const post = []

        querySnap.forEach((doc) => {
            post.push({
                id: doc.id,
                data: doc.data(),
            })
        })
        setPosts(post);
        setLoading(false)
    } catch (error) {
      console.log(error)
        // toast.error('Could not fetch Posts')
    }
}
  const getUserData = async()=>{
    try {
      const docRef = doc(db, "users", id );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap?.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getUserData();
    fetchPosts();

  },[])// eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
    <section className="bg-slate-900">
        <h1 className="text-center text-white text-3xl">{userData.name}</h1>
        <div className="lg:px-20 md:flex justify-around">
          <div className="bg-slate-900 px-2 py-5 h-auto rounded ">
          <div className="max-w-sm mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="h-40 flex justify-center bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-300 via-green-400 to-rose-700">
              <h1 className="self-center heading text-4xl font-semibold whitespace-nowrap text-black ">CarReturn.co.uk</h1>
            </div>
            <div className="border-b px-4 pb-6">
                <div className="text-center sm:text-left sm:flex mb-4">
                    <img className="h-32 w-32 rounded-full border-2 border-white -mt-16 mr-4" src={userData.profileImg} alt=""/>
                    <div className="py-2">
                        <h3 className="font-bold text-2xl mb-1">{userData.name}</h3>
                    </div>
                </div>
                <div className="flex">
                    <button className="flex-1 rounded-full border-2 border-grey font-semibold text-black px-4 py-2">Message</button>
                </div>
                <SendMailToUser email={userData?.email} />
            </div>
        </div>
      </div>
          <div>
            <div className="">
            {/* posted posts */} 
            {loading?<>Loading..</>:posts?.map((item)=>{
              return <CardDetail key={item.id} id={item.id} data={item.data} />
            })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default UserProfile