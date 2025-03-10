import { RequestHandler } from 'express';
import CaseService from '../../services/case.service';
import { CaseStatus } from '../../utils/constants';
import logger from '../../utils/logger';

/**
 * @swagger
 * /cases/{id}/cancel:
 *   patch:
 *     tags:
 *       - Обращения
 *     summary: Отменить обращение
 *     description: Отменяет обращение с возможным указанием причины отмены.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Идентификатор обращения для отмены
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cancellationReason:
 *                 type: string
 *                 description: Причина отмены обращения
 *                 example: "Обращение отменено по техническим причинам"
 *     responses:
 *       '200':
 *         description: Обращение успешно отменено
 *       '400':
 *         description: Некорректные данные
 */
export const cancelCase: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { cancellationReason } = req.body;
    const updatedCase = await CaseService.updateCaseStatus(
      Number(id), CaseStatus.CANCELLED, cancellationReason
    );

    if (!updatedCase) {
      res.status(404).json({ message: 'Case not found' });
      return;
    }

    logger.info(`Case cancelled: ID=${id}, Reason=${cancellationReason}`);
    res.json(updatedCase);
  } catch (error) {
    logger.error(`Error cancelling case: ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};
