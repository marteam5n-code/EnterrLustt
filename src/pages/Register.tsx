import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

export function Register(){

 const [email,setEmail] = useState("");
 const [password,setPassword] = useState("");

 const navigate = useNavigate();

 const handleRegister = async () => {
  await register(email,password);
  navigate("/");
 };

 return (
  <div className="p-10">

   <h1>Registro</h1>

   <input
    placeholder="Email"
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
   />

   <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
   />

   <button onClick={handleRegister}>
    Registrarse
   </button>

  </div>
 );
}