import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export function Login(){

 const [email,setEmail] = useState("");
 const [password,setPassword] = useState("");

 const navigate = useNavigate();

 const handleLogin = async () => {
  await login(email,password);
  navigate("/");
 };

 return (
  <div className="p-10">
   <h1>Login</h1>

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

   <button onClick={handleLogin}>
    Iniciar sesión
   </button>

  </div>
 );
}