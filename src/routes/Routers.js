import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Home, Login } from "../pages";
import {
	CreatePin,
	PinDetails,
	PrivateRoute,
	UserProfile,
} from "../components";
const Routers = () => {
	return (
		<div>
			<Router>
				<Routes>
					<Route path="/login" element={<Login />} />

					<Route element={<PrivateRoute />}>
						<Route path="/" element={<Home />}></Route>
						<Route path="/create-pin" element={<CreatePin />}></Route>
						<Route path="/pin-details/:pinId" element={<PinDetails />}></Route>
						<Route path="/user-profile/:id" element={<UserProfile />}></Route>
					</Route>
				</Routes>
			</Router>
		</div>
	);
};

export default Routers;
