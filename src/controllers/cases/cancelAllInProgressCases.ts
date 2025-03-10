import { RequestHandler } from 'express';
import CaseService from '../../services/case.service';
import logger from '../../utils/logger';

/**
 * @swagger
 * /cases/cancel-all-in-progress:
 *   patch:
 *     tags:
 *       - Обращения
 *     summary: Отменить все обращения со статусом "В работе"
 *     description: Отменяет все обращения, находящиеся в статусе "в работе".
 *     responses:
 *       '200':
 *         description: Все обращения со статусом "в работе" успешно отменены
 *       '500':
 *         description: Внутренняя ошибка сервера
 */
export const cancelAllInProgressCases: RequestHandler = async (req, res) => {
  try {
    const affectedRows = await CaseService.cancelAllInProgressCases();
    logger.info(`All in-progress cases cancelled: Count=${affectedRows}`);
    res.json({ message: `Cancelled ${affectedRows} cases in progress` });
  } catch (error) {
    logger.error(`Error cancelling all in-progress cases: ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};
