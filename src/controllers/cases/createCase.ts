import { RequestHandler } from 'express';
import CaseService from '../../services/case.service';
import logger from '../../utils/logger';

/**
 * @swagger
 * /cases:
 *   post:
 *     tags:
 *       - Обращения
 *     summary: Создать новое обращение
 *     description: Создает новое обращение с темой и описанием.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject:
 *                 type: string
 *                 description: Тема обращения
 *                 example: "Тема обращения"
 *               description:
 *                 type: string
 *                 description: Подробное описание обращения
 *                 example: "Описание обращения..."
 *     responses:
 *       '201':
 *         description: Обращение успешно создано
 *       '400':
 *         description: Некорректный ввод данных
 */
export const createCase: RequestHandler = async (req, res) => {
  try {
    const { subject, description } = req.body;
    if (!subject || !description) {
      res.status(400).json({ message: 'Subject and description are required' });
      return;
    }
    const newCase = await CaseService.createCase(subject, description);
    logger.info(`Case created: ID=${newCase.id}, Subject=${subject}`);
    res.status(201).json(newCase);
  } catch (error) {
    logger.error(`Error creating case: ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};
