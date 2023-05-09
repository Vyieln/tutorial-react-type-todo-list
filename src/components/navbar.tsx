import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "./useAuthState";
export const Navbar = () => {
  const { authUser, SignOut } = useAuthState();

  console.log(authUser);

  return (
    <div>
      <Link to="/"> Home </Link>
      <Link to="/login"> Login </Link>
      {authUser && <Link to="/createpost"> Create Post </Link>}
      <div>
        <p>{authUser && `Logged in as: ${authUser?.email}`} </p>
      </div>
      {authUser ? (
        <div>
          <img
            src={authUser?.identities[0]?.identity_data?.avatar_url}
            referrerpolicy="no-referrer"
            width={100}
            height={100}
          />
          <br></br>
          <button onClick={SignOut}> Log out</button>
        </div>
      ) : null}
    </div>
  );
};
