import express,{Request,Response,Application,NextFunction} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes/index';
class Server {
    private app: Application;
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        this.app.set('port', process.env.PORT_SERVER || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/api/v1', router);
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
export default Server