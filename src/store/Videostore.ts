import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { axiosInstance } from "../axios/axios";
import { toast } from "react-toastify";
import {FormData as User} from './Authstore'
type DevtoolsStore = {
  showDevtools: boolean;
  setShowDevtools: (showDevtools: boolean) => void;
};

interface Video {
  id: number ;
  title: string ;
  creator: string ;
  category: string ;
  logo: string ;
  image: string ;
  url: string ;
}


interface Playlist{
  id:number|null,
  title: string,
  videos:Video[]
}



interface VideoStore  {
  loader: boolean;
  video: Video | null;
  videos: Video[];

  getVideo: (filter?: {
    type: string;
    value: string;
  }) => Promise<Video[] | void>;
  getSingleVideo: (id: number) => Promise<void>;

  history: Video[];
  getHistory:()=>Promise<void>;
  addToHistory: (userId:number|null,id: number | null) => Promise<void>;
  clearHistory: () => Promise<void>;
  deleteHistory:(id: number | null)=>Promise<void>

  liked:Video[];
  getLiked:()=>Promise<void>;
  likedStatus:(id:number|null)=>any
  addLiked: (userId:number|null,id: number | null) => Promise<void>;
  deleteLiked:(id: number | null)=>Promise<void>


  watchlater:Video[];
  getWatchlater:()=>Promise<void>;
  watchLaterStatus:(id:number|null)=>any
  addWatchlater: (userId:number|null,id: number | null) => Promise<void>;
  deleteWatchlater:(id: number | null)=>Promise<void>

  playlists:Playlist[],
  playlistVideos:Video[],
  getPlaylists:()=>Promise<void>,
  createPlaylist:(title:string)=>Promise<void>,
  deletePlaylist:(playlistId:number)=>Promise<void>,
  getPlaylistVideo:(playlistId:number)=>Promise<void>,
  addToPlaylist:(playlistId:number,videoId:number)=>Promise<void>,
  removeFromPlaylist:(playlistId:number,videoId:number)=>Promise<void>,
  getPlaylistByVideo:(videoId:number)=>Promise<any>




}

