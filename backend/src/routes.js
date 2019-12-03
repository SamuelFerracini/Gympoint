import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import authMiddleware from './app/middlewares/auth';
import UserController from './app/controllers/UserController';
import PlanController from './app/controllers/PlanController';
import EnrolmentController from './app/controllers/EnrolmentController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import AnswerOrderController from './app/controllers/AnswerOrderController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post('/students/:id/help-orders', HelpOrderController.store);

routes.post('/students/:id/checkins', CheckinController.store);

routes.use(authMiddleware);

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.show);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.destroy);

routes.get('/plans', PlanController.index);
routes.get('/plans/:id', PlanController.show);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.destroy);

routes.get('/enrolments', EnrolmentController.index);
routes.post('/enrolments', EnrolmentController.store);
routes.put('/enrolments', EnrolmentController.update);
routes.delete('/enrolments/:id', EnrolmentController.destroy);

routes.get('/students/:id/checkins', CheckinController.index);

routes.get('/help-orders', HelpOrderController.index);
routes.get('/students/:id/help-orders', HelpOrderController.show);
routes.post('/help-orders/:id/answer', AnswerOrderController.store);

export default routes;
