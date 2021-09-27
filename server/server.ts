import * as restify from 'restify';
import { environment } from '../common/environment';
import { Router } from '../common/router';

export class Server {
  application: restify.Server;

  initRoutes(routes: Router[]): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.application = restify.createServer({
          name: 'eat-api',
          version: '1.0.0'
        });

        this.application.use(restify.plugins.queryParser());

        // Routes
        for (const router of routes) {
          router.applyRoutes(this.application);
        }

        this.application.listen(environment.server.port, () => {
          resolve(this.application);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  bootstrap(routes: Router[] = []): Promise<Server> {
    return this.initRoutes(routes).then(() => this);
  }
}
