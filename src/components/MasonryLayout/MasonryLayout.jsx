import React from "react";
import { Pin } from "../../components";
import Masonry from "react-masonry-css";

import "./masonryLayout.scss";

const breakPointObject = {
	default: 2,
	3000: 6,
	2000: 3,
	1200: 3,
	1000: 2,
	500: 1,
};

const MasonryLayout = ({ pins }) => {

	
		
	return (
		<div>
			{pins && (
				<Masonry
					className="masonry__container "
					breakpointCols={breakPointObject}
				>
					{pins.map((item, index) => {
						return <Pin className="" key={index} pins={item} />;
					})}
				</Masonry>
			)}
		</div>
	);
};

export default MasonryLayout;
