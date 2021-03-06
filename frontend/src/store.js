import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  addBookmarkReducer,
  addCategoryReducer,
  addCategoryWithBookmarksReducer,
  bookmarkDetailsReducer,
  categoryDetailsReducer,
  categoryListReducer,
  deleteBookmarkReducer,
  deleteCategoryReducer,
  updateBookmarkReducer,
  updateCategoryReducer,
  userCategoryListReducer,
  userLoginReducer,
  userSignupReducer,
} from './reducers/userReducers'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,
  userCategoryList: userCategoryListReducer,
  categoryList: categoryListReducer,
  categoryDetails: categoryDetailsReducer,
  bookmarkDetails: bookmarkDetailsReducer,
  addCategory: addCategoryReducer,
  addCategoryWithBookmarks: addCategoryWithBookmarksReducer,
  addBookmark: addBookmarkReducer,
  deleteBookmark: deleteBookmarkReducer,
  deleteCategory: deleteCategoryReducer,
  updateBookmark: updateBookmarkReducer,
  updateCategory: updateCategoryReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}
const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
