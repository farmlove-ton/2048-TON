import { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import {
  InitialPage,
  CreateProfilePage,
  TellUsMorePage,
  AddProfilePhotoPage,
  SuggestionPage,
  HomePage,
} from "./pages";
import { UserContext } from "./context/UserContext";
import { ProtectedRoute } from "./components";
import PageLayout from "./layouts/PageLayout";

const AppRoutes = () => {
  const { user, isFetched } = useContext(UserContext);

  const isNotAuthed = isFetched && !user;
  const isAuthed = !!user;
  const isLoading = !isFetched;

  if (isLoading) {
    return "Loading...";
  }

  return (
    <Routes>
      <Route
        element={<ProtectedRoute redirectTo="/home" isAllowed={isNotAuthed} />}
      >
        <Route path="/" element={<InitialPage />} />
        <Route path="/create-profile" element={<CreateProfilePage />} />
        <Route path="/tell-us-more" element={<TellUsMorePage />} />
        <Route path="/add-photo" element={<AddProfilePhotoPage />} />
      </Route>
      {/* <Route path="/connect-wallet" element={<ConnectWalletPage />} />
      <Route path="/verify-profile" element={<VerifyProfilePage />} />
      <Route path="/take-photo" element={<TakePhotoPage />} />
      <Route path="/photo-under-review" element={<PhotoUnderReviewPage />} /> */}
      <Route element={<ProtectedRoute redirectTo="/" isAllowed={isAuthed} />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/task" element={<PageLayout>Soon</PageLayout>} />
        <Route path="/invite" element={<PageLayout>Soon</PageLayout>} />
        <Route path="/boost" element={<PageLayout>Soon</PageLayout>} />
        <Route path="/suggestion" element={<SuggestionPage />} />
        <Route path="/suggestion/profile" element={<SuggestionPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
