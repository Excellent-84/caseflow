import { body, param, query } from 'express-validator';

export const createCaseValidator = [
  body('subject')
    .notEmpty().withMessage('Тема обязательна')
    .isLength({ min: 5, max: 100 }).withMessage('Тема должна содержать от 5 до 100 символов'),
  body('description')
    .notEmpty().withMessage('Описание обязательно')
    .isLength({ min: 10, max: 500 }).withMessage('Описание должно содержать от 10 до 500 символов')
];

export const updateCaseInProgressValidator = [
  param('id').isInt().withMessage('Идентификатор должен быть числом')
];

export const updateCaseCompleteValidator = [
  param('id').isInt().withMessage('Идентификатор должен быть числом'),
  body('resolutionText').optional().isString().withMessage('Текст решения должен быть строкой')
];

export const updateCaseCancelValidator = [
  param('id').isInt().withMessage('Идентификатор должен быть числом'),
  body('cancellationReason').optional().isString().withMessage('Причина отмены должна быть строкой')
];

export const getCasesValidator = [
  query('startDate').optional().isISO8601().withMessage('Начальная дата некорректна'),
  query('endDate').optional().isISO8601().withMessage('Конечная дата некорректна')
];
