import { collection, doc, getDoc, query, where } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/firebase.config";
import { useAuth } from "./authContext";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  async function getUserData() {
    const userDocRef = doc(db, "users", currentUser.uid);
    const userSnap = await getDoc(userDocRef);

    setUserData(userSnap.data());
    setLoading(false);
  }

  useEffect(() => {
    getUserData();
  }, []);

  const value = {
    userData,
    couponsReceivedRef: query(collection(db, "coupons"), where("to", "==", currentUser.uid)),
    couponsGivenRef: query(collection(db, "coupons"), where("from", "==", currentUser.uid)),
  };

  return <UserContext.Provider value={value}>{!loading && children}</UserContext.Provider>;
}
