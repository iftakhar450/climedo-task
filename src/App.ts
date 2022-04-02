import * as express from 'express'
import routes from './routes/index';
import * as bodyParser from 'body-parser';

class App {
  public express
  public db;

  constructor() {
    this.express = express()
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());


    this.mountRoutes()


  }

  private mountRoutes(): void {
    const router = express.Router()

    // import all routes routes
    this.express.use('/api', routes)
  }
}

export default new App().express
