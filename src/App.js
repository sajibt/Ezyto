import { useContext } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import { ThemeContext } from "./Context/ThemeContext";
import Footer from "./Footer/Footer";
import Navbar from "./Header/Navbar";
import useAuthContext from "./Hooks/useAuthContext";
import Home from "./pages/Home";
import User from "./pages/User";
import "./scss/main.scss";

// const base = "https://hn.algolia.com/api/v1/search?query=";
const App = () => {
  const { user } = useAuthContext();
  const { theme } = useContext(ThemeContext);

  return (
    <Router>
      <div className={theme}>
        <Navbar />
        <div className="app__content">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route path="/user" element={<User />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
