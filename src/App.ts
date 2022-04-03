import * as express from 'express'
import routes from './routes/index';
import * as bodyParser from 'body-parser';
import * as swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
class App {
  public express
  public db;

  /* Swagger files start */
  private swaggerFile: any = (process.cwd() + "/src/swagger/swagger.json");
  private swaggerData: any = fs.readFileSync(this.swaggerFile, 'utf8');
  private customCss: any = fs.readFileSync((process.cwd() + "/src/swagger/swagger.css"), 'utf8');
  private swaggerDocument = JSON.parse(this.swaggerData);

  constructor() {
    this.express = express()
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());

    this.express.use('/api/docs', swaggerUi.serve,
      swaggerUi.setup(this.swaggerDocument, null, null, this.customCss));

    // import all routes
    this.mountRoutes()


  }

  private mountRoutes(): void {
    const router = express.Router()


    // Render the index page
    this.express.get('/', (req, res) => {
      res.redirect('/api/docs');
      // res.json({ message: "Running" })
    });

    // import all routes routes
    this.express.use('/api', routes)
  }
}

export default new App().express
