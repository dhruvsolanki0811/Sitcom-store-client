import { Route, Routes } from "react-router-dom"
import { Homepage,SingleVideoPage,ExplorePage, AuthLogin, AuthSignin, PlaylistPage, SinglePlayListPage, LikedVideoPage, HistoryPage } from "./pages/page"
import { WatchLaterPage } from "./pages/WatchLaterPage/WatchLaterPage"


function Routespath() {
  return (
    
    <Routes>
        <Route path='/' element={<Homepage/>}></Route>
        <Route path='/video/:id' element={<SingleVideoPage/>}></Route>
        <Route path='/explore' element={<ExplorePage/>}></Route>
        <Route path='/login' element={<AuthLogin/>}></Route>
        <Route path='/signup' element={<AuthSignin/>}></Route>
        <Route path='/playlists' element={<PlaylistPage/>}></Route>
        <Route path='/playlists/:id' element={<SinglePlayListPage/>}></Route>
        <Route path='/likes' element={<LikedVideoPage/>}></Route>
        <Route path='/watchlater' element={<WatchLaterPage/>}></Route>
        <Route path='/history' element={<HistoryPage/>}></Route>

    </Routes>
    )
}

export  {Routespath}