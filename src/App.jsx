import AppointmentScreen from "./Screens/AppointmentScreen"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import DashBoard from "./Screens/DashBoard"
import CalenderScreen from "./Screens/CalenderScreen"
import ChartsScreen from "./Screens/ChartsScreen"
import DoctorsScreen from "./Screens/DoctorsScreen"
import PatientScreen from "./Screens/PatientScreen"
import PaymentScreen from "./Screens/PaymentScreen"
import RoomAllocatedScreen from "./Screens/RoomAllocatedScreen"
import StaffScreen from "./Screens/StaffScreen"
import NavBar from "./Comonents/JsFiles/NavBar"
import SignIn from "./Comonents/JsFiles/SignIn"
import userContext from "./Comonents/JsFiles/UserContext"
import { useContext,useState } from "react"
import { Provider } from "react"
import Nav from "./Comonents/JsFiles/Nav"



function App() {
  const [user, setUser] = useState({});
  return (
  <>
  <userContext.Provider value={{user,setUser}}>
  <BrowserRouter>
  <Nav/>
  <Routes>

    <Route path="/dashboard" element={<DashBoard/>}/>
    <Route path="/" element={<SignIn/>}/>
    <Route path="/appointmentScreen" element={<AppointmentScreen/>}/>
    <Route path="/calenderScreen" element={<CalenderScreen/>}/>
    <Route path="/chartsScreen" element={<ChartsScreen/>}/>
    <Route path="/doctorsScreen" element={<DoctorsScreen/>}/>
    <Route path="/patientScreen" element={<PatientScreen/>}/>
    <Route path="/paymentScreen" element={<PaymentScreen/>}/>
    <Route path="/roomAllocatedScreen" element={<RoomAllocatedScreen/>}/>
    <Route path="/staffScreen" element={<StaffScreen/>}/>

  </Routes>
  </BrowserRouter>
  </userContext.Provider>
  </>
  )
}

export default App
