import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

import{BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './views/Login.jsx';
import Register from './views/Register.jsx';
import Logout from './views/Logout.jsx';
import Home from './views/Home.jsx';
import UserProvider from './context/userProvider.jsx';
import RequireAuth from './components/RequireAuth.jsx';
import Consumos from './views/Consumos.jsx';
import MyGates from './views/MyGates.jsx';
import MyPosts from './views/MyPosts.jsx';
import PostForo from './views/PostForo.jsx'
import NotFound from './views/NotFound.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <UserProvider>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />}/>
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='logout' element={<RequireAuth><Logout /></RequireAuth>}/>
          <Route path='postForo/:id' element={<PostForo />} />
          <Route path='myPosts' element={<RequireAuth><MyPosts /></RequireAuth>} />
          <Route path='myGates' element={<RequireAuth><MyGates /></RequireAuth>} />
          <Route path='myConsumos' element={<RequireAuth><Consumos /></RequireAuth>} />
          <Route path='*' element={<NotFound />} />
      
        </Route>
      </Routes>
    </UserProvider>
  </BrowserRouter>
);