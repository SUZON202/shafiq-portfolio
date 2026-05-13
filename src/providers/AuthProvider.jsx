import { createContext, useEffect, useState } from "react";
import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut 
} from "firebase/auth";
import auth from "../firebase.config"; 

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('Current User State:', currentUser); 

            if (currentUser) {
                // ইউজার লগইন করলে ব্যাকএন্ড থেকে টোকেন চাইবে
                const userInfo = { email: currentUser.email };
                
                fetch('http://localhost:5000/jwt', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(userInfo)
                })
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Server returned an error');
                    }
                    return res.json();
                })
                .then(data => {
                    if (data.token) {
                        localStorage.setItem('access-token', data.token);
                    }
                    // টোকেন সেভ হওয়ার পর লোডিং শেষ হবে
                    setLoading(false); 
                })
                .catch(error => {
                    console.error("JWT Fetch Error:", error);
                    // সার্ভার ডাউন থাকলেও ড্যাশবোর্ড যেন আটকে না থাকে
                    setLoading(false); 
                });
            } else {
                // ইউজার লগআউট করলে টোকেন মুছে ফেলবে
                localStorage.removeItem('access-token');
                setLoading(false);
            }
        });
        
        return () => unSubscribe();
    }, []);

    const authInfo = { 
        user, 
        loading, 
        createUser, 
        signIn, 
        logOut 
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;