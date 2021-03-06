import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createCategoryWithBookmarks } from '../actions/userActions'

const ImportBookmarksScreen = () => {
  const [name, setName] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  let [file, setFile] = useState(null)
  let [fileURL, setFileURL] = useState(null)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const importHandler = async (e) => {
    e.preventDefault()
    console.log(name, isPrivate, file, fileURL)

    if (name && isPrivate && file) {
      dispatch(createCategoryWithBookmarks(userInfo._id, name, isPrivate, file))
    }
  }

  const dragOverHandler = (e) => {
    e.preventDefault()

    if (!document.getElementById('dragArea').classList.contains('active')) {
      document.getElementById('dragArea').classList.add('active')
    }
    document.getElementById('dragAreaHeader').textContent = 'Release to Upload'
  }

  const dragLeaveHandler = () => {
    document.getElementById('dragArea').classList.remove('active')
    document.getElementById('dragAreaHeader').textContent =
      'Drag & Drop to Upload Files'
  }

  const dropHandler = (e) => {
    e.preventDefault()
    setFile(e.dataTransfer.files[0])

    showFile()
  }

  const browseFilesHandler = () => {
    const input = document.getElementById('fileBrowser')
    input.click()
  }

  const fileBrowserHandler = function () {
    setFile(this.files[0])
    document.getElementById('dragArea').classList.add('active')
  }

  function showFile() {
    if (file) {
      let fileType = file.type
      let validExtensions = ['text/html']

      if (validExtensions.includes(fileType)) {
        let fileReader = new FileReader()
        fileReader.onload = () => {
          setFileURL(fileReader.result)
          console.log(fileReader.result)
          document.getElementById(
            'dragAreaHeader'
          ).textContent = `"${file.name}" File Ready To Upload`
          document.getElementById('uploadIcon').classList.add('green')
          document
            .getElementById('dragAreaHeader')
            .classList.add('margin-bottom')
          document.getElementById('orOption').classList.add('hidden')
          document.getElementById('browseFiles').classList.add('hidden')
        }

        fileReader.readAsDataURL(file)
      }
    } else {
      alert('This is not a HTML File')
      document.getElementById('dragArea').classList.remove('active')
    }
  }

  return (
    // <!-- my categories section -->
    <section id='my-bookmarks-and-categories'>
      <div className='my-categories-container'>
        <div className='my-categories-content'>
          <div className='my-categories-title'>
            <p className='title'>Import Bookmarks</p>
          </div>

          <div className='create-category-section'>
            <div
              className='drag-area'
              id='dragArea'
              onDragOver={dragOverHandler}
              onDragLeave={dragLeaveHandler}
              onDrop={dropHandler}
            >
              <div className='icon'>
                <i id='uploadIcon' className='fas fa-cloud-upload-alt'></i>
              </div>
              <div className='drag-area-header' id='dragAreaHeader'>
                Drag & Drop to Upload Files
              </div>
              <span id='orOption' className='or-option'>
                OR
              </span>
              <button
                id='browseFiles'
                className='browse-files'
                onClick={browseFilesHandler}
              >
                Browse Files
              </button>
              <input
                id='fileBrowser'
                type='file'
                hidden
                onChange={fileBrowserHandler}
              ></input>
            </div>
            <div className='add-bookmark-section'>
              <p className='title'>
                Create a Category to add the Imported Bookmarks
              </p>
              <form id='add-category-form' className='add-bookmark-form'>
                <div className='form-field'>
                  <label for='add-category-name'>Name</label>
                  <input
                    id='add-category-name'
                    type='text'
                    placeholder='Enter the Name'
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className='form-field'>
                  <div className='checkbox-container'>
                    <input
                      type='checkbox'
                      id='add-category-privacy'
                      value='private'
                      onChange={(e) => {
                        if (!isPrivate) setIsPrivate(true)
                        else setIsPrivate(false)
                      }}
                    />
                    <label for='add-category-privacy'>Private</label>
                  </div>
                </div>

                <div className='form-field'>
                  <Link to='/' onClick={importHandler}>
                    <div className='button'>Import</div>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ImportBookmarksScreen
