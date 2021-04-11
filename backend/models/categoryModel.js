import mongoose from 'mongoose'

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    bookmarks: [bookmarkSchema],
  },
  {
    timestamps: true,
  }
)

const Category = mongoose.model('category', categorySchema)

export default Category
