import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
// import { ClerkProvider } from "@clerk/clerk-react";
import { GoogleOAuthProvider } from "@react-oauth/google";

// const clerk_pub_key = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
// 21512589211-kc21bknveotsare589sfvbcpjbkb529d.apps.googleusercontent.com
// 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
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<GoogleOAuthProvider clientId="21512589211-kc21bknveotsare589sfvbcpjbkb529d.apps.googleusercontent.com">
			{/* Your application tree goes here. */}
			<App />
		</GoogleOAuthProvider>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
