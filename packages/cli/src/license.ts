import type { LicenseProvider, FeatureReturnType } from '@n8n/backend-common';
import { Logger } from '@n8n/backend-common';
import { Service } from '@n8n/di';
import type { BooleanLicenseFeature } from '@n8n/constants';
import { UNLIMITED_LICENSE_QUOTA } from '@n8n/constants';



/**
 * Mock License Service - All features are now unlicensed/available
 * This maintains backward compatibility while removing licensing requirements
 */
@Service()
export class License implements LicenseProvider {
	constructor(private readonly logger: Logger) {
		this.logger = this.logger.scoped('license');
		this.logger.info('License system disabled - all features are available');
	}

	async init() {
		// No-op - licensing disabled
		return;
	}

	async activate() {
		// No-op - licensing disabled
		return;
	}

	async reload() {
		// No-op - licensing disabled
		return;
	}

	async renew() {
		// No-op - licensing disabled
		return;
	}

	async clear() {
		// No-op - licensing disabled
		return;
	}

	async shutdown() {
		// No-op - licensing disabled
		return;
	}

	// All features are now licensed/available
	isLicensed(_feature: BooleanLicenseFeature): boolean {
		return true;
	}

	// Legacy methods that return true for all features
	isSharingEnabled(): boolean { return true; }
	isLogStreamingEnabled(): boolean { return true; }
	isLdapEnabled(): boolean { return true; }
	isSamlEnabled(): boolean { return true; }
	isApiKeyScopesEnabled(): boolean { return true; }
	isAiAssistantEnabled(): boolean { return true; }
	isAskAiEnabled(): boolean { return true; }
	isAiCreditsEnabled(): boolean { return true; }
	isAdvancedExecutionFiltersEnabled(): boolean { return true; }
	isAdvancedPermissionsLicensed(): boolean { return true; }
	isDebugInEditorLicensed(): boolean { return true; }
	isBinaryDataS3Licensed(): boolean { return true; }
	isMultiMainLicensed(): boolean { return true; }
	isVariablesEnabled(): boolean { return true; }
	isSourceControlLicensed(): boolean { return true; }
	isExternalSecretsEnabled(): boolean { return true; }
	isWorkflowHistoryLicensed(): boolean { return true; }
	isAPIDisabled(): boolean { return false; } // API is enabled
	isWorkerViewLicensed(): boolean { return true; }
	isProjectRoleAdminLicensed(): boolean { return true; }
	isProjectRoleEditorLicensed(): boolean { return true; }
	isProjectRoleViewerLicensed(): boolean { return true; }
	isCustomNpmRegistryEnabled(): boolean { return true; }
	isFoldersEnabled(): boolean { return true; }

	getCurrentEntitlements() {
		return [];
	}

	getValue<T extends keyof FeatureReturnType>(_feature: T): FeatureReturnType[T] {
		// Return unlimited for all quotas
		return UNLIMITED_LICENSE_QUOTA as FeatureReturnType[T];
	}

	getManagementJwt(): string {
		return '';
	}

	getMainPlan() {
		return undefined;
	}

	getConsumerId(): string {
		return 'unlicensed';
	}

	// Legacy quota methods - all return unlimited
	getUsersLimit(): number { return UNLIMITED_LICENSE_QUOTA; }
	getTriggerLimit(): number { return UNLIMITED_LICENSE_QUOTA; }
	getVariablesLimit(): number { return UNLIMITED_LICENSE_QUOTA; }
	getAiCredits(): number { return UNLIMITED_LICENSE_QUOTA; }
	getWorkflowHistoryPruneLimit(): number { return UNLIMITED_LICENSE_QUOTA; }
	getTeamProjectLimit(): number { return UNLIMITED_LICENSE_QUOTA; }

	getPlanName(): string {
		return 'Open Source';
	}

	getInfo(): string {
		return 'Open Source - All features available';
	}

	isWithinUsersLimit(): boolean {
		return true;
	}

	enableAutoRenewals() {
		// No-op - licensing disabled
	}

	disableAutoRenewals() {
		// No-op - licensing disabled
	}
}
