// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDHofHAp1jjdMOcLRjSmwjxvLMCKbeXWRY",
  authDomain: "instantly-js.firebaseapp.com",
  projectId: "instantly-js",
  storageBucket: "instantly-js.firebasestorage.app",
  messagingSenderId: "180782305309",
  appId: "1:180782305309:web:07a655254408bc2c20f6f4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      imageId: "",
      username: username.toLowerCase(),
      email,
      name: "",
      avatar: "",
      bio: "Hey there! I'm using Instantly.",
      lastSeen: Date.now(),
    });
    await setDoc(doc(db, "chats", user.uid), {
      chatData: [],
    });
  } catch (error) {
    console.error(error);
    toast.error(error.code.split("/")[1].split("-").join(" ").toUpperCase());
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split("/")[1].split("-").join(" ").toUpperCase());
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split("/")[1].split("-").join(" ").toUpperCase());
  }
};

const resetPass = async (email) => {
  if (!email) {
    toast.error("Enter your Email");
    return null;
  }

  try {
    const userRef = collection(db, "users");
    const q = query(userRef, where("email", "==", email));
    const querySnap = await getDocs(q);
    if (!querySnap.empty) {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset Email sent");
    } else {
      toast.error("Email does not exists");
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};
export { signup, login, logout, auth, db, resetPass };