export const useVideoStore = create<VideoStore>()(
  // devtools(
    persist(
      (set) => {
        return {
          loader: false,
          video: null,
          videos: [],
          history: [],  
          liked:[],
          watchlater:[],


          // showDevtools: false, // Initial value for devtools visibility
          // setShowDevtools: (showDevtools) => set({ showDevtools }),
          
          
          getVideo: async (filter) => {
            try {
              set({ loader: true });
              let url = `/video/`;
              if (filter) {
                url += `?${filter.type}=${filter.value}`;
              }
              let response = await axiosInstance.get(url);
              set({ videos: response.data });
              set({ loader: false });
              return response.data;
            } catch (error) {
              set({ loader: false });
              console.log(error);
            }
          },
          getSingleVideo: async (id) => {
            try {
              set({ loader: true });

              let response = await axiosInstance.get(`/video/${id}/`);
              // set({video:response.data})

              set({ loader: false });
              return response.data;
            } catch (error) {
              set({ loader: false });

              console.log(error);
            }
          },
          
          //History
          
          addToHistory: async (userId,id) => {
            try {
              await axiosInstance.post("/video/history/create/", {
                user: userId,
                video: id,
              });
            } catch (error) {
              console.log(error);
            }
          },

          getHistory:async()=>{
            try {
              set({ loader: true });
             
              let response = await axiosInstance.get('/video/history/');
              set({ history: response.data });
              set({ loader: false });
            } catch (error) {
              set({ loader: false });
              console.log(error);
            }            
          },
          clearHistory:async()=>{
            try {
              set({ loader: true });
             
              await axiosInstance.delete('/video/history/clear/');
              useVideoStore.getState().getHistory()
              set({ loader: false });
            } catch (error) {
              set({ loader: false });
              console.log(error);
            }          
          },
            deleteHistory:async(id)=>{
              try {
                set({loader:true})
                await axiosInstance.delete(`/video/history/remove/${id}/`)

                set({loader:false})
              } catch (error) {
                console.log(error)
                set({loader:false})
              }
            },
            //Liked Video handler
            getLiked:async()=>{
              try {
                set({ loader: true });
               
                let response = await axiosInstance.get('/video/liked/');
                set({ liked: response.data });
                set({ loader: false });
              } catch (error) {
                set({ loader: false });
                console.log(error);
              }            
            },
            likedStatus:async (id)=>{
              try{
                set({loader:true})
                const resp=await axiosInstance(`/video/liked/check/${id}/`)
                set({loader:false})
                console.log(resp.data)
                return resp.data.is_liked
              }
              catch(error){
                console.log(error)
                set({loader:false})
              }
            },
            addLiked: async (userId,id) => {
              try {
                await axiosInstance.post("/video/liked/create/", {
                  user: userId,
                  video: id,
                });
                toast.success("Added to Liked Video")
              } catch (error) {
                console.log(error);
              }
            },
            deleteLiked:async(id)=>{
              try {
                set({loader:true})
                await axiosInstance.delete(`/video/liked/remove/${id}/`)
                toast.info("Video disliked")
                set({loader:false})
              } catch (error) {
                console.log(error)
                set({loader:false})
              }
            },

            //Liked Watchlater handler
            getWatchlater:async()=>{
              try {
                set({ loader: true });
               
                let response = await axiosInstance.get('/video/watchlater/');
                set({ watchlater: response.data });
                set({ loader: false });
              } catch (error) {
                set({ loader: false });
                console.log(error);
              }            
            },
            watchLaterStatus:async (id)=>{
              try{
                const resp=await axiosInstance(`/video/watchlater/check/${id}/`)
                return resp.data.is_in_watch_later
              }
              catch(error){
                console.log(error)
              }
            },
            addWatchlater: async (userId,id) => {
              try {
                await axiosInstance.post("/video/watchlater/create/", {
                  user: userId,
                  video: id,
                });
                toast.success("Added to Watchlater")

              } catch (error) {

                console.log(error);
              }
            },
            deleteWatchlater:async(id)=>{
              try {
                await axiosInstance.delete(`/video/watchlater/remove/${id}/`)
                toast.info("Video Removed from Watchlater")
              } catch (error) {
                console.log(error)
              }
            },


            playlists:[],
            playlistVideos:[],
            getPlaylists:async()=>{
              try {
                set({loader:true})
                const resp=await axiosInstance.get('/video/playlist/')
                set({playlists:resp.data})
                set({loader:false})
              } catch (error) {
                set({loader:false})

                console.log(error)
              }
            },
            createPlaylist:async(title)=>{
              try {
                const resp=await axiosInstance.post('/video/playlist/create/',{title:title})
                toast.success('Playlist created')

              } catch (error) {
                console.log(error)
              }
            },
            deletePlaylist:async(playlistId)=>{
              try {
                set({loader:true})
                await axiosInstance.delete(`/video/playlist/delete/${playlistId}/`)
                set({loader:false})

              } catch (error) {
                set({loader:false})
                console.log(error)
              }
            },
            getPlaylistVideo:async(playlistId)=>{
              try {
                set({loader:true})
                const resp=await axiosInstance.get(`/video/playlist/${playlistId}/videos/`)
                
                set({loader:false,playlistVideos:resp.data})

              } catch (error) {
                console.log(error)
                set({loader:false})

              }
            },
            addToPlaylist:async(playlistId,videoId)=>{
              try {
                await axiosInstance.post(`/video/playlist/${playlistId}/add/${videoId}/`)

              } catch (error) {
                console.log(error)
              }
            },
            removeFromPlaylist:async(playlistId,videoId)=>{
              try {
                await axiosInstance.delete(`/video/playlist/${playlistId}/remove/${videoId}/`)

              } catch (error) {
                console.log(error)
              }
            },
            getPlaylistByVideo:async(videoId)=>{
              try {
                const resp=await axiosInstance.get(`/video/playlist/check/${videoId}`)
                return resp.data

              } catch (error) {
                console.log(error)
              }
            },            
        };
      },
      {
        name: "video", // key under which the state will be stored
        getStorage: () => localStorage, // use localStorage as the storage engine
      }
    // )
  )
);
