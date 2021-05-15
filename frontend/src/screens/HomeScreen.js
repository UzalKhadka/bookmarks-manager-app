const HomeScreen = {
  render: () => {
    return `
    <!-- hero  -->
    <section class="hero-section">
      <div class="hero-container">
        <div class="hero-content">
          <div class="welcome-message">
            Welcome <span class="extra">John Doe</span>
            <div class="login-signup-prompt">
              <a href="./login.html"><div class="button">Log In</div></a>
              <a href="./signup.html"><div class="button">Sign Up</div></a>
            </div>
          </div>
          <div class="my-categories-button">
            <a href="./categories.html"
              ><div class="button">My Categories</div></a
            >
            <a href="./bookmarks.html"
              ><div class="button">My Bookmarks</div></a
            >
          </div>
          <div class="add-bookmarks-and-categories">
            <a href="./add-bookmark.html"
              ><div class="button">Add a Bookmark</div></a
            >
            <a href="./add-category.html"
              ><div class="button">Add a Category</div></a
            >
          </div>
          <div class="import-export">
            <a href="#"><div class="button">Import Bookmarks</div></a>
            <a href="#"><div class="button">Export Bookmarks</div></a>
          </div>
        </div>
      </div>
    </section>

    `
  },
}

export default HomeScreen
