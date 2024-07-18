import { Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import store from './Redux/store';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import MerchantList from './Pages/merchant_list';
import AddMerchant from './Pages/add_merchant';
import CategoryList from './Pages/Category/Category_List';
import AddCategory from './Pages/Category/add_category';
import ForgotPassword from './Pages/forgot_password';
import AddUsers from './Pages/Users/add_user';
import Register from './Pages/Register';


class App extends Component {
  render() {
    return (
      <Provider store={store}>

        <BrowserRouter basename='/'>
          <div className="App">
            <Routes>
              {/* <Route path='/' element={< Login />} /> */}
              <Route path='auth/login' element={< Login />}></Route>
              {/* <Route path='auth/register' element={<Register/>}</Routes> */}

              <Route path='auth/register' element={< Register />}></Route>
              <Route
                path="*"
                element={<Navigate to="/auth/login" />}
              />
              <Route path='auth/forgot-password' element={<ForgotPassword />}>
              </Route>
              <Route path='/home' element={< Home />}>
                <Route path='dashboard' element={< Dashboard />}></Route>
                <Route path='merchant-list' element={< MerchantList />}></Route>
                <Route path='add-merchant' element={< AddMerchant />}></Route>
                <Route path='category-list' element={< CategoryList />}></Route>
                
                {/* <Route path='user-list' element={< UserList />}></Route> */}
                <Route path='add-user' element={< AddUsers />}></Route>

              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
