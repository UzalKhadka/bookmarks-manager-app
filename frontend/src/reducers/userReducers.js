import {
  BOOKMARK_CREATE_FAIL,
  BOOKMARK_CREATE_REQUEST,
  BOOKMARK_CREATE_SUCCESS,
  BOOKMARK_DELETE_FAIL,
  BOOKMARK_DELETE_REQUEST,
  BOOKMARK_DELETE_SUCCESS,
  BOOKMARK_DETAILS_FAIL,
  BOOKMARK_DETAILS_REQUEST,
  BOOKMARK_DETAILS_SUCCESS,
  BOOKMARK_UPDATE_FAIL,
  BOOKMARK_UPDATE_REQUEST,
  BOOKMARK_UPDATE_SUCCESS,
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  USER_CATEGORY_LIST_FAIL,
  USER_CATEGORY_LIST_REQUEST,
  USER_CATEGORY_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userSignupReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { loading: true }
    case USER_SIGNUP_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_SIGNUP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userCategoryListReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_CATEGORY_LIST_REQUEST:
      return { loading: true, user: {} }
    case USER_CATEGORY_LIST_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const categoryListReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true, categories: [] }
    case CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload }
    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const categoryDetailsReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORY_DETAILS_REQUEST:
      return { ...state, loading: true }
    case CATEGORY_DETAILS_SUCCESS:
      return { loading: false, category: action.payload }
    case CATEGORY_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const bookmarkDetailsReducer = (state = { bookmark: {} }, action) => {
  switch (action.type) {
    case BOOKMARK_DETAILS_REQUEST:
      return { ...state, loading: true }
    case BOOKMARK_DETAILS_SUCCESS:
      return { loading: false, bookmark: action.payload }
    case BOOKMARK_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const addCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_CREATE_REQUEST:
      return { loading: true }
    case CATEGORY_CREATE_SUCCESS:
      return { loading: false, success: true, category: action.payload }
    case CATEGORY_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const addBookmarkReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKMARK_CREATE_REQUEST:
      return { loading: true }
    case BOOKMARK_CREATE_SUCCESS:
      return { loading: false, success: true, bookmark: action.payload }
    case BOOKMARK_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const deleteBookmarkReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKMARK_DELETE_REQUEST:
      return { loading: true }
    case BOOKMARK_DELETE_SUCCESS:
      return { loading: false, success: true }
    case BOOKMARK_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const deleteCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_DELETE_REQUEST:
      return { loading: true }
    case CATEGORY_DELETE_SUCCESS:
      return { loading: false, success: true }
    case CATEGORY_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const updateCategoryReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORY_UPDATE_REQUEST:
      return { loading: true }
    case CATEGORY_UPDATE_SUCCESS:
      return { loading: false, success: true, category: action.payload }
    case CATEGORY_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const updateBookmarkReducer = (state = { bookmark: {} }, action) => {
  switch (action.type) {
    case BOOKMARK_UPDATE_REQUEST:
      return { loading: true }
    case BOOKMARK_UPDATE_SUCCESS:
      return { loading: false, success: true, bookmark: action.payload }
    case BOOKMARK_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
