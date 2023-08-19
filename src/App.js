import { useCallback, useEffect, useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import StudyListPage from './components/StudyListPage';
import { Route, Routes } from 'react-router-dom';
import { auth } from './firebase';
import StudyDiary from './components/StudyDiary';
import WriteDiary from './components/WriteDiary';

function App() {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  useEffect(() => {
    console.log(auth.currentUser);
  })
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login forceUpdate={forceUpdate} />}  />
      <Route path="/signup" element={<Signup />} />
      <Route path='/tostudy' element={<StudyListPage />} />
      <Route path='/studydiary' element={<StudyDiary />} />
      <Route path='/writediary' element={<WriteDiary />} />
      {/* <Route path='/tostudy' element={auth.currentUser ? <StudyListPage /> : <Navigate to="/login" />} /> */}
    </Routes>
  );
}

export default App;
