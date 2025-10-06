

import './App.css';
import { Toolbar, Typography , AppBar} from '@mui/material';
import Carlist from './components/Carlist';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant='h6'>CarShop</Typography>
        </Toolbar>
      </AppBar>
      <Carlist />
    </div>
  );
}

export default App;
