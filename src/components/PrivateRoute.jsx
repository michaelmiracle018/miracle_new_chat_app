import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useStore } from "../utils/storeContext";
import { fetchUser } from "../utils/fetchUser";

const PrivateRoutes = () => {
	const user = fetchUser();
	// console.log(user);

	return <div>{user?.jti ? <Outlet /> : <Navigate to="/login" />}</div>;
};

export default PrivateRoutes;
