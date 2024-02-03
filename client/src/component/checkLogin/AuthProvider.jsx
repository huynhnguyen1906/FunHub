import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const checkToken = async () => {
			try {
				const response = await axios.get("/api/user/checkToken", {
					withCredentials: true,
				});
				setIsLoggedIn(true);
				setUser(response.data);
			} catch (error) {
				setIsLoggedIn(false);
				setUser(null);
			}
		};

		checkToken();
	}, []);
	return (
		<AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
			{" "}
			{/* Add user and setUser here */}
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
