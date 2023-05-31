import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import TimelinePage from "./pages/TimelinePage";
import SpecificHashtagTimeline from "./pages/SpecificHashtagTimeline";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/registration" element={<RegistrationPage />} />
				<Route path="/timeline" element={<TimelinePage />} />
				<Route path="/hashtag/:hashtag" element={<SpecificHashtagTimeline />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
