import React, { useState } from "react";
import "./createPin.scss";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { images } from "../../constants";
import { MdDelete } from "react-icons/md";
import { categories } from "../../utils/data";
import { useStore } from "../../utils/storeContext";
import { client } from "../../client";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
import { Circles,} from "react-loader-spinner";

const CreatePin = () => {
	const { user } = useStore();

	const [imageAsset, setImageAsset] = useState(true);
	const [category, setCategory] = useState();
	const [title, setTitle] = useState("");
	const [about, setAbout] = useState("");
	const [loading, setLoading] = useState(false);
	const [destination, setDestination] = useState();
	const [fields, setFields] = useState();
	const [wrongImageType, setWrongImageType] = useState(false);
	const [isSavingPin, setIsSavingPin] = useState(false);
	const [loadingImg, setLoadingImg] = useState(false);

	const navigate = useNavigate();

	const uploadImage = (e) => {
		const { type, name } = e.target.files[0];
		// uploading asset to sanity
		if (
			type === "image/png" ||
			type === "image/svg" ||
			type === "image/jpeg" ||
			type === "image/gif" ||
			type === "image/tiff"
		) {
			setWrongImageType(false);
			setLoadingImg(true);
			client.assets
				.upload("image", e.target.files[0], {
					contentType: type,
					filename: name,
				})
				.then((document) => {
					setImageAsset(document);
					setLoadingImg(false);
				})
				.catch((error) => {
					console.log("Upload failed:", error.message);
				});
		} else {
			setLoadingImg(false);
			setWrongImageType(true);
		}
	};

	const savePin =  () => {
		setIsSavingPin(true);
		if (title && about && destination && imageAsset?._id && category) {
			const doc = {
				_type: "pin",
				title,
				about,
				destination,
				image: {
					_type: "image",
					asset: {
						_type: "reference",
						_ref: imageAsset?._id,
					},
				},
				userId: user._id,
				postedBy: {
					_type: "postedBy",
					_ref: user._id,
				},
				category,
			};
			 client.create(doc).then((res) => {
				setIsSavingPin(false);
				navigate("/");
			});
		} else {
			setFields(true);

			setTimeout(() => {
				setFields(false);
			}, 3000);
			setIsSavingPin(false);
		}
	};

	return (
		<div className="create__container flex-center" style={{marginBottom: "4rem"}}>
			<h1 className="header">Create Pin</h1>
			{fields && (
				<p
					className="flex-center"
					style={{ color: "red", marginBottom: "1rem", fontSize: "1.5rem" }}
				>
					Please add all fields.
				</p>
			)}
			<div className="create-sub-content">
				{!imageAsset?.url ? (
					<div className="create__content">
						<div className="create__img_load-wrap ">
							<label>
								<div className="img__loader">
									{wrongImageType && (
										<p className="flex-center" style={{ marginTop: "10px", fontSize: "1.5rem",color:"red" }}>
											It&apos;s a wrong file type.
										</p>
									)}
									{loadingImg && (
										<div className="flex-center">
											<Spinner />
										</div>
									)}
									<div className="text__center flex-center">
										<div className="flex-center">
											<p className="text-sm">
												<AiOutlineCloudUpload />
											</p>
											<p className="text-sm">Click to upload</p>
										</div>
										<div className="">
											<p className="text-sm-clr">
												Recommendation: Use high-quality JPG, JPEG, SVG, PNG,
												GIF or TIFF less than 20MB
											</p>
										</div>
									</div>

									<input
										type="file"
										name="upload-image"
										className="file__input"
										onChange={uploadImage}
									/>
								</div>
							</label>
						</div>
					</div>
				) : (
					<div className="create__img_load-wrap">
						<div className="img__loader">
							<div className="img__view flex-center">
								<img alt="" src={imageAsset?.url} className="img__uploaded" />
							</div>
							<button
								type="button"
								className="btn__del"
								onClick={() => setImageAsset(null)}
							>
								<MdDelete className="del__icon" />
							</button>
						</div>
					</div>
				)}
				<div className="input__container">
					<div className="input-content">
						<input
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							type="text"
							placeholder="Add Your Title"
							className="input-1"
						/>
					</div>
					<div className="img__user">
						<img
							src={user?.image ? user.image : images.fav}
							className=""
							alt="user-profile"
						/>
						<p className="">{user?.userName}</p>
					</div>
					<div className="input-content">
						<input
							value={about}
							onChange={(e) => setAbout(e.target.value)}
							type="url"
							placeholder="Tell everyone what your Pin is about"
							className="input-2"
						/>
					</div>
					<div className="input-content">
						<input
							value={destination}
							onChange={(e) => setDestination(e.target.value)}
							type="url"
							placeholder="Add a destination link"
							className="input-3"
						/>
					</div>
					<div className="">
						<div>
							<p className="text">Choose Pin Category</p>
							<select
								onChange={(e) => {
									setCategory(e.target.value);
								}}
								className=""
							>
								<option value="others" className="" disabled>
									Select Category
								</option>
								{categories.map((item, index) => (
									<option className="" value={item.name} key={index}>
										{item.name}
									</option>
								))}
							</select>
						</div>
						<div className="save__btn-wrap">
							<button
								disabled={isSavingPin}
								type="button"
								onClick={savePin}
								className="btn__primary"
							>
								<div className="flex-center">
									{isSavingPin && (
										<Circles
											type="Circles"
											visible={true}
											height={30}
											width={30}
											color="#fff"
										/>
									)}
								</div>
								{!isSavingPin && "Save Pin"}
							</button>
						</div>
						{/* 
							{!isSavingPin && (
							)}
						
					*/}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreatePin;

// onChange={uploadImage}
