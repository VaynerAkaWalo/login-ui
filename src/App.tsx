import './App.css'
import {BrowserRouter, Outlet, Route, Routes} from "react-router";
import LoginForm from "@components/login-form.tsx";
import ProfileView from "@components/profile-view.tsx";
import {Footer} from "@components/footer/Footer.tsx";
import RegisterForm from "@components/register-form.tsx";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Container/>}>
          <Route index element={<ProfileView/>}/>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/register" element={<RegisterForm/>}/>
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

function Container() {
  return (
    <>
      <div id="container" className="h-screen flex flex-col">
        <div id="content" className="flex h-full justify-center items-center">
          <Outlet/>
        </div>
      </div>
    </>
  )
}
