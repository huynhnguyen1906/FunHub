import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
	const [userData, setUserData] = useState(null);
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await axios.get("/api/user/myProfile");
				if (response.data.message === "No user logged in") {
					setUserData(null);
				} else {
					setUserData(response.data);
				}
			} catch (error) {
				console.error("Error fetching user profile:", error);
			}
		};

		fetchUserData();
	}, []);

	return (
		<AuthContext.Provider value={{ userData }}>
			{" "}
			{/* Add user and setUser here */}
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
