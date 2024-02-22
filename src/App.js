import './App.css';
import Feedback from './Components/Feedback/Feedback';
import FeedbackListing from './Components/FeedbackListing/FeedbackListing';

import Navbar from './Components/Navbar/Navbar';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {



  return (
    <>
    {/* <Navbar/>
    <Feedback/> */}
   <ToastContainer />
    <BrowserRouter>
      <>
        <Navbar />
        <Routes>
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/" element={<FeedbackListing />} />
          {/* <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} /> */}
        </Routes>
      </>
    </BrowserRouter>

    
    </>
  );
}

export default App;
