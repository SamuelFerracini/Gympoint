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

routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.show);

routes.post('/sessions', SessionController.store);

routes.get('/students/:id/help-orders', HelpOrderController.show);
routes.post('/students/:id/help-orders', HelpOrderController.store);

routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:id/checkins', CheckinController.store);

routes.use(authMiddleware);

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.destroy);

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.get('/plans/:id', PlanController.show);
routes.delete('/plans/:id', PlanController.destroy);

routes.get('/enrolments', EnrolmentController.index);
routes.post('/enrolments', EnrolmentController.store);
routes.put('/enrolments/:id', EnrolmentController.update);
routes.get('/enrolments/:id', EnrolmentController.show);
routes.delete('/enrolments/:id', EnrolmentController.destroy);

routes.get('/help-orders', HelpOrderController.index);
routes.post('/help-orders/:id/answer', AnswerOrderController.store);

export default routes;
