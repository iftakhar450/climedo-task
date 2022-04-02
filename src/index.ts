import app from './App'
import { connectToDatabase } from './connections/mongodb'
const port = process.env.PORT || 3000


app.listen(port, async (err) => {
  if (err) {
    return console.log(err)
  }
  await connectToDatabase()

  return console.log(`server is listening on ${port}`)
})
