import { createBrowserRouter, Outlet } from 'react-router-dom';
import './App.css';
import Body from './components/Body';
import Navbar from './components/Navbar';
import ResMenu from './components/ResMenu';
import {Cordinate } from './context/contextApi';
import {useState } from 'react';
import Cart from './components/Cart';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import SignIn from './components/SignIn';
import Search from './components/Search';

function App() {

  const [cord, setcord] = useState({ lat: 28.7040592, lng: 77.10249019999999 })
   
  
  const visible = useSelector(state => state.ToggleSlice.searchToggle);
  return (

    <Cordinate.Provider value={{ cord, setcord }}>
        <div>
          <div className={'w-[100vw] h-[100vh] relative overflow-x-hidden  ' + (visible ? "overflow-hidden max-h-screen" : "")}>
            <Navbar />
            <Outlet />
            
          </div>
        </div>
    </Cordinate.Provider>
  );
}

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: [<App /> , <Toaster/>],

    children: [
      {
        path: "/",
        element: <Body />
      },
      {
        path: "/restaurantmenu/:id",
        element: <ResMenu />
      },
      {
        path:"/cart",
        element:<Cart/>
      },

      {
        path:"/search",
        element:<Search/>
      },
    ]
  }
])

export default App;
