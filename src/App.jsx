import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigateBar from './components/NavigateBar/NavigateBar';
import AuthProvider from './context/AuthProvider';
import Homepage from './pages/HomePage/HomePage';

import './App.css'

function App() {

  return (
    <>
      <AuthProvider>
        <Router>
        <NavigateBar  />
          <Routes>
              <Route path='/' element={<Homepage/>}>
              {/* <Route index element={<Homepage />} /> */}
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
