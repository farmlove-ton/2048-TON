import { Navigate, Outlet } from "react-router-dom";

interface IProps {
  children?: React.ReactNode;
  isAllowed: boolean;
  redirectTo: string;
}

const ProtectedRoute = ({ children, isAllowed, redirectTo }: IProps) => {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
