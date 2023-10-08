import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import PrivateRoute from "./components/PrivateRoute";
import Offer from './pages/Offer';
import Profile from './pages/Profile';
import ForgetPassword from './pages/ForgetPassword';
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CreateListing from "./pages/CreateListing";



function App() {
  return (
    <>
      <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Create a route for person signing in and to render the profile */}
          <Route path="/profile" element={<PrivateRoute/>}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/create-listing" element={<CreateListing/>} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/offer" element={<Offer />} />
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
