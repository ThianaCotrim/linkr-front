import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegistrationPage from "./pages/RegistrationPage";


function App() {

  return (

    <BrowserRouter>
     <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrationPage/>}/>
    </Routes>
  </BrowserRouter>
  )
 
}

export default App;


