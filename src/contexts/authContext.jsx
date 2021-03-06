import {
  createUserWithEmailAndPassword,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateEmail,
} from "firebase/auth";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
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

  async function deleteAccount(email, password, linkedUserId) {
    const credential = EmailAuthProvider.credential(email, password);

    return reauthenticateWithCredential(currentUser, credential).then(() => {
      const user = auth.currentUser;
      deleteUser(user).then(async () => {
        // Delete firestore entries of current user
        await deleteDoc(doc(db, "users", user.uid));

        // Update firestore of linked user
        if (linkedUserId) {
          const linkedUserDocRef = doc(db, "users", linkedUserId);
          await updateDoc(linkedUserDocRef, { linked: null, linkedUserName: null });
        }
      });
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
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
