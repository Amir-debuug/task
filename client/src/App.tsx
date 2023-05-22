import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import PresistentLogin from "./protectedRoutes/PresistentLogin";
import RequireAuth from "./protectedRoutes/RequireAuth";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<PresistentLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
