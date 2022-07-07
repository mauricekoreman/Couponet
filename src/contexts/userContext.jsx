import { createContext, useContext, useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";

import { db } from "../firebase/firebase.config";
import { useAuth } from "./authContext";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  const userDocRef = doc(db, "users", currentUser.uid);

  async function getUserData() {
    const userSnap = await getDoc(userDocRef);

    setUserData(userSnap.data());
    setLoading(false);
  }

  async function updateUserData(data) {
    await updateDoc(userDocRef, data);

    setUserData((prevState) => ({
      ...prevState,
      ...data,
    }));

    return true;
  }

  async function linkUser(email) {
    // add email to emailUser.linked
    const linkedUserQuery = query(collection(db, "users"), where("email", "==", email));
    const linkedUserSnap = await getDocs(linkedUserQuery);

    if (linkedUserSnap.size !== 1) {
      throw new Error("User does not exist");
    }

    // Get the id and reference
    const linkedUserId = linkedUserSnap.docs[0].id;
    const linkedUserDocRef = doc(db, "users", linkedUserId);

    await updateUserData({ linked: linkedUserId });

    await updateDoc(linkedUserDocRef, {
      linked: currentUser.uid,
    });
  }

  useEffect(() => {
    getUserData();
  }, []);

  const value = {
    userData,
    updateUserData,
    linkUser,
    userDocRef: userDocRef,
    couponsReceivedRef: query(collection(db, "coupons"), where("to", "==", currentUser.uid)),
    couponsGivenRef: query(collection(db, "coupons"), where("from", "==", currentUser.uid)),
  };

  return <UserContext.Provider value={value}>{!loading && children}</UserContext.Provider>;
}
