import { RequestHandler } from 'express';
import CaseService from '../../services/case.service';
import logger from '../../utils/logger';

/**
 * @swagger
 * /cases:
 *   get:
 *     tags:
 *       - Обращения
 *     summary: Получить список обращений
 *     description: Возвращает список обращений с возможностью фильтрации по дате.
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Начальная дата для фильтрации
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Конечная дата для фильтрации
 *     responses:
 *       '200':
 *         description: Список обращений
 *       '400':
 *         description: Некорректный формат даты
 */
export const getCases: RequestHandler = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const cases = await CaseService.getCases(startDate as string, endDate as string);
    logger.info(`Cases retrieved: Count=${cases.length}`);
    res.json(cases);
  } catch (error) {
    logger.error(`Error retrieving cases: ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};
