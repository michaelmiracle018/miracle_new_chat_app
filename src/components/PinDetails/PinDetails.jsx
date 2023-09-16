import React, { useEffect, useState } from "react";
import "./PinDetails.scss";
import { images } from "../../constants";
import { MdDownloadForOffline } from "react-icons/md";
import { Navbar } from "../../components";
import { client, urlFor } from "../../client";
import { Link, useParams } from "react-router-dom";
import { pinDetailMorePinQuery, pinDetailQuery } from "../../utils/data";
import { v4 as uuidv4 } from "uuid";
import { fetchUser } from "../../utils/fetchUser";
import { useStore } from "../../utils/storeContext";
import { Circles } from "react-loader-spinner";

const PinDetails = () => {
	const { pinId } = useParams();
	const { user } = useStore();
	// console.log(user);
	const [pins, setPins] = useState();
	const [pinDetail, setPinDetail] = useState();
	const [comment, setComment] = useState("");
	const [addingComment, setAddingComment] = useState(false);
	const fetchPinDetails = () => {
		const query = pinDetailQuery(pinId);

		if (query) {
			client.fetch(`${query}`).then((data) => {
				setPinDetail(data[0]);
				console.log(data);
				if (data[0]) {
					const query1 = pinDetailMorePinQuery(data[0]);
					client.fetch(query1).then((res) => {
						setPins(res);
					});
				}
			});
		}
	};

	useEffect(() => {
		fetchPinDetails();
	}, [pinId]);

	const addComment = () => {
		if (comment) {
			setAddingComment(true);

			client
				.patch(pinId)
				.setIfMissing({ comments: [] })
				.insert("after", "comments[-1]", [
					{
						comment,
						_key: uuidv4(),
						postedBy: { _type: "postedBy", _ref: user._id },
					},
				])
				.commit()
				.then(() => {
					fetchPinDetails();
					setComment("");
					setAddingComment(false);
				});
		}
	};

	return (
		<>
			<Navbar />
			{pinDetail && (
				<div className="pin__details-container ">
					<div className="pin__details-wrapper">
						<div className="pin__details_sub-content ">
							<div className="pin__details_img-wrapper">
								<img
									src={pinDetail?.image && urlFor(pinDetail?.image).url()}
									alt=""
								/>
							</div>

							<div className="pin__details-post">
								<div>
									<button className="download__icon">
										<a
											href={`${pinDetail.image.asset.url}?dl=`}
											className="flex-center"
										>
											<MdDownloadForOffline className="download" />
										</a>
									</button>
								</div>
								<h2 className="title">{pinDetail.title}</h2>
								<div className="about">{pinDetail.about}</div>
								<Link to={`/user-profile/${pinDetail?.postedBy._id}`}>
									<div className="img__user">
										<img
											src={pinDetail?.postedBy.image}
											className=""
											alt="user-profile"
										/>
										<p className="">{pinDetail?.postedBy.userName}</p>
									</div>
								</Link>
								<div className="pin__details-comments">
									<h4 style={{ margin: "1rem 0" }}>Comments</h4>
									{pinDetail?.comments?.map((item) => (
										<div className="img__user" key={item.comment}>
											<div>
												<img
													src={item.postedBy?.image}
													className=""
													alt="user-profile"
												/>
											</div>
											<div>
												<p className="">{item.postedBy?.userName}</p>
												<p>{item.comment}</p>
											</div>
										</div>
									))}
								</div>
								<div className="pin__details_write-content flex-between">
									<Link to={`/user-profile/${user?._id}`}>
										<div className="pin__input-img">
											<img src={user?.image} className="" alt="user-profile" />
										</div>
									</Link>
									<div className="form__input">
										<input
											type="text"
											placeholder="add a comment"
											value={comment}
											onChange={(e) => setComment(e.target.value)}
											required
										/>
									</div>
									<div className="post__btn ">
										<button
											className="btn__primary"
											onClick={addComment}
											disabled={addingComment}
										>
											<div className="flex-center">
												{addingComment && (
													<Circles
														type="Circles"
														visible={true}
														height={30}
														width={30}
														color="#fff"
													/>
												)}
											</div>
											{!addingComment && "Post"}
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default PinDetails;
