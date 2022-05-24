import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "./firebase.config";

async function registerNewUser(email, password, name, setError) {
  if (name === "" || email === "" || password === "") {
    setError("Name, email and password are mandatory.");
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password).then(async (user) => {
      await setDoc(doc(db, "users", user.user.uid), {
        email: email,
        name: name,
        linked: null,
      });
    });
  } catch (error) {
    setError(error.code);
  }
}

async function loginUser(email, password, setError) {
  if (email === "" || password === "") {
    setError("Email and password are mandatory.");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    setError(error.code);
  }
}

async function getUserData() {
  try {
    const user = auth.currentUser;

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function linkWithUser(email) {
  // zoek een gebruiker op met dit email adres
  // als gebruiker bestaat, verstuur een melding naar deze gebruiker met uid van uitnodiger
  // als uitnodiger accepteerd => voeg bij uitnodiger deze gebruiker toe in link veld
  // als uitnodiger accepteerd => voeg bij hemzelf de uid toe in link veld
  // als gebruiker niet bestaat, geef error terug

  try {
    // create a reference to users collection
    const usersRef = collection(db, "users");

    // create a query agains the collection
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size === 1) {
      // TODO: verstuur melding naar deze geburiker met uid van uitnodiger
      const linkingUserData = querySnapshot.docs[0].data();
      const linkingUserId = querySnapshot.docs[0].id;

      if (!linkingUserData.linked) {
        // NOTE: later this has to be replaced with a two-step process where linkingUser confirms
        const currentUserRef = doc(db, "users", auth.currentUser.uid);

        // updating linked field in currentUser
        await updateDoc(currentUserRef, {
          linked: linkingUserId,
        });

        // update linked state
        return true;
      }
    }
  } catch (error) {
    console.error("linking with user error: ", error);
  }
}

export { registerNewUser, loginUser, getUserData, linkWithUser };
