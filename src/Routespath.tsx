import { Route, Routes } from "react-router-dom";
import {
  Homepage,
  SingleVideoPage,
  ExplorePage,
  AuthLogin,
  AuthSignin,
  PlaylistPage,
  SinglePlayListPage,
  LikedVideoPage,
  HistoryPage,
} from "./pages/page";

import { WatchLaterPage } from "./pages/WatchLaterPage/WatchLaterPage";
import { RestrictAuth } from "./pages/Auth/restrict-auth";
import { RequireAuth } from "./pages/Auth/require-auth";

function Routespath() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/explore" element={<ExplorePage />}></Route>
        <Route path="/video/:id" element={<SingleVideoPage />}></Route>

        <Route element={<RestrictAuth />}>
          <Route path="/login" element={<AuthLogin />}></Route>
          <Route path="/signup" element={<AuthSignin />}></Route>
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/likes" element={<LikedVideoPage />}></Route>
          <Route path="/playlists" element={<PlaylistPage />}></Route>
          <Route path="/playlists/:id" element={<SinglePlayListPage />}></Route>
          <Route path="/watchlater" element={<WatchLaterPage />}></Route>
          <Route path="/history" element={<HistoryPage />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export { Routespath };
