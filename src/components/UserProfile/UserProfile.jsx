import React, { useEffect, useState } from "react";
import "./userProfile.scss";
import { images } from "../../constants";
import { IoIosArrowBack } from "react-icons/io";
import { useStore } from "../../utils/storeContext";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchUser } from "../../utils/fetchUser";
import {
	userCreatedPinsQuery,
	userQuery,
	userSavedPinsQuery,
} from "../../utils/data";
import { client } from "../../client";
import { AiOutlineLogout } from "react-icons/ai";
import MasonryLayout from "../MasonryLayout/MasonryLayout";
import Spinner from "../Spinner";
// import { SignOutButton } from "@clerk/clerk-react";

const UserProfile = () => {
	// const { user } = useStore();
	const [activeBtn, setActiveBtn] = useState("created");

	const [user, setUser] = useState();
	const [pins, setPins] = useState();
	const [text, setText] = useState("Created");
	const [loadPins, setLoadPins] = useState(false);
	// const [activeBtn, setActiveBtn] = useState("created");
	const navigate = useNavigate();
	// console.log(location);
	const { id } = useParams();

	const User = fetchUser();

	useEffect(() => {
		const query = userQuery(id);
		client.fetch(query).then((data) => {
			setUser(data[0]);
		});
	}, [id]);

	useEffect(() => {
		if (text === "Created") {
			setLoadPins(true);
			const createdPinsQuery = userCreatedPinsQuery(id);

			client.fetch(createdPinsQuery).then((data) => {
				setPins(data);
				setLoadPins(false);
			});
		} else {
			setLoadPins(true);

			const savedPinsQuery = userSavedPinsQuery(id);

			client.fetch(savedPinsQuery).then((data) => {
				setPins(data);
				setLoadPins(false);
			});
		}
	}, [text, id]);
	const goBack = () => {
		navigate(-1);
	};

	const handleLogout = () => {
		localStorage.clear();

		navigate("/login");
	};

	return (
		<>
			<div className="userProfile__container">
				<div className="userProfile__sub-content">
					<div className="userProfile__logo ">
						<div>
							<Link to="/">
								<div className="logo">
									<img src={images.logo} alt="" />
								</div>
							</Link>
							<div className="userProfile__btn flex-center" onClick={goBack}>
								<IoIosArrowBack className="back-icon" />
								Back
							</div>
						</div>
						{id === User.jti && (
							<div className="sign__out-btn">
								<button style={{ cursor: "pointer" }} onClick={handleLogout}>
									<AiOutlineLogout color="red" fontSize={40} />
								</button>
							</div>
						)}
					</div>
					<div className="profile__wrap flex-center">
						<div className="img__wrap flex-center">
							<img src={user?.image ? user.image : images.fav} alt="user" />
							<h3 className="profile__name">{user?.userName}</h3>
						</div>

						<div className="userProfile__view-btns flex-center">
							<button
								type="button"
								className={`${
									activeBtn === "created" ? "btn__primary" : "non-active"
								}`}
								onClick={(e) => {
									setText(e.target.textContent);
									setActiveBtn("created");
								}}
							>
								Created
							</button>
							<button
								className={`${
									activeBtn === "saved" ? "btn__primary" : "non-active"
								}`}
								onClick={(e) => {
									setText(e.target.textContent);
									setActiveBtn("saved");
								}}
							>
								Saved
							</button>
						</div>
					</div>
				</div>
			</div>
			<div
				style={{
					width: "100%",
					height: "2px",
					backgroundColor: "gray",
					marginTop: "25px",
				}}
			></div>
			{pins?.length === 0 && !loadPins && (
				<div
					className="flex-center"
					style={{ fontSize: "1.5rem", marginTop: "2rem" }}
				>
					No Item Found!
					<Link to="/create-pin">
						<button
							className="btn__primary"
							style={{ width: "150px", marginTop: "2rem" }}
						>
							create a pin
						</button>
					</Link>
				</div>
			)}
			{pins && (
				<div className="">
					<MasonryLayout pins={pins} />
				</div>
			)}
			{loadPins && (
				<div className="flex-center" style={{ marginTop: "3rem" }}>
					<Spinner />{" "}
				</div>
			)}
		</>
	);
};

export default UserProfile;
