import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import Hashtags from "./constants/Hashtags";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/registration" element={<RegistrationPage />} />
				<Route path="/hashtag" element={<Hashtags />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
