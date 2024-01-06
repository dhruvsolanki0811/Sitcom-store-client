import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useUserAuthStore } from "../../store/Authstore";

const RequireAuth = () => {
  const { user} = useUserAuthStore();
  const location = useLocation();
  return !user.userId ? (
    <Navigate to="/login" state={{ from: location }} replace  />
    ) : (
    <Outlet />
  );
};

export { RequireAuth };