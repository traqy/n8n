import { Config, Env } from '../decorators';

@Config
export class LicenseConfig {
	/** License server URL */
	@Env('N8N_LICENSE_SERVER_URL')
	readonly serverUrl: string = '';

	/** Auto-renew enabled */
	@Env('N8N_LICENSE_AUTO_RENEW_ENABLED')
	readonly autoRenewEnabled: boolean = false;

	/** Auto-renew offset in seconds */
	@Env('N8N_LICENSE_AUTO_RENEW_OFFSET')
	readonly autoRenewOffset: number = 60 * 60 * 72; // 72 hours

	/** License activation key */
	@Env('N8N_LICENSE_ACTIVATION_KEY')
	readonly activationKey: string = '';

	/** Tenant ID (default: 1 for staging/local) */
	@Env('N8N_LICENSE_TENANT_ID')
	readonly tenantId: number = 1;

	/** Certificate */
	@Env('N8N_LICENSE_CERT')
	readonly cert: string = '';
}
