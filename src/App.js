import "./App.css";
import { ProtectedRoute, NotFound404 } from "./components";
import { Login, HomePage, NavBar, MyList } from "./views";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const auth = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route
        path="home"
        element={
          <ProtectedRoute isAuthenticated={auth.isAuthenticated}>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="dashboard"
        element={
          <ProtectedRoute isAuthenticated={auth.isAuthenticated}>
            <NavBar />
          </ProtectedRoute>
        }
      >
        <Route path="home" element={<HomePage />} />
        <Route path="mylist" element={<MyList />} />
      </Route>
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
}

export default App;
