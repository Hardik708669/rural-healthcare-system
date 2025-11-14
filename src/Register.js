import { useState } from "react";
import { registerUser } from "./api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    const data = await registerUser({ name, email, password });
    console.log("REGISTER RESPONSE:", data);
  }

  return (
    <>
      <input onChange={(e)=>setName(e.target.value)} placeholder="Name" />
      <input onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
      <input onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleRegister}>Register</button>
    </>
  );
}

export default Register;
