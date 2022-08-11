import {
  createUserWithEmailAndPassword,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateEmail,
} from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase.config";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function register(name, email, password) {
    return createUserWithEmailAndPassword(auth, email, password).then(async (user) => {
      await setDoc(doc(db, "users", user.user.uid), {
        email: email,
        name: name,
        linked: null,
      });
    });
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function changeEmail(newEmail) {
    console.log("chading email to: ", newEmail);
    return updateEmail(currentUser, newEmail);
  }

  async function deleteUserCoupons() {
    // get the query of all documents we want to delete
    const couponsToDeleteQuery = query(
      collection(db, "coupons"),
      where("from", "==", currentUser.uid)
    );
    const couponsToDeleteSnap = await getDocs(couponsToDeleteQuery);

    // Add the document id's to array (forEach can't do async await)
    const ids = [];
    couponsToDeleteSnap.forEach((doc) => {
      ids.push(doc.id);
    });

    // Delete the documents
    for (const i of ids) {
      await deleteDoc(doc(db, "coupons", i));
    }
  }

  async function deleteAccount(email, password, linkedUserId) {
    const credential = EmailAuthProvider.credential(email, password);

    return reauthenticateWithCredential(currentUser, credential).then(async () => {
      const user = auth.currentUser;

      // Delete the coupons of the current user
      await deleteUserCoupons();

      // Delete firestore entries of current user
      await deleteDoc(doc(db, "users", user.uid));

      // Update firestore of linked user
      if (linkedUserId) {
        const linkedUserDocRef = doc(db, "users", linkedUserId);
        await updateDoc(linkedUserDocRef, { linked: null, linkedUserName: null });
      }

      deleteUser(user);
    });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    register,
    login,
    logout,
    resetPassword,
    changeEmail,
    deleteAccount,
    deleteUserCoupons,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
