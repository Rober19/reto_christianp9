import express, { json, urlencoded } from 'express';
import { resMsg, port } from 'rober19-config';
import { errors } from 'celebrate';
import MemberRoutes from './components/members/member.routes';
import morgan from 'morgan';
import _config, { yellow } from './config/config';
import helmet from 'helmet';

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.AppConfig();
    this.routes();
  }

  AppConfig() {
    this.app.set('port', process.env.PORT || port[0]);
    this.app.use(morgan('dev'));
    this.app.use(json());
    this.app.use(urlencoded({ extended: false }));
    this.app.use(helmet());
  }

  routes() {
    new MemberRoutes(this.app);
    //errors() debe estár despues de asignar todas las rutas
    this.app.use(errors());
  }

  start() {
    this.app.listen(this.app.get('port'), () => {
      console.log(
        `${_config.log('ok', undefined, resMsg.serverOn)} [Port:${yellow(
          ` ${this.app.get('port')}`,
        )}]`,
      );
    });
  }
}

export default Server;
