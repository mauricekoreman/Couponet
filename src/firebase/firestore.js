import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
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

async function logoutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Signing out failed: ", error);
  }
}

async function getUserData() {
  try {
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    const userSnap = await getDoc(userDocRef);

    if (userSnap.exists()) {
      return userSnap.data();
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

      // NOTE: later this has to be replaced with a two-step process where linkingUser confirms
      if (!linkingUserData.linked || linkingUserData.linked === auth.currentUser.uid) {
        // updating linked field in currentUser
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userDocRef, {
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

async function addLinkedReceivedCoupons(couponData, docId) {
  try {
    // getting linked user uid
    const userData = await getUserData();
    const linkedUid = userData.linked;

    // // Adding coupondata to coupons_received list of linked user.
    // const docRef = doc(db, "users", linkedUid);
    const docRef = doc(db, `users/${linkedUid}/coupons_received/${docId}`);
    await setDoc(docRef, couponData);
  } catch (error) {
    console.error(error);
  }
}

async function createNewCoupon(couponData) {
  try {
    // creating a document
    const createdCoupon = await addDoc(couponsGivenRef, couponData);

    await addLinkedReceivedCoupons(couponData, createdCoupon.id);

    return createdCoupon.id;
  } catch (error) {
    console.error(error); // TODO: give error message back to user.
  }
}

export {
  registerNewUser,
  loginUser,
  getUserData,
  linkWithUser,
  logoutUser,
  createNewCoupon,
  addLinkedReceivedCoupons,
};
