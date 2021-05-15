import Categories from '../seedingData.js'

const MyBookmarks = {
  render: () => {
    const { categories } = Categories

    function copyToClipboard(text) {
      // document.execCommand('copy')
      alert('copycat')
    }

    return `
    <!-- my categories section -->
    <section id="my-bookmarks-and-categories">
      <div class="my-categories-container">
        <div class="my-categories-content">
          <div class="my-categories-title">
            <p class="title">My Bookmarks</p>
          </div>
          <ul class="my-bookmarks">
            ${Categories.map(
              (category) => `
            <li class="my-bookmarks-table">
              <div class="table-title">
                
                <div class="table-title-name">
                  <p class="current-category-name">${category.name}</p>
                  <p class="current-category-privacy-type">(${
                    category.isPrivate
                  })</p>
                </div>
                <div class="table-title-icons">
                  <span id="editCategory"><i class="far fa-edit"></i></span>
                  <span id="deleteCategory"
                    ><i class="far fa-trash-alt"></i
                  ></span>
                </div>
              </div>
              <div class="table-body">
                <table class="bookmark-table">
                  <thead>
                    <tr>
                      <th class="current-bookmark-sn current-bookmark-index">
                        S.N
                      </th>
                      <th class="current-bookmark-name">Name</th>
                      <th class="current-bookmark-link">Link</th>
                      <th class="current-bookmark-copy current-bookmark-option">
                        Copy
                      </th>
                      <th class="current-bookmark-goto current-bookmark-option">
                        Go To
                      </th>
                      <th class="current-bookmark-edit current-bookmark-option">
                        Edit
                      </th>
                      <th
                        class="current-bookmark-delete current-bookmark-option"
                      >
                        Delete
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    ${category.bookmarks
                      .map(
                        (bookmark, index) => `
                      <tr>
                        <td class="current-bookmark-sn current-bookmark-index">
                          ${index + 1}
                        </td>
                        <td class="current-bookmark-name">${bookmark.name}</td>
                        <td class="current-bookmark-link">${bookmark.link}</td>
                        <td
                          id="currentBookmarkCopy"
                          class="current-bookmark-option"
                          onclick= copyToClipboard('aaccss')
                        >
                          <i class="far fa-copy"></i>
                        </td>
                        <td
                          id="currentBookmarkGoTo"
                          class="current-bookmark-option"
                        >
                          <i class="fas fa-external-link-alt"></i>
                        </td>
                        <td
                          id="currentBookmarkEdit"
                          class="current-bookmark-option"
                        >
                          <i class="far fa-edit"></i>
                        </td>
                        <td
                          id="currentBookmarkDelete"
                          class="current-bookmark-option"
                        >
                          <i class="far fa-trash-alt"></i>
                        </td>
                    </tr>
                `
                      )
                      .join('\n')}
                
                    
                  </tbody>
                </table>
              </div>
            </li>

            `
            ).join('\n')}
            
          </ul>

          <div class="category-card-container">
            <div class="category-card">
              <a href="./add-category.html"
                ><div class="category-title">
                  <div class="plus-container">
                    <div class="plus-icon"></div>
                  </div></div
              ></a>
            </div>
          </div>

          <div class="go-back-button">
            <a href="#"><div class="button last">Go Back</div></a>
          </div>
        </div>
      </div>
    </section>

    `
  },
}

export default MyBookmarks
