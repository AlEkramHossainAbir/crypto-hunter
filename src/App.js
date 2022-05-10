import { makeStyles } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Coinpage from './pages/Coinpage';
import Homepage from './pages/Homepage';

function App() {

  const useStyles = makeStyles({
    App: {
      backgroundColor: '#14161a',
      color: "white",
      minHeight:"100vh",
    },
  });

  const classes = useStyles()

  return (
    <div >
      <BrowserRouter>
        <div className={classes.App}>
          <Header />
          <Routes>
            <Route path="/" exact element={<Homepage /> } />
            <Route path="/coins/:id" element={<Coinpage/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
