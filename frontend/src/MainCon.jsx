import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { db, storage } from "./Firebase"
import { get, onValue, ref, remove, push, ref as dbRef, set } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { signOut } from "firebase/auth";


const MainContext = createContext()

function MainCon(props) {
  const [user, SetUser] = useState(null)
  const [member, setMember] = useState(null)
  const [userUID, SetUserUID] = useState(null)
  const [selectPackage, SetSelectPackage] = useState(null)
  const [PricingDetails, SetPricingDetails] = useState(null)
  const [MemberDetails, SetMemberDetails] = useState([]);
  const [supplement, SetSupplement] = useState([])
  const [notifications, setNotifications] = useState([]);
  const [Mydeits, SetMydeits] = useState([])
  const [admin, SetAdmin] = useState(null)
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        SetUserUID(currentUser.uid);
        fetchUser(currentUser.uid);
        fetchMemberDetails(currentUser.uid);
      } else {
        console.log("No user is signed in");
      }
    });

    return () => unsubscribe();
  }, []);


  const signInWithEmailPassword = async (email, password) => {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // OPTIONAL: Set as admin in context (if matches allowed email)
    const adminEmails = ['gym@gmail.com']; // authorized admin list
    if (adminEmails.includes(user.email)) {
      SetAdmin(user); // Save admin user in context
    }


    return user;
  };



  const fetchMemberData = async (id = null) => {
    try {
      const dbRef = id ? ref(db, `member/${id}`) : ref(db, 'member');
      const snapshot = await get(dbRef);
      const data = snapshot.val();

      if (!data) {
        SetMemberDetails(id ? null : []);
        return;
      }

      if (id) {
        SetMemberDetails({ id, ...data }); // single user object
      } else {
        const users = Object.entries(data).map(([key, value]) => ({ id: key, ...value }));
        SetMemberDetails(users); // array of users
      }
    } catch (err) {
      console.error("Error fetching user(s):", err);
      SetMemberDetails(id ? null : []);
    }
  };

  const fetchPackageDetails = async (id = null) => {
    try {
      const dbRef = id ? ref(db, `packages/${id}`) : ref(db, 'packages');
      const snapshot = await get(dbRef);
      const data = snapshot.val();
      console.log(data)
      if (!data) {
        SetPricingDetails([]); // clear or empty state
        return;
      }

      if (id) {
        // return single object with id included
        SetPricingDetails([{ id, ...data }]);
      } else {
        // return all as array of objects
        const packages = Object.entries(data).map(([key, value]) => ({ id: key, ...value }));
        SetPricingDetails(packages);
      }
    } catch (err) {
      console.error("Error:", err);
      SetPricingDetails([]);
    }
  };

  const fetchDataFromDatabase = async (route, id = null) => {
    try {
      const dbRef = id ? ref(db, `${route}/${id}`) : ref(db, `${route}`);
      const snapshot = await get(dbRef);

      const data = snapshot.val();

      if (!data) {
        SetSupplement([]);
        return;
      }

      if (id) {
        // return single object with id included
        SetSupplement([{ id, ...data }]);
      } else {
        // return all as array of objects
        const packages = Object.entries(data).map(([key, value]) => ({ id: key, ...value }));
        SetSupplement(packages);
      }
    } catch (err) {
      console.error("Error:", err);
      SetSupplement([]);
    }
  };

  const fetchUser = (uid) => {
    const userRef = ref(db, 'users/' + uid);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      SetUser(data);
    }, (error) => {
      console.error("Error fetching user:", error);
    });
  };

  const fetchMemberDetails = (uid) => {
    const memberRef = ref(db, 'member/' + uid);
    onValue(memberRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMember(data);
      }
    }, (error) => {
      console.error("Error fetching member details:", error);
    });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        SetUser(null)
        setMember(null)
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });

  }

  const deleteUserFromdataBase = async (route, userId) => {
    try {
      await remove(ref(db, `${route}/${userId}`));
      console.log(`User with ID '${userId}' deleted from '${route}' in Realtime Database.`);
    } catch (error) {
      console.error("Error deleting user from Realtime DB:", error);
    }
  };

  const sendNotification = (memberId, msg) => {

    try {
      const timestamp = new Date().toLocaleString();
      const notificationListRef = ref(db, `notifications/members/${memberId}`);
      const newNotificationRef = push(notificationListRef);
      set(newNotificationRef, {
        message: msg,
        timestamp: new Date().toLocaleString()
      }).then((success) => {
        const logRef = push(ref(db, `notifications/log`));
        set(logRef, {
          toMember: memberId,
          message: msg,
          timestamp: timestamp
        });
      }).catch((err) => {
        console.log(err)
      })
    } catch (err) {
      console.log(err)
    }

  }
  const fetchNotifications = (memberId) => {
    const notificationsRef = ref(db, `notifications/members/${memberId}`);

    onValue(notificationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Object ko array me convert karo
        const notificationList = Object.values(data);
        setNotifications(notificationList);
      } else {
        setNotifications([]); // agar koi notification nahi hai
      }
    });
  };



  const notify = (msg, flag) => toast(msg, { type: flag });

  return (
    <MainContext.Provider value={{ admin, signInWithEmailPassword, SetAdmin, fetchNotifications, notifications, supplement, notify, sendNotification, SetUser, user, fetchDataFromDatabase, fetchMemberData, fetchMemberDetails, MemberDetails, deleteUserFromdataBase, fetchPackageDetails, fetchUser, handleLogout, userUID, PricingDetails, selectPackage, SetSelectPackage, member }}>
      <ToastContainer />
      {props.children}
    </MainContext.Provider>
  )
}

export default MainCon
export { MainContext }