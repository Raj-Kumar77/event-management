import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import AddEvent from './pages/AddEvent';
import AllEvents from './pages/AllEvents';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Attendee from './pages/Attendee';
import Task from './pages/Task';

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '$'

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {
        token === ""
          ? <Login setToken={setToken} />
          : <>
            <Navbar setToken={setToken} />
            <hr />
            <div className='flex w-full'>
              <Sidebar />
              <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
                <Routes>
                  <Route path='/add-event' element={<AddEvent />} />
                  <Route path='/all-event' element={<AllEvents />} />
                  <Route path='/attendee' element={<Attendee />} />
                  <Route path='/tasks' element={<Task />} />
                </Routes>
              </div>
            </div>
          </>
      }

    </div>

  );
}

export default App;
