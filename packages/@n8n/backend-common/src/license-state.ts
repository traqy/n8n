import type { BooleanLicenseFeature } from '@n8n/constants';
import { UNLIMITED_LICENSE_QUOTA } from '@n8n/constants';
import { Service } from '@n8n/di';

import type { FeatureReturnType } from './types';

@Service()
export class LicenseState {
	// License provider no longer needed - all features are unlicensed
	setLicenseProvider() {
		// No-op - licensing disabled
	}

	// --------------------
	//     core queries
	// --------------------

	isLicensed(feature: BooleanLicenseFeature) {
		// Always return true - all features are now unlicensed/free
		return true;
	}

	getValue<T extends keyof FeatureReturnType>(feature: T): FeatureReturnType[T] {
		// Return unlimited quotas for all numeric features
		if (feature.toString().startsWith('quota:')) {
			return UNLIMITED_LICENSE_QUOTA as FeatureReturnType[T];
		}
		// Return default values for other features
		return undefined as FeatureReturnType[T];
	}

	// --------------------
	//      booleans
	// --------------------

	isSharingLicensed() {
		return this.isLicensed('feat:sharing');
	}

	isLogStreamingLicensed() {
		return this.isLicensed('feat:logStreaming');
	}

	isLdapLicensed() {
		return this.isLicensed('feat:ldap');
	}

	isSamlLicensed() {
		return this.isLicensed('feat:saml');
	}

	isOidcLicensed() {
		return this.isLicensed('feat:oidc');
	}

	isMFAEnforcementLicensed() {
		return this.isLicensed('feat:mfaEnforcement');
	}

	isApiKeyScopesLicensed() {
		return this.isLicensed('feat:apiKeyScopes');
	}

	isAiAssistantLicensed() {
		return this.isLicensed('feat:aiAssistant');
	}

	isAskAiLicensed() {
		return this.isLicensed('feat:askAi');
	}

	isAiCreditsLicensed() {
		return this.isLicensed('feat:aiCredits');
	}

	isAdvancedExecutionFiltersLicensed() {
		return this.isLicensed('feat:advancedExecutionFilters');
	}

	isAdvancedPermissionsLicensed() {
		return this.isLicensed('feat:advancedPermissions');
	}

	isDebugInEditorLicensed() {
		return this.isLicensed('feat:debugInEditor');
	}

	isBinaryDataS3Licensed() {
		return this.isLicensed('feat:binaryDataS3');
	}

	isMultiMainLicensed() {
		return this.isLicensed('feat:multipleMainInstances');
	}

	isVariablesLicensed() {
		return this.isLicensed('feat:variables');
	}

	isSourceControlLicensed() {
		return this.isLicensed('feat:sourceControl');
	}

	isExternalSecretsLicensed() {
		return this.isLicensed('feat:externalSecrets');
	}

	isWorkflowHistoryLicensed() {
		return this.isLicensed('feat:workflowHistory');
	}

	isAPIDisabled() {
		return this.isLicensed('feat:apiDisabled');
	}

	isWorkerViewLicensed() {
		return this.isLicensed('feat:workerView');
	}

	isProjectRoleAdminLicensed() {
		return this.isLicensed('feat:projectRole:admin');
	}

	isProjectRoleEditorLicensed() {
		return this.isLicensed('feat:projectRole:editor');
	}

	isProjectRoleViewerLicensed() {
		return this.isLicensed('feat:projectRole:viewer');
	}

	isCustomNpmRegistryLicensed() {
		return this.isLicensed('feat:communityNodes:customRegistry');
	}

	isFoldersLicensed() {
		return this.isLicensed('feat:folders');
	}

	isInsightsSummaryLicensed() {
		return this.isLicensed('feat:insights:viewSummary');
	}

	isInsightsDashboardLicensed() {
		return this.isLicensed('feat:insights:viewDashboard');
	}

	isInsightsHourlyDataLicensed() {
		return this.isLicensed('feat:insights:viewHourlyData');
	}

	// --------------------
	//      integers
	// --------------------

	getMaxUsers() {
		return this.getValue('quota:users') ?? UNLIMITED_LICENSE_QUOTA;
	}

	getMaxActiveWorkflows() {
		return this.getValue('quota:activeWorkflows') ?? UNLIMITED_LICENSE_QUOTA;
	}

	getMaxVariables() {
		return this.getValue('quota:maxVariables') ?? UNLIMITED_LICENSE_QUOTA;
	}

	getMaxAiCredits() {
		return this.getValue('quota:aiCredits') ?? 0;
	}

	getWorkflowHistoryPruneQuota() {
		return this.getValue('quota:workflowHistoryPrune') ?? UNLIMITED_LICENSE_QUOTA;
	}

	getInsightsMaxHistory() {
		return this.getValue('quota:insights:maxHistoryDays') ?? 7;
	}

	getInsightsRetentionMaxAge() {
		return this.getValue('quota:insights:retention:maxAgeDays') ?? 180;
	}

	getInsightsRetentionPruneInterval() {
		return this.getValue('quota:insights:retention:pruneIntervalDays') ?? 24;
	}

	getMaxTeamProjects() {
		return this.getValue('quota:maxTeamProjects') ?? 0;
	}

	getMaxWorkflowsWithEvaluations() {
		return this.getValue('quota:evaluations:maxWorkflows') ?? 0;
	}
}
