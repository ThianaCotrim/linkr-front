import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import TimelinePage from "./pages/TimelinePage";
import SpecificHashtagTimeline from "./pages/SpecificHashtagTimeline";
import hashtagContext from "./context/hashtag.context";
import { useState } from "react";

function App() {
	const [hashtagsInfo, setHashtagsInfo] = useState([]);
	const info = {
		hashtagsInfo,
		setHashtagsInfo,
	};
	return (
		<hashtagContext.Provider value={info}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/registration" element={<RegistrationPage />} />
					<Route path="/timeline" element={<TimelinePage />} />
					<Route path="/hashtag" element={<SpecificHashtagTimeline />} />
				</Routes>
			</BrowserRouter>
		</hashtagContext.Provider>
	);
}

export default App;
