import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useUserAuthStore } from "../../store/Authstore";

const RestrictAuth = () => {
  const { user} = useUserAuthStore();
  const location = useLocation();
  return user.userId ? (
    <Navigate to="/" state={{ from: location }} replace  />
    ) : (
    <Outlet />
  );
};

export { RestrictAuth };