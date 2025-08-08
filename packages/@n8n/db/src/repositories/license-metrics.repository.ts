import { Service } from '@n8n/di';
import { DataSource, Repository } from '@n8n/typeorm';
import { LicenseMetricsEntity } from '../entities/license-metrics.entity';

/**
 * Mock License Metrics Repository - No-op since licensing is disabled
 */
@Service()
export class LicenseMetricsRepository extends Repository<LicenseMetricsEntity> {
	constructor(dataSource: DataSource) {
		super(LicenseMetricsEntity, dataSource.manager);
	}

	// All methods are no-ops since licensing is disabled
	async getAllForDate(): Promise<LicenseMetricsEntity[]> {
		return [];
	}

	// Remove the custom save method to use the inherited one from Repository
}
