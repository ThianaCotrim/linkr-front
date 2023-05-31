import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegistrationPage from "./pages/RegistrationPage";
import TimelinePage from "./pages/TimelinePage";


function App() {

  return (

    <BrowserRouter>
     <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrationPage/>}/>
      <Route path="/timeline" element={<TimelinePage/>}/>
    </Routes>
  </BrowserRouter>
  )
 
}

export default App;


