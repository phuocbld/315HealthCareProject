import './App.css';
import 'devextreme/dist/css/dx.light.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './routes/router';
import NotFound from './pages/NotFound/NotFound';


function App() {
  return (
    <BrowserRouter>
        <Routes>
          {routes?.map(({path, Component}) => 
            <Route key={path} path={path} element={<Component/>} />
          )}
          <Route path='*' element={<NotFound/>} />
        </Routes>     
    </BrowserRouter>
  );
}

export default App;
