import './App.css'
import {BrowserRouter, Outlet, Route, Routes} from "react-router";
import LoginForm from "@components/login-form.tsx";
import ProfileView from "@components/profile-view.tsx";

export default function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Container/>}>
          <Route index element={<ProfileView/>}/>
          <Route path="/login" element={<LoginForm/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function Container() {
  return (
    <>
      <div id="container" className="h-screen flex flex-col text-gray-700">
        <div id="content" className="flex h-full justify-center items-center">
          <Outlet/>
        </div>
      </div>
    </>
  )
}
