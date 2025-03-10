import { RequestHandler } from 'express';
import { createCase } from './cases/createCase';
import { takeCaseInProgress }from './cases/takeCaseInProgress';
import { completeCase } from './cases/completeCase';
import { cancelCase } from './cases/cancelCase';
import { getCases } from './cases/getCases';
import { cancelAllInProgressCases } from './cases/cancelAllInProgressCases';

class CaseController {
  static createCase: RequestHandler = createCase;
  static takeCaseInProgress: RequestHandler = takeCaseInProgress;
  static completeCase: RequestHandler = completeCase;
  static cancelCase: RequestHandler = cancelCase;
  static getCases: RequestHandler = getCases;
  static cancelAllInProgressCases: RequestHandler = cancelAllInProgressCases;
}

export default CaseController;
