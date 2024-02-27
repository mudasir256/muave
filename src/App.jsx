import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/auth/Login"
import Dashboard from "./pages/dashboard/Dashboard"
import UserRoutes from "./components/UserRoutes"
import ClientsAndReports from "./pages/clients-and-reports/ClientsAndReports"
import ActionItems from "./pages/action-items/ActionItems"
import AccessTokenComponent from "./components/AccessTokenComponent"
import Documents from "./pages/documents/Documents"
import Overview from "./pages/overview/Overview"
import GoalPlanning from "./pages/goal-planning/GoalPlanning"
import Introduction from "./pages/registration/Introduction"
import Steps from './pages/registration/Steps'
import AccountSettings from "./pages/settings/Account"
import FirmSettings from './pages/settings/Firm'
import ClientAndTeamSettings from './pages/settings/ClientAndTeam'
import SecuritySettings from './pages/settings/Security'
import PaymentSettings from './pages/settings/PaymentAndBilling'
import NotificationSettings from './pages/settings/Notification'
import Client from './pages/dashboard/ClientsAndReports'
import Onboarding from './pages/onboarding';
import Subscription from "./components/Subscription"
import Refferal from "./pages/settings/Refferal"
import Plaid from './pages/plaid';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* AUTH ROUTES */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/" element={<AccessTokenComponent />} />

          {/* USER ROUTES */}
          <Route path="/user/*" element={<UserRoutes />} >
            <Route path="dashboard" element={<Dashboard />} />
            <Route index path="dashboard/client" element={<Client />} />

            <Route path="clients-&-reports" element={<ClientsAndReports />} />
            <Route path="action-&-goals" element={<ActionItems />} />
            <Route path="documents" element={<Documents />} />
            <Route path="overview" element={<Overview />} />
            <Route path="goal-planning" element={<GoalPlanning />} />
            <Route index path="dashboard" element={<Dashboard />} />
            <Route index path="clients-&-reports" element={<ClientsAndReports />} />
            <Route index path="subscription" element={<Subscription />} />
          </Route>

          {/* REGISTRATION ROUTES */}
          <Route path="/registration" element={<Introduction />} />
          <Route path="/registration/steps" element={<Steps />} />

          {/* SETTING ROUTES */}
          <Route path="/settings/account" element={<AccountSettings />} />
          <Route path="/settings/firm" element={<FirmSettings />} />
          <Route path="/settings/clientAndTeam" element={<ClientAndTeamSettings />} />
          <Route path="/settings/security" element={<SecuritySettings />} />
          <Route path="/settings/payment" element={<PaymentSettings />} />
          <Route path="/settings/notification" element={<NotificationSettings />} />
          <Route path="/settings/referral" element={<Refferal />} />

          {/* ONBOARDING ROUTES */}
          <Route path="/onboarding" element={<Onboarding />} />

          {/* PLAID ROUTE */}
          <Route path="/plaid" element={<Plaid />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
