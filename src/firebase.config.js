import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// আপনার ফায়ারবেস কনফিগারেশন
const firebaseConfig = {
  apiKey: "AIzaSyBy0NCTO03x8XiFtZB93YjSrhoMFEWv01Y",
  authDomain: "newest-3c03d.firebaseapp.com",
  projectId: "newest-3c03d",
  storageBucket: "newest-3c03d.firebasestorage.app",
  messagingSenderId: "998476460946",
  appId: "1:998476460946:web:ccb3ba9551a4b43449874b",
  measurementId: "G-8PX7999YJT"
};

// ফায়ারবেস অ্যাপ ইনিশিয়ালাইজ করা
const app = initializeApp(firebaseConfig);

// অথেনটিকেশন এক্সপোর্ট করা
const auth = getAuth(app);
export default auth;