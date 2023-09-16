import React, { useState } from "react";
import "./modal.scss";
import { Circles, ColorRing } from "react-loader-spinner";
import { client } from "../../client";

const Modal = ({ id, setShowDeleteModal }) => {
	const [isDeleting, setIsDeleting] = useState(false);
	const deletePin = (id) => {
		setIsDeleting(true);
		client.delete(id).then((res) => {
			window.location.reload();
		});
		setIsDeleting(false);
	};

	return (
		<div>
			<aside className="modal_container">
				<div className="modal_wrap">
					<h4>Are you sure you want to delete this post?</h4>
					<div className="btn-container">
						<button
							type="button"
							className="btn__primary confirm-btn"
							onClick={() => setShowDeleteModal(false)}
						>
							cancel
						</button>

						<button
							type="button"
							className="btn__primary confirm-btn"
							onClick={() => deletePin(id)}
							disabled={isDeleting}
						>
							<div className="flex-center">
								{isDeleting && (
									<Circles type="Circles" color="#fff" height={30} width={30} />
								)}
							</div>
							{!isDeleting && "delete"}
						</button>
					</div>
				</div>
			</aside>
		</div>
	);
};

export default Modal;
