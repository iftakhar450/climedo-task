import * as express from 'express'
import { connectToDatabase } from './connections/mongodb'
import routes from './routes';
class App {
  public express
  public db;

  constructor() {
    this.express = express()
    connectToDatabase()
    this.mountRoutes()
  }

  private mountRoutes(): void {
    const router = express.Router()
    router.get('/', (req, res) => {
      return res.status(200).json({
        message: 'Hello World!'
      })
    })

    this.express.use('/', router)

    // import user routes
    this.express.use('/api', routes)
  }
}

export default new App().express
