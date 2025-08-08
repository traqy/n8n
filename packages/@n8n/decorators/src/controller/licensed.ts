import type { BooleanLicenseFeature } from '@n8n/constants';

// Licensed decorator is now a no-op since all features are unlicensed
export const Licensed =
	(_licenseFeature: BooleanLicenseFeature): MethodDecorator =>
	() => {
		// No-op - all features are now unlicensed/available
	};
