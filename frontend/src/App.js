import "./App.scss";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "./components/Loader/Loader";
import { getTokenFromLocalStorage } from "./helpers/localstorage.helper";
import { getProfile } from "./api/services/auth.service";
import { login, logout } from "./store/slice/UserSlice";

function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const checkAuth = async () => {
    const { accessToken } = getTokenFromLocalStorage();

    try {
      if (accessToken) {
        const data = await getProfile();

        if (data) {
          dispatch(login(data));
        } else {
          dispatch(logout());
        }
      }
    } catch (error) {
      console.log("Get Profile Error: " + error.message);
    }
  };

  useEffect(() => {
    (async () => {
      await Promise.all([checkAuth()]);
      setLoading(false);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{loading ? <Loader /> : <RouterProvider router={router} />}</>;
}

export default App;
