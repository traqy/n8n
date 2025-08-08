import { Column, Entity, PrimaryColumn } from '@n8n/typeorm';

/**
 * Mock License Metrics Entity - Minimal implementation since licensing is disabled
 */
@Entity()
export class LicenseMetricsEntity {
	@PrimaryColumn('date')
	date: Date = new Date();

	@Column({ type: 'integer', default: 0 })
	executions: number = 0;

	@Column({ type: 'integer', default: 0 })
	workflows: number = 0;
}
