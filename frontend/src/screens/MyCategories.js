import Categories from '../seedingData.js'

const MyCategories = {
  render: async () => {
    return `
    <!-- my categories section -->
    <section id="my-categories">
      <div class="my-categories-container">
        <div class="my-categories-content">
          <div class="my-categories-title">
            <p class="title">My Categories</p>
          </div>
          <div class="my-categories">
            <div class="category-card-container">
              <div class="category-card">
                <a href="./add-category.html"
                  ><div class="category-title">
                    <div class="plus-container">
                      <div class="plus-icon"></div>
                    </div></div
                ></a>
                <div class="is-private">Create</div>
              </div>
            </div>

            
            ${Categories.map(
              (category) => `
              <div class="category-card-container">
                <div class="category-card">
                  <a href="#"><div class="category-title">${category.name}</div></a>
                  <div class="is-private">${category.isPrivate}</div>
                </div>
              </div>
            `
            ).join('\n')}
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

export default MyCategories
