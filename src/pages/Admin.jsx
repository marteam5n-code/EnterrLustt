import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

export default function Admin(){

  const [user,setUser] = useState(null);

  useEffect(()=>{

    async function load(){
      const u = auth.currentUser;
      if(!u) return;

      const snap = await getDoc(doc(db,"users",u.uid));
      setUser(snap.data());
    }

    load();

  },[]);

  if(!user || user.role !== "admin"){
    return <h2>Acceso denegado ❌</h2>;
  }

  return <h1>👑 Panel Admin Enterrlusst</h1>;
}