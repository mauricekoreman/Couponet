import { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

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
    // Get user data
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
  }

  async function updateLinkedUserData(data) {
    const linkedUserDocRef = doc(db, "users", userData.linked);

    // update the document of the linked user
    await updateDoc(linkedUserDocRef, data);
  }

  async function linkUser(email) {
    // add email to emailUser.linked
    const linkedUserQuery = query(collection(db, "users"), where("email", "==", email)); // TODO: add && "linked" == null
    const linkedUserSnap = await getDocs(linkedUserQuery);

    if (linkedUserSnap.size !== 1) {
      throw new Error("User does not exist");
    }

    // Get the id and reference
    const linkedUserId = linkedUserSnap.docs[0].id;
    const linkedUserName = linkedUserSnap.docs[0].data().name;
    const linkedUserDocRef = doc(db, "users", linkedUserId);

    // Update the document of the current user
    await updateUserData({ linked: linkedUserId, linkedUserName: linkedUserName });

    // Update the document of the linked user
    await updateDoc(linkedUserDocRef, {
      linked: currentUser.uid,
      linkedUserName: userData.name,
    });
  }

  async function unlinkUser() {
    // update the document of the current user
    await updateUserData({ linked: null, linkedUserName: null });

    // update the document of the linked user
    await updateLinkedUserData({ linked: null, linkedUserName: null });
  }

  useEffect(() => {
    getUserData();
  }, []);

  const value = {
    userData,
    updateUserData,
    updateLinkedUserData,
    linkUser,
    unlinkUser,
    userDocRef: userDocRef,
    couponsReceivedRef: query(
      collection(db, "coupons"),
      where("to", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    ),
    couponsGivenRef: query(
      collection(db, "coupons"),
      where("from", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    ),
  };

  return <UserContext.Provider value={value}>{!loading && children}</UserContext.Provider>;
}
