import axios from 'axios'
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
  CATEGORY_WITH_BOOKMARKS_CREATE_FAIL,
  CATEGORY_WITH_BOOKMARKS_CREATE_REQUEST,
  CATEGORY_WITH_BOOKMARKS_CREATE_SUCCESS,
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

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const config = {
      Headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/login',
      { username, password },
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
}

export const signup = (username, name, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_SIGNUP_REQUEST,
    })

    const config = {
      Headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/',
      { username, name, password },
      config
    )

    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: data,
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserCategoriesList = (username) => async (dispatch) => {
  try {
    dispatch({
      type: USER_CATEGORY_LIST_REQUEST,
    })

    const { data } = await axios.get(`/api/users/${username}`)

    var categories = []

    for (let i in data.categories) {
      if (data.categories[i].isPrivate === false) {
        categories.push(data.categories[i])
      }
    }

    var user = {
      name: data.name,
      categories: categories,
    }

    dispatch({
      type: USER_CATEGORY_LIST_SUCCESS,
      payload: user,
    })
  } catch (error) {
    dispatch({
      type: USER_CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getCategoriesList = (userID) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_LIST_REQUEST,
    })

    const { data } = await axios.get(`/api/users/${userID}/categories`)

    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getCategoryDetails = (userID, categoryID) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_DETAILS_REQUEST,
    })

    const { data } = await axios.get(
      `/api/users/${userID}/categories/${categoryID}/`
    )

    dispatch({
      type: CATEGORY_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CATEGORY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const getBookmarkDetails =
  (userID, categoryID, bookmarkID) => async (dispatch) => {
    try {
      dispatch({
        type: BOOKMARK_DETAILS_REQUEST,
      })

      const { data } = await axios.get(
        `/api/users/${userID}/categories/${categoryID}/bookmarks/${bookmarkID}`
      )

      dispatch({
        type: BOOKMARK_DETAILS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: BOOKMARK_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const createCategory = (userID, name, isPrivate) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_CREATE_REQUEST,
    })

    const config = {
      Headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.put(
      `/api/users/${userID}/categories/`,
      { name, isPrivate },
      config
    )

    dispatch({
      type: CATEGORY_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CATEGORY_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createCategoryWithBookmarks =
  (userID, name, isPrivate, file) => async (dispatch) => {
    try {
      dispatch({
        type: CATEGORY_WITH_BOOKMARKS_CREATE_REQUEST,
      })

      const config = {
        Headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.put(
        `/api/users/${userID}/categories-with-bookmarks`,
        { name, isPrivate, file },
        config
      )

      dispatch({
        type: CATEGORY_WITH_BOOKMARKS_CREATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: CATEGORY_WITH_BOOKMARKS_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const createBookmark =
  (userID, categoryID, name, link) => async (dispatch) => {
    try {
      dispatch({
        type: BOOKMARK_CREATE_REQUEST,
      })

      const config = {
        Headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.put(
        `/api/users/${userID}/categories/${categoryID}/bookmarks`,
        { name, link },
        config
      )

      dispatch({
        type: BOOKMARK_CREATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: BOOKMARK_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const deleteBookmark =
  (userID, categoryID, bookmarkID) => async (dispatch) => {
    try {
      dispatch({
        type: BOOKMARK_DELETE_REQUEST,
      })

      const config = {
        Headers: {
          'Content-Type': 'application/json',
        },
      }

      await axios.delete(
        `/api/users/${userID}/categories/${categoryID}/bookmarks/${bookmarkID}`,
        {},
        config
      )

      dispatch({
        type: BOOKMARK_DELETE_SUCCESS,
      })
    } catch (error) {
      dispatch({
        type: BOOKMARK_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const deleteCategory = (userID, categoryID) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_DELETE_REQUEST,
    })

    const config = {
      Headers: {
        'Content-Type': 'application/json',
      },
    }

    await axios.delete(
      `/api/users/${userID}/categories/${categoryID}`,
      {},
      config
    )

    dispatch({
      type: CATEGORY_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: CATEGORY_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateCategory =
  (userID, categoryID, name, isPrivate) => async (dispatch) => {
    try {
      dispatch({
        type: CATEGORY_UPDATE_REQUEST,
      })

      const config = {
        Headers: {
          'Content-Type': 'application/json',
        },
      }

      await axios.put(
        `/api/users/${userID}/categories/${categoryID}`,
        { name, isPrivate },
        config
      )

      dispatch({
        type: CATEGORY_UPDATE_SUCCESS,
      })
    } catch (error) {
      dispatch({
        type: CATEGORY_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const updateBookmark =
  (userID, categoryID, bookmarkID, name, link) => async (dispatch) => {
    try {
      dispatch({
        type: BOOKMARK_UPDATE_REQUEST,
      })

      const config = {
        Headers: {
          'Content-Type': 'application/json',
        },
      }

      await axios.put(
        `/api/users/${userID}/categories/${categoryID}/bookmarks/${bookmarkID}`,
        { name, link },
        config
      )

      dispatch({
        type: BOOKMARK_UPDATE_SUCCESS,
      })
    } catch (error) {
      dispatch({
        type: BOOKMARK_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
