import { useDispatch, useSelector } from 'react-redux';
import { lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Layout from './components/Layout/Layout';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import RestrictedRoute from './components/RestrictedRoute/RestrictedRoute';

import { selectAuthIsRefreshing } from './redux/auth/selectors';
import { apiRefreshUser } from './redux/auth/operations'; 

const HomePage = lazy(() => import('./pages/HomePage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage'));


function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectAuthIsRefreshing);

  useEffect(() => {
    dispatch(apiRefreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user session, please wait... </b>):(
    <div>
      <Layout>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<RestrictedRoute component={<LoginPage />} />} />
          <Route path='/register' element={<RestrictedRoute component={<RegistrationPage />} />} />
          <Route path='/contacts' element={<PrivateRoute component={<ContactsPage />} />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;