import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import AddBookmarkScreen from './screens/AddBookmarkScreen'
import AddBookmarkToCategoryScreen from './screens/AddBookmarkToCategoryScreen'
import AddCategoryScreen from './screens/AddCategoryScreen'
import BookmarksScreen from './screens/BookmarksScreen'
import CategoriesScreen from './screens/CategoriesScreen'
import CategoryScreen from './screens/CategoryScreen'
import EditBookmarkScreen from './screens/EditBookmarkScreen'
import EditCategoryScreen from './screens/EditCategoryScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import OtherUserScreen from './screens/OtherUserScreen'
import SignupScreen from './screens/SignupScreen'

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Route exact path='/' component={HomeScreen} />
        <Route exact path='/users/:username' component={OtherUserScreen} />
        <Route exact path='/login' component={LoginScreen} />
        <Route exact path='/signup' component={SignupScreen} />
        <Route exact path='/bookmarks' component={BookmarksScreen} />
        <Route exact path='/categories' component={CategoriesScreen} />
        <Route exact path='/add-bookmark' component={AddBookmarkScreen} />
        <Route exact path='/add-category' component={AddCategoryScreen} />
        <Route
          exact
          path='/categories/:categoryID'
          component={CategoryScreen}
        />
        <Route
          exact
          path='/categories/:categoryID/add-bookmark'
          component={AddBookmarkToCategoryScreen}
        />
        <Route
          exact
          path='/categories/:categoryID/edit-category'
          component={EditCategoryScreen}
        />
        <Route
          exact
          path='/categories/:categoryID/bookmarks/:bookmarkID/edit-bookmark'
          component={EditBookmarkScreen}
        />

        <Footer />
      </div>
    </Router>
  )
}

export default App
