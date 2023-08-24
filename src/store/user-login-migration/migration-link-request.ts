import { MigrationPageOrigin } from "@/store/user-login-migration/migration-page-origin.enum";

export interface MigrationLinkRequest {
	pageType: MigrationPageOrigin;
	sourceSystem: string;
	targetSystem: string;
}
