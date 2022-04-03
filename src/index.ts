import app from './App'
import { connectToDatabase, pushSeedData } from './connections/mongodb'
const port = process.env.PORT || 3000


let server = app.listen(port, async (err) => {
  if (err) {
    return console.log(err)
  }
  await connectToDatabase()
  await pushSeedData();

  return console.log(`server is listening on ${port}`)
})


// Gracefully Server Shutdown
const startGracefulShutdown = () => {
  console.log('Starting Server Shutdown...');
  server.close(() => {
  });
}

process.on('SIGTERM', startGracefulShutdown);
process.on('SIGINT', startGracefulShutdown);