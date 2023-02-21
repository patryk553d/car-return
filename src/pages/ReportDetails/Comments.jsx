import { Link } from "react-router-dom";
import Moment from 'react-moment';
import { AiFillDelete } from 'react-icons/ai'
import { auth, db } from "../../Firebase";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
function Comments({ uid , postId ,data}) {
    const {comment,user,userImg,createdAt,userName ,commentId ,} = data
    const localAuth = JSON.parse(localStorage.getItem('car-return'))
    const handleDeleteComment = () => {
    const commentRef = doc(db, 'posts', postId)
    const yes = window.confirm("Are you sure?")
    if (yes) {
        try {
            updateDoc(commentRef, {
                comments: arrayRemove({
                    user: user,
                    userName: userName,
                    comment: comment,
                    createdAt: createdAt,
                    commentId: commentId,
                    userImg:userImg,
                }),
            }).then(() => {
                console.log("Comment Deleted")
            });
        } catch (error) {
            console.log(error)
        }
    }
}
  return (
    <div>
        <div className="pt-6">
        <div className="media flex pb-4">
            <Link className="mr-4" to={`/user/${user}`}>
                <img className="rounded-full max-w-none w-12 h-12" src={userImg}  alt="user-pic"/>
            </Link>
            <div className="media-body">
                <div className="flex">
                    <Link className="inline-block text-base font-bold mr-2 dark:text-gray-200 text-slate-900" to={`/user/${user}`}>{userName}</Link>
                    <div className="mt-1 text-slate-500 text-xs dark:text-slate-300">{<Moment fromNow>{createdAt?.toDate()}</Moment>}</div>
                    {(user === auth.currentUser?.uid || localAuth?.uid ===uid) ?<>
                            <div className="relative">
                                 <button title="Delete this comment" className='bg-amber-600 rounded float-right absolute left-5 top-3' onClick={handleDeleteComment}><AiFillDelete /></button>
                            </div>
                        </>
                    : null}
                </div>
                <p className="dark:text-white text-slate-800">{comment}</p>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Comments
 