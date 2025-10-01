import { useApplicationError } from "../composables/application-error.composable";
import { ApplicationError } from "./types/application-error";
import { School } from "./types/schools";
import {
	FederalStateResponse,
	SchoolApiFactory,
	SchoolApiInterface,
	SchoolFeature,
	SchoolResponse,
	SchoolSystemResponse,
	SchoolUpdateBodyParams,
	SchoolYearResponse,
	SchulcloudTheme,
	SystemsApiFactory,
	SystemsApiInterface,
	UserImportApiFactory,
	UserImportApiInterface,
} from "@/serverApi/v3";
import { authModule } from "@/store";
import { $axios } from "@/utils/api";
import { mapFeaturesToFeaturesObject } from "@/utils/school-features";
import { useEnvConfig } from "@data-env";
import { AxiosError } from "axios";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({
	name: "schoolsModule",
	namespaced: true,
	stateFactory: true,
})
export default class SchoolsModule extends VuexModule {
	school: School = {
		id: "",
		name: "",
		logo: { name: "", dataUrl: "" },
		fileStorageType: undefined,
		federalState: {
			id: "",
			counties: [],
			name: "",
			abbreviation: "",
			logoUrl: "",
		},
		county: {
			id: "",
			antaresKey: "",
			countyId: 0,
			name: "",
		},
		systemIds: [],
		updatedAt: "",
		createdAt: "",
		currentYear: {
			id: "",
			name: "",
			startDate: "",
			endDate: "",
			courseCreationInNextYear: false,
		},
		purpose: undefined,
		features: [],
		featureObject: {
			[SchoolFeature.RocketChat]: false,
			[SchoolFeature.Videoconference]: false,
			[SchoolFeature.StudentVisibility]: false,
			[SchoolFeature.LdapUniventionMigrationSchool]: false,
			[SchoolFeature.ShowOutdatedUsers]: false,
			[SchoolFeature.EnableLdapSyncDuringMigration]: false,
			[SchoolFeature.OauthProvisioningEnabled]: false,
			[SchoolFeature.Nextcloud]: false,
			[SchoolFeature.AiTutor]: false,
		},
		instanceFeatures: [],
		permissions: {},
		inMaintenance: false,
		inUserMigration: false,
		isExternal: false,
		years: {
			nextYear: {
				id: "",
				name: "",
				startDate: "",
				endDate: "",
				courseCreationInNextYear: false,
			},
			lastYear: {
				id: "",
				name: "",
				startDate: "",
				endDate: "",
				courseCreationInNextYear: false,
			},
			activeYear: {
				id: "",
				name: "",
				startDate: "",
				endDate: "",
				courseCreationInNextYear: false,
			},
			schoolYears: [],
		},
	};
	systems: SchoolSystemResponse[] = [];
	loading = false;
	error: null | ApplicationError = null;

	private get schoolApi(): SchoolApiInterface {
		return SchoolApiFactory(undefined, "v3", $axios);
	}

	@Mutation
	setSchool(updatedSchool: SchoolResponse): void {
		const featureObject = mapFeaturesToFeaturesObject(updatedSchool.features);
		this.school = { ...updatedSchool, featureObject };
	}

	@Mutation
	setSystems(systems: SchoolSystemResponse[]): void {
		this.systems = systems;
	}

	@Mutation
	setSchoolLogo(logo: { name: string; dataUrl: string }): void {
		this.school.logo = logo;
	}

	@Mutation
	setLoading(loading: boolean): void {
		this.loading = loading;
	}

	@Mutation
	setError(error: ApplicationError | null): void {
		this.error = error;
	}

	get getSchool(): School {
		return this.school;
	}

	get getCurrentYear(): SchoolYearResponse | undefined {
		return this.school.currentYear;
	}

	get getFederalState(): FederalStateResponse | undefined {
		return this.school.federalState;
	}

	get getSystems(): SchoolSystemResponse[] {
		return this.systems;
	}

	get getLoading(): boolean {
		return this.loading;
	}

	get getError(): ApplicationError | null {
		return this.error;
	}

	get schoolIsExternallyManaged(): boolean {
		const isThr = useEnvConfig().value.SC_THEME === SchulcloudTheme.Thr;
		const result = this.school.isExternal || isThr;

		return result;
	}

	get schoolIsSynced(): boolean {
		return this.systems.some(
			(system) =>
				system.type === "tsp-school" ||
				system.type === "oauth" ||
				(system.type === "ldap" &&
					(system.ldapConfig?.provider === "iserv-idm" ||
						system.ldapConfig?.provider === "univention" ||
						system.ldapConfig?.provider === "general"))
		);
	}

	@Action
	async fetchSchool(): Promise<void> {
		this.setLoading(true);
		if (authModule.getSchool?.id) {
			try {
				const school = (await this.schoolApi.schoolControllerGetSchoolById(authModule.getSchool?.id)).data;

				this.setSchool(school);

				this.setLoading(false);
			} catch (error: unknown) {
				if (error instanceof AxiosError) {
					this.setError(
						useApplicationError().createApplicationError(
							error.response?.status ?? 500,
							"pages.administration.school.index.error",
							error.message
						)
					);
				}
				this.setLoading(false);
			}
		}
	}

	@Action
	async fetchSystems(): Promise<void> {
		this.setLoading(true);
		try {
			const { data } = await this.schoolApi.schoolControllerGetSchoolSystems(this.school.id);

			this.setSystems(data);
			this.setLoading(false);
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				this.setError(
					useApplicationError().createApplicationError(
						error.response?.status ?? 500,
						"pages.administration.school.index.error",
						error.message
					)
				);
			}
			this.setLoading(false);
		}
	}

	@Action
	async update(payload: { id: string; props: SchoolUpdateBodyParams }): Promise<void> {
		const { id, props } = payload;
		this.setLoading(true);
		try {
			const { data } = await this.schoolApi.schoolControllerUpdateSchool(id, props);

			this.setSchool(data);
			this.setLoading(false);
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				this.setError(
					useApplicationError().createApplicationError(
						error.response?.status ?? 500,
						"pages.administration.school.index.error",
						error.message
					)
				);
			}
			this.setLoading(false);
		}
	}

	@Action
	async deleteSystem(systemId: string): Promise<void> {
		this.setLoading(true);
		try {
			const { id } = this.school;
			await this.schoolApi.schoolControllerRemoveSystemFromSchool(id, systemId);
			await Promise.all([this.fetchSchool(), this.fetchSystems()]);

			this.setLoading(false);
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				this.setError(
					useApplicationError().createApplicationError(
						error.response?.status ?? 500,
						"pages.administration.school.index.error",
						error.message
					)
				);
			}
			this.setLoading(false);
		}
	}

	@Action
	async migrationStartSync(): Promise<void> {
		if (!this.school.inMaintenance) {
			return;
		}
		this.setLoading(true);
		try {
			await this.importUserApi.importUserControllerEndSchoolInMaintenance();
			this.setSchool({ ...this.school, inMaintenance: false });
			this.setLoading(false);
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				this.setError(
					useApplicationError().createApplicationError(
						error.response?.status ?? 500,
						"pages.administration.school.index.error",
						error.message
					)
				);
			}
			this.setLoading(false);
		}
	}

	@Action
	async setSchoolInUserMigration(useCentralLdap = true): Promise<void> {
		if (this.school.inUserMigration) {
			return;
		}
		this.setLoading(true);
		this.setError(null);
		try {
			await this.importUserApi.importUserControllerStartSchoolInUserMigration(useCentralLdap);
			this.setSchool({
				...this.school,
				inUserMigration: true,
				inMaintenance: true,
			});
			this.setLoading(false);
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				this.setError(
					useApplicationError().createApplicationError(
						error.response?.status ?? 500,
						"pages.administration.school.index.error",
						error.message
					)
				);
			}
			this.setLoading(false);
		}
	}

	private get importUserApi(): UserImportApiInterface {
		return UserImportApiFactory(undefined, "/v3", $axios);
	}

	private get systemsApi(): SystemsApiInterface {
		return SystemsApiFactory(undefined, "/v3", $axios);
	}
}
