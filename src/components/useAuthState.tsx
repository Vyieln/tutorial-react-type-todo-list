import { useState, useEffect } from "react";
import { supabase } from "../config/supabase";

export const useAuthState = () => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const SignOut = async () => {
    await supabase.auth.signOut();
  };
  useEffect(() => {
    const session: any = supabase.auth.getSession();

    if (session) {
      setAuthUser(session && session.user);
      setLoading(false);
    } else {
      setLoading(false);
    }

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session: any) => {
        setAuthUser(session && session.user ? session.user : null);
      }
    );
    console.log(listener);
    return () => {
      listener && listener.subscription && listener.subscription.unsubscribe;
    };
  }, []);

  return { authUser, loading, SignOut };
};
