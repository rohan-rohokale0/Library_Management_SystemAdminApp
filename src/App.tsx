import { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import store from './Redux/store';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import MerchantList from './Pages/merchant_list';
import AddMerchant from './Pages/add_merchant';
import CategoryList from './Pages/Category_List';
import AddCategory from './Pages/add_category';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
    
        <BrowserRouter basename='/'>
          <div className="App">
            <Routes>
              <Route path='/' element={< Login />} />
              <Route path='/login' element={< Login />}></Route>
              <Route path='/home' element={< Home />}>
                <Route path='dashboard' element={< Dashboard />}></Route>
                <Route path='merchant-list' element={< MerchantList />}></Route>
                <Route path='add-merchant' element={< AddMerchant />}></Route>
                <Route path='category-list' element={< CategoryList />}></Route>
                <Route path='add-category' element={< AddCategory />}></Route>
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
