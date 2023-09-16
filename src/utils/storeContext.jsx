import { createContext, useContext, useEffect, useState } from "react";

import { useLocation, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
import { feedQuery, searchQuery, userQuery } from "../utils/data";
import { client } from "../client.js";
import { fetchUser } from "./fetchUser";
// import { useAuth, useClerk, UserProfile, UserButton } from "@clerk/clerk-react";

const storeContext = createContext();

export const StoreProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const [loading, setLoading] = useState(false);
	const [pins, setPins] = useState(null);
	const userInfo = fetchUser();
	const [searchTerm, setSearchTerm] = useState("");
	const [alertMsg, setAlertMsg] = useState(false);
	const [loadingSearch, setLoadingSearch] = useState(false);
	const [timeoutId, setTimeoutId] = useState(null);

	// setSearchTerm(searchTerm);

	useEffect(() => {
		if (searchTerm !== "") {
			setLoadingSearch(true);
			const query = searchQuery(searchTerm.toLowerCase());
			client.fetch(query).then((data) => {
				clearTimeout(timeoutId);
				setTimeout(() => {
					// Call the API after the debounce timeout
					setPins(data);
					setLoadingSearch(false);
				}, 700);
				if (pins?.length === 0 && loadingSearch) {
					setAlertMsg(true);
					setTimeout(() => {
						setAlertMsg(false);
					}, 3000);
				}
			});
		} else {
			client.fetch(feedQuery).then((data) => {
				setPins(data);
				setLoading(false);
			});
		}
	}, [searchTerm]);
	useEffect(() => {
		// Cleanup function to clear the timeout on unmount and re-render
		return () => {
			clearTimeout(timeoutId);
		};
	}, [timeoutId]);

	useEffect(() => {
		setLoading(true);
		client.fetch(feedQuery).then((res) => {
			setPins(res);
			setLoading(false);
		});
	}, []);
	useEffect(() => {
		const query = userQuery(userInfo?.jti);

		client.fetch(query).then((data) => {
			// console.log(data);
			setUser(data[0]);
		});
	}, []);
	const contextData = {
		user,
		pins,
		loading,
		searchTerm,
		setSearchTerm,
		alertMsg,
	};

	return (
		<storeContext.Provider value={contextData}>
			{children}
		</storeContext.Provider>
	);
};

export const useStore = () => {
	return useContext(storeContext);
};

export default storeContext;
