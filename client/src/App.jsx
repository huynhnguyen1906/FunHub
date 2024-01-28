import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "~/pages/Home";
import Landing from "~/pages/LandingPage";
import Profile from "~/pages/Profile";
import UserProfile from "./pages/UserProfile/UserProfile";
import Search from "./pages/Search";
import Trending from "./pages/Trending";
import DefaultLayout from "./component/Layout";

function App() {
	return (
		<Router>
			<div>
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route
						path="/home"
						element={
							<DefaultLayout>
								<Home />
							</DefaultLayout>
						}
					/>
					<Route
						path="/profile"
						element={
							<DefaultLayout>
								<Profile />
							</DefaultLayout>
						}
					/>
					<Route
						path="/user"
						element={
							<DefaultLayout>
								<UserProfile />
							</DefaultLayout>
						}
					/>
					<Route
						path="/search"
						element={
							<DefaultLayout>
								<Search />
							</DefaultLayout>
						}
					/>
					<Route
						path="/trending"
						element={
							<DefaultLayout>
								<Trending />
							</DefaultLayout>
						}
					/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
