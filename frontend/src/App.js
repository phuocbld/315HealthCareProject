import './App.css';
import 'devextreme/dist/css/dx.light.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './routes/router';
import NotFound from './pages/NotFound/NotFound';
import RouteComponent from './HOCs/AppRoute';
import ModalMoca from './components/common/ModalMoCa/ModalMoca';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          {routes?.map(({path, Component, isAuth, redirectPath}) => 
            <Route key={path} path={path} element={<RouteComponent isAuth={isAuth} Component={Component} redirectPath={redirectPath}/>} />
          )}
          <Route path='*' element={<NotFound/>} /> 
        </Routes>        
    </BrowserRouter>
  );
}

export default App;
