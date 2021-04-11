import mongoose from 'mongoose'

const bookmarkSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Bookmark = mongoose.model('bookmark', bookmarkSchema)

export default Bookmark
