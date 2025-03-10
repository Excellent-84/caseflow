import { Router } from 'express';
import CaseController from '../controllers/case.controller';
import { validate } from '../middlewares/validate';
import {
  createCaseValidator,
  getCasesValidator,
  updateCaseCancelValidator,
  updateCaseCompleteValidator,
  updateCaseInProgressValidator
} from '../validators/case.validator';

const caseRouter = Router();

caseRouter.post('/cases', createCaseValidator, validate, CaseController.createCase);
caseRouter.get('/cases', getCasesValidator, validate, CaseController.getCases);
caseRouter.patch(
  '/cases/:id/in-progress',
  updateCaseInProgressValidator,
  validate,
  CaseController.takeCaseInProgress
);
caseRouter.patch(
  '/cases/:id/complete',
  updateCaseCompleteValidator,
  validate,
  CaseController.completeCase
);
caseRouter.patch(
  '/cases/:id/cancel',
  updateCaseCancelValidator,
  validate,
  CaseController.cancelCase
);
caseRouter.patch(
  '/cases/cancel-all-in-progress',
  CaseController.cancelAllInProgressCases
);

export default caseRouter;
