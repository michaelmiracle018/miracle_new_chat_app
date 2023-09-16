import React, { useState } from "react";
import "./pin.scss";
import { images } from "../../constants";
import { MdDelete, MdDownloadForOffline } from "react-icons/md";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { AiTwotoneDelete } from "react-icons/ai";
import { useStore } from "../../utils/storeContext";
import { client, urlFor } from "../../client";
import { fetchUser } from "../../utils/fetchUser";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Circles, ColorRing } from "react-loader-spinner";
import { Modal } from "../../components";

const Pin = ({ pins }) => {
	// console.log(pins?.image);
	const { postedBy, image, _id, destination, save } = pins;
	// console.log(pins);
	const [postHovered, setPostHovered] = useState(false);
	const [savingPost, setSavingPost] = useState(false);
	const navigate = useNavigate();
	const user = fetchUser();
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const notSaved = !!save?.filter((item) => item.postedBy._id === user.jti);
	// console.log(notSaved);

	const savePin = (id) => {
		// if (notSaved) {
		setSavingPost(true);

		client
			.patch(id)
			.setIfMissing({ save: [] })
			.insert("after", "save[-1]", [
				{
					_key: uuidv4(),
					userId: user?.jti,
					postedBy: {
						_type: "postedBy",
						_ref: user?.jti,
					},
				},
			])
			.commit()
			.then(() => {
				// console.log(res);
				window.location.reload();
				setSavingPost(false);
			});
		// }
	};

	// const showModal = (e) => {};

	return (
		<div className="pin__container">
			{showDeleteModal && (
				<Modal setShowDeleteModal={setShowDeleteModal} id={_id} />
			)}

			<div
				className="pin__sub-content"
				onMouseEnter={() => setPostHovered(true)}
				onMouseLeave={() => setPostHovered(false)}
				onClick={() => navigate(`/pin-details/${_id}`)}
			>
				<div className="img__wrap">
					<img src={urlFor(image).width(250).url()} alt="" />
					{postHovered && (
						<div className="pin__show-btns">
							<div className="top__btns-wrap">
								<div className="top__btns-flex flex-between">
									<button className="download__icon">
										<a
											href={`${image?.asset?.url}?dl=`}
											className="flex-center"
										>
											<MdDownloadForOffline className="download" />
										</a>
									</button>
									<div className="save__btn">
										{notSaved ? (
											<button disabled>{save?.length} Saved</button>
										) : (
											<button
												onClick={(e) => {
													e.stopPropagation();
													savePin(_id);
												}}
												disabled={savingPost}
											>
												<div className="flex-center">
													{savingPost && (
														<Circles
															type="Circles"
															color="#fff"
															height={30}
															width={30}
														/>
													)}
												</div>
												{!savingPost && "Save"}
											</button>
										)}
									</div>
								</div>
							</div>
							<div className="down__btns-wrap">
								<div className="down__btns-flex flex-between">
									{destination?.slice(8).length > 0 ? (
										<div className="view__btn flex-center">
											<a
												href={destination}
												target="_blank"
												className="flex-center"
											>
												<BsFillArrowUpRightCircleFill />
												{destination?.length > 15
													? `${destination.slice(0, 9)}...`
													: destination}
											</a>
										</div>
									) : undefined}

									{postedBy?._id === user?.jti && (
										<button
											className="delete__btn flex-center"
											onClick={(e) => {
												e.stopPropagation();
												setShowDeleteModal(true);
											}}
										>
											<AiTwotoneDelete className="delete" />
										</button>
									)}
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
			<Link to={`/user-profile/${postedBy?._id}`} className="img__user">
				<img src={postedBy?.image} className="" alt="user-profile" />
				<p className="">{postedBy?.userName}</p>
			</Link>
		</div>
	);
};

export default Pin;
