import { RequestHandler } from 'express';
import CaseService from '../../services/case.service';
import { CaseStatus } from '../../utils/constants';
import logger from '../../utils/logger';

/**
 * @swagger
 * /cases/{id}/in-progress:
 *   patch:
 *     tags:
 *       - Обращения
 *     summary: Перевести обращение в статус "В работе"
 *     description: Изменяет статус обращения на "в работе".
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Идентификатор обращения для обновления
 *     responses:
 *       '200':
 *         description: Статус обращения успешно обновлен
 *       '400':
 *         description: Некорректный идентификатор
 */
export const takeCaseInProgress: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCase = await CaseService.updateCaseStatus(Number(id), CaseStatus.IN_PROGRESS);
    if (!updatedCase) {
      res.status(404).json({ message: 'Case not found' });
      return;
    }
    logger.info(`Case taken in progress: ID=${id}`);
    res.json(updatedCase);
  } catch (error) {
    logger.error(`Error taking case in progress: ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};
