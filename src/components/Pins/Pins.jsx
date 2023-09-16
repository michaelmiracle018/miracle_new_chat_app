import React from "react";
import { useStore } from "../../utils/storeContext";
import MasonryLayout from "../MasonryLayout/MasonryLayout";
import Spinner from "../Spinner";
import './pins.scss'

const Pins = () => {
	const { pins, loading } = useStore();

	if (pins?.length === 0 && loading)
		return (
			<div className="flex-center" style={{ paddingTop: "10rem" }}>
				<div>
					<h1>NO PINS AVAILABLE</h1>
				</div>
			</div>
		);

	return (
		<div className="pins__container" >
			{loading && (
				<div className="spinner flex-center">
					<Spinner />
				</div>
			)}
			<MasonryLayout pins={pins} />
		</div>
	);
};

export default Pins;
