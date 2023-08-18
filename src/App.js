import { useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import StudyListPage from './components/StudyListPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import { auth } from './firebase';

function App() {
  const [state, setState] = useState({
    user: null,
    isLogedIn: false
  });

  return (
    <Routes>
      <Route index element={<Home state={state} setState={setState} />} />
      <Route path="/login" element={<Login setState={setState} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path='/tostudy' element={auth.currentUser ? <StudyListPage /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
