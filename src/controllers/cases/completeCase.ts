import { RequestHandler } from 'express';
import CaseService from '../../services/case.service';
import { CaseStatus } from '../../utils/constants';
import logger from '../../utils/logger';

/**
 * @swagger
 * /cases/{id}/complete:
 *   patch:
 *     tags:
 *       - Обращения
 *     summary: Завершить обращение
 *     description: Помечает обращение как завершенное с возможным указанием текста решения.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Идентификатор обращения для обновления
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resolutionText:
 *                 type: string
 *                 description: Текст с решением проблемы
 *                 example: "Проблема решена"
 *     responses:
 *       '200':
 *         description: Обращение успешно завершено
 *       '400':
 *         description: Некорректные данные
 */
export const completeCase: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { resolutionText } = req.body;
    const updatedCase = await CaseService.updateCaseStatus(
      Number(id), CaseStatus.COMPLETED, resolutionText
    );

    if (!updatedCase) {
      res.status(404).json({ message: 'Case not found' });
      return;
    }

    logger.info(`Case completed: ID=${id}, Resolution=${resolutionText}`);
    res.json(updatedCase);
  } catch (error) {
    logger.error(`Error completing case: ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};
