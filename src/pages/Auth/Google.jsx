import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import { auth, db } from "../../Firebase";
import { useNavigate } from 'react-router-dom';
function Google() {
  const navigate = useNavigate()
  const handleGoogleSignIn = async () => {
    const googleProvider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    localStorage.setItem("car-return", JSON.stringify(user));
    // Check for user
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        profileImg: user.photoURL,
        timeStamp: serverTimestamp(),
      });
    }
    if(auth.currentUser){
      navigate('/profile')
    }
  };
  return (
    <>
      <div>
        <FcGoogle
          title="SignIn with Google"
          className="text-4xl cursor-pointer border rounded-full bg-white"
          onClick={handleGoogleSignIn}
        />
      </div>
    </>
  );
}

export default Google;
