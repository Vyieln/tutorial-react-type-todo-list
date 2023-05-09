import React from "react";
import { supabase } from "../config/supabase";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    const result = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    console.log(result);
    navigate("/");
  };

  async function signout() {
    const { error } = await supabase.auth.signOut();
  }

  return (
    <div>
      {" "}
      <p> Sign in with Google to Continue</p>
      <button onClick={signInWithGoogle}> Sign in with Google</button>
    </div>
  );
};
