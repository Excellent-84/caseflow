import { AppDataSource } from '../config/ormconfig';
import { Case } from '../entity/Case';
import { CaseStatus } from '../utils/constants';
import { Repository } from 'typeorm';
import logger from '../utils/logger';

class CaseService {
  private caseRepository: Repository<Case>;

  constructor() {
    this.caseRepository = AppDataSource.getRepository(Case);
  }

  async createCase(subject: string, description: string): Promise<Case> {
    try {
      const newCase = this.caseRepository.create({ subject, description });
      return await this.caseRepository.save(newCase);
    } catch (error) {
      logger.error(`Error saving new case: ${error}`);
      throw new Error('Database error while creating case');
    }
  }

  async updateCaseStatus(id: number, status: CaseStatus, extraText?: string): Promise<Case | null> {
    const existingCase = await this.caseRepository.findOne({ where: { id } });
    if (!existingCase) return null;

    if (existingCase.status === status) {
      return existingCase;
    }

    existingCase.status = status;

    if (status === CaseStatus.COMPLETED) {
      existingCase.resolutionText = extraText || 'Решение не указано';
    } else if (status === CaseStatus.CANCELLED) {
      existingCase.cancellationReason = extraText || 'Причина не указана';
    }

    return this.caseRepository.save(existingCase);
  }

  async getCases(startDate?: string, endDate?: string): Promise<Case[]> {
    const query = this.caseRepository.createQueryBuilder('case');

    if (startDate) query.andWhere('case.createdAt >= :startDate', { startDate });
    if (endDate) query.andWhere('case.createdAt <= :endDate', { endDate });

    return query.getMany();
  }

  async cancelAllInProgressCases(): Promise<number> {
    const result = await this.caseRepository
      .createQueryBuilder()
      .update(Case)
      .set({ status: CaseStatus.CANCELLED, cancellationReason: 'Автоматическая отмена' })
      .where('status = :status', { status: CaseStatus.IN_PROGRESS })
      .execute();

    return result.affected || 0;
  }
}

export default new CaseService();
