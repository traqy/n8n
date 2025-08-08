import type { BooleanLicenseFeature } from '@n8n/constants';

/**
 * Mock FeatureNotLicensedError - This is now a no-op since all features are unlicensed
 */
export class FeatureNotLicensedError extends Error {
	constructor(feature: BooleanLicenseFeature) {
		super(
			`Feature '${feature}' is not licensed (but this error should never be thrown since all features are now unlicensed)`,
		);
		this.name = 'FeatureNotLicensedError';
	}
}
