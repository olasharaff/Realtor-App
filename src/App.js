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
import EditListing from "./pages/EditListing";
import Listing from "./pages/Listing";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
import Category from "./pages/Category";



function App() {
  return (
    <>
      <ErrorBoundary>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Create a route for person signing in and to render the profile */}
            <Route path="/profile" element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>

            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            {/*create a listing route for a only authenticated and signed in user */}
            <Route
              path="/category/:categoryName/:listingId"
              element={<Listing />}
            />
            <Route path="/offer" element={<Offer />} />
            {/*create a create-listing route for a only authenticated and signed in user */}
            <Route path="create-listing" element={<PrivateRoute />}>
              <Route path="/create-listing" element={<CreateListing />} />
            </Route>
            {/*create a edit-listing route for a only authenticated and signed in user */}
            <Route path="edit-listing" element={<PrivateRoute />}>
              <Route
                path="/edit-listing/:listingId"
                element={<EditListing />}
              />
            </Route>
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
      </ErrorBoundary>
    </>
  );
}

export default App;
