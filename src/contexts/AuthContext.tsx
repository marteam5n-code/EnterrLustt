import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {

 const [user, setUser] = useState<User | null>(null);
 const [role, setRole] = useState<string>("user");

 // ⭐ PERMISOS DERIVADOS
 const isAdmin = role === "admin" || role === "superadmin";
 const isSuperAdmin = role === "superadmin";

 useEffect(() => {

  return onAuthStateChanged(auth, async (u) => {

    setUser(u);

    if (u) {
      const snap = await getDoc(doc(db, "users", u.uid));
      setRole(snap.data()?.role || "user");
    }

  });

 }, []);

 return (
  <AuthContext.Provider value={{
   user,
   role,
   isAdmin,
   isSuperAdmin
  }}>
   {children}
  </AuthContext.Provider>
 );

};

export const useAuth = () => useContext(AuthContext);