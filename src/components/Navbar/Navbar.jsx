import React, { useState } from "react";
// import { UserButton, UserProfile, getUser } from "@clerk/clerk-react";
import { images } from "../../constants";
import { AiOutlineSearch } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { useStore } from "../../utils/storeContext";
import { Tooltip } from "react-tooltip";

const Navbar = () => {
	const { user, searchTerm, setSearchTerm, alertMsg } = useStore();

	return (
		<>
			<div className="navbar__container flex-between">
				<div>
					<Link to="/">
						<div className="navbar__logo">
							<img src={images.logo} alt="logo" />
						</div>
					</Link>
				</div>
				<div className="navbar__input-profile flex-between">
					<div className="navbar__input">
						<AiOutlineSearch className="search__icon" />
						<input
							type="text"
							className="input"
							onChange={(e) => setSearchTerm(e.target.value)}
							placeholder="Search"
							value={searchTerm}
						/>
					</div>
					<div className="navbar__profile flex-between">
						<div>
							<Link to={`/user-profile/${user?._id}`}>
								<img
									src={user?.image ? user.image : images.fav}
									className="img__uploaded"
								/>
								<Tooltip
									id={user?.image}
									effect="solid"
									arrowColor="#fff"
									className="skills-tooltip"
								>
									{user?.userName}
								</Tooltip>
							</Link>
						</div>
						<Link to="/create-pin">
							<div className="plus__icon-wrap">
								<FaPlus className="plus__icon" />
							</div>
						</Link>
					</div>
				</div>
			</div>
			<div>
				{alertMsg && (
					<div className="flex-center" style={{paddingTop: "10rem"}}>
						<h2 className="">No Item Found!</h2>
						<div className="" style={{marginTop: "1rem", fontSize: "1.5rem"}}>Add One</div>
					</div>
				)}
			</div>
		</>
	);
};

export default Navbar;
