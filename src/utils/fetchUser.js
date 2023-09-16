export const fetchUser = () => {
	const userInfo =
		localStorage.getItem("userLoginInfo") !== "undefined"
			? JSON.parse(localStorage.getItem("userLoginInfo"))
			: localStorage.clear();

	return userInfo;
};
