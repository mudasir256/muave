import { BrowserRouter , Routes , Route } from "react-router-dom"
import Login from "./pages/auth/Login"
import Dashboard from "./pages/dashboard/Dashboard"
import UserRoutes from "./components/UserRoutes"
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      {/* AUTH ROUTES */}
      <Route path="/auth/login" element={<Login />} />

      {/* USER ROUTES */}
        <Route path="/user/*" element={<UserRoutes />} >
          <Route index path="dashboard" element={<Dashboard/>} />
        </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
