import mongoose from 'mongoose'

const MONGODB_URI =
  'mongodb+srv://bookmarks-manager:bookmarks12345@cluster0.wl7jm.mongodb.net/bookmarks-manager?retryWrites=true&w=majority'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })

    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
