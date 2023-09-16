import React from "react";
import "./login.scss";

import { useNavigate } from "react-router-dom";
import { client } from "../../client.js";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const Login = () => {
	const navigate = useNavigate();
	const responseGoogle = (credentialResponse) => {
		const details = jwt_decode(credentialResponse.credential);
		localStorage.setItem("userLoginInfo", JSON.stringify(details));

		const { name, jti, picture } = details;

		const doc = {
			_id: jti,
			_type: "user",
			userName: name,
			image: picture,
		};

		client.createIfNotExists(doc).then((res) => {
			navigate("/", { replace: true });
		});
	};

	return (
		<div className="login flex-center">
			<div className="login__content flex-center">
			<div className="login__text">Login with Google to continue</div>
				<div className="">
					<GoogleLogin onSuccess={responseGoogle} onError={responseGoogle} />
				</div>
			</div>
		</div>
	);
};

export default Login;
