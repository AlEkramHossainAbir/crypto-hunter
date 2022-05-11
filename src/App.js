import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Header from './components/Header';
import Coinpage from './pages/Coinpage';
import Homepage from './pages/Homepage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const useStyles = makeStyles(() => ({
    App:{
      backgroundColor:'#14161a',
      color:'white',
      minHeight:"100vh"
    }
  }));

  const classes = useStyles();




  return (
    <div className={classes.App}>
      <BrowserRouter>
        <div className="App">
          <Header />
    
          <Routes>
            <Route path="/" exact element={<Homepage />} />
            <Route path="/coins/:id" element={<Coinpage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;





