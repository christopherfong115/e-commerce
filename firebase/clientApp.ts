// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  doc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useAppDispatch } from "../redux/hooks";
import { userLoggedIn } from "../redux/user/userSlice";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);

// Google sign in
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        date: new Date(),
      });
    }
    return { uid: user.uid };
  } catch (err) {
    console.log(err);
  }
};

const EmailPasswordLogin = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log(res);
  } catch (err: any) {
    if (err.code == "auth/wrong-password") {
      return { error: "Incorrect Password." };
    } else if (err.code == "auth/invalid-email") {
      return { error: "Invalid Email." };
    } else if (err.code == "auth/user-not-found") {
      return { error: "User Not Found" };
    }
    return { error: err };
  }
};

const EmailPasswordRegister = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      date: new Date(),
    });
  } catch (err) {
    console.log(err);
  }
};

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert(
      "Password reset link has been sent to your email! Check your spam inbox"
    );
  } catch (err) {
    console.log(err);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  db,
  storage,
  auth,
  signInWithGoogle,
  EmailPasswordLogin,
  EmailPasswordRegister,
  sendPasswordReset,
  logout,
};
