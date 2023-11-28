import {
	SystemsApiFactory,
	SystemsApiInterface,
	UserImportApiFactory,
	UserImportApiInterface,
} from "@/serverApi/v3";
import { authModule, envConfigModule } from "@/store";
import { $axios } from "@/utils/api";
import { AxiosError } from "axios";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { useApplicationError } from "../composables/application-error.composable";
import { ApplicationError } from "./types/application-error";
import { FederalState, School, Year } from "./types/schools";

/**
 * The Api expects and returns a List of Feature-names. In the Frontend it is mapped to an object indexed by the feature-names.
 * This Type represents this change to the School entity.
 */
declare type SchoolPayload = { features: string[] } & Omit<School, "features">;

const SCHOOL_FEATURES: (keyof School["features"])[] = [
	"rocketChat",
	"videoconference",
	"nextcloud",
	"studentVisibility", // deprecated
	"ldapUniventionMigrationSchool",
	"oauthProvisioningEnabled",
	"showOutdatedUsers",
	"enableLdapSyncDuringMigration",
];

function transformSchoolServerToClient(school: SchoolPayload): School {
	const featureObject: Partial<School["features"]> = {};
	SCHOOL_FEATURES.forEach((schoolFeature) => {
		if (school.features.includes(schoolFeature)) {
			featureObject[schoolFeature] = true;
		} else {
			featureObject[schoolFeature] = false;
		}
	});
	return { ...school, features: featureObject as Required<School["features"]> };
}

function transformSchoolClientToServer(school: School): SchoolPayload {
	const featureArray: string[] = [];
	SCHOOL_FEATURES.forEach((schoolFeature) => {
		if (school.features[schoolFeature]) {
			featureArray.push(schoolFeature);
		}
	});
	return { ...school, features: featureArray };
}

@Module({
	name: "schoolsModule",
	namespaced: true,
	stateFactory: true,
})
export default class SchoolsModule extends VuexModule {
	school: School = {
		_id: "",
		name: "",
		logo_name: "",
		fileStorageType: "",
		federalState: "",
		county: {
			antaresKey: "",
			_id: "",
			countyId: "",
			name: "",
			id: "",
		},
		systems: [],
		updatedAt: "",
		createdAt: "",
		currentYear: {
			_id: "",
			name: "",
			startDate: "",
			endDate: "",
		},
		purpose: "",
		features: {
			rocketChat: false,
			videoconference: false,
			studentVisibility: false,
			ldapUniventionMigrationSchool: false,
			showOutdatedUsers: false,
			enableLdapSyncDuringMigration: false,
			oauthProvisioningEnabled: false,
			nextcloud: false,
		},
		enableStudentTeamCreation: false,
		permissions: {},
		inMaintenance: false,
		inUserMigration: false,
		documentBaseDir: "",
		isExternal: false,
		id: "",
		years: {
			nextYear: {
				_id: "",
				name: "",
				startDate: "",
				endDate: "",
			},
			lastYear: {
				_id: "",
				name: "",
				startDate: "",
				endDate: "",
			},
			activeYear: {
				_id: "",
				name: "",
				startDate: "",
				endDate: "",
			},
			defaultYear: {
				_id: "",
				name: "",
				startDate: "",
				endDate: "",
			},
			schoolYears: [],
		},
		isTeamCreationByStudentsEnabled: false,
	};
	federalState: FederalState = {
		_id: "",
		counties: [],
		name: "",
		abbreviation: "",
		logoUrl: "",
	};
	systems: any[] = [];
	loading = false;
	error: null | ApplicationError = null;

	@Mutation
	setSchool(updatedSchool: School): void {
		this.school = updatedSchool;
	}

	@Mutation
	setFederalState(federalState: FederalState): void {
		this.federalState = federalState;
	}

	@Mutation
	setSystems(systems: any[]): void {
		this.systems = systems;
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

	get getCurrentYear(): Year {
		return this.school.currentYear;
	}

	get getFederalState(): FederalState {
		return this.federalState;
	}

	get getSystems(): any[] {
		return this.systems;
	}

	get getLoading(): boolean {
		return this.loading;
	}

	get getError(): ApplicationError | null {
		return this.error;
	}

	get schoolIsExternallyManaged(): boolean {
		return this.school.isExternal;
	}

	get schoolIsSynced(): boolean {
		return this.systems.some(
			(system) =>
				system.type === "tsp-school" ||
				system.type === "oauth" ||
				(system.type === "ldap" &&
					(system.ldapConfig.provider === "iserv-idm" ||
						system.ldapConfig.provider === "univention" ||
						system.ldapConfig.provider === "general"))
		);
	}

	@Action
	async fetchSchool(): Promise<void> {
		this.setLoading(true);

		if (authModule.getUser?.schoolId) {
			try {
				const school = (
					await $axios.get(`/v1/schools/${authModule.getUser?.schoolId} `)
				).data;

				this.setSchool(transformSchoolServerToClient(school));

				this.setLoading(false);
			} catch (error: unknown) {
				if (error instanceof AxiosError) {
					this.setError(
						useApplicationError().createApplicationError(
							error.response?.status ?? 500,
							"pages.administration.school.index.error"
						)
					);
				}
				this.setLoading(false);
			}
		}
	}

	@Action
	async fetchFederalState(): Promise<void> {
		this.setLoading(true);
		try {
			const data = (
				await $axios.get<FederalState>(
					`/v1/federalStates/${this.school.federalState}`
				)
			).data;

			this.setFederalState(data);
			this.setLoading(false);
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				this.setError(
					useApplicationError().createApplicationError(
						error.response?.status ?? 500,
						"pages.administration.school.index.error"
					)
				);
			}
			this.setLoading(false);
		}
	}

	@Action
	async fetchSystems(): Promise<void> {
		this.setLoading(true);
		try {
			// TODO - monitor if not checking for ldap key causes any errors in the future
			const systemIds = this.school.systems;

			const requests = systemIds.map((systemId) =>
				$axios.get(`v1/systems/${systemId}`)
			);
			const responses = await Promise.all(requests);

			this.setSystems(responses.map((response) => response.data));
			this.setLoading(false);
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				this.setError(
					useApplicationError().createApplicationError(
						error.response?.status ?? 500,
						"pages.administration.school.index.error"
					)
				);
			}
			this.setLoading(false);
		}
	}

	@Action
	async update(payload: Partial<School>): Promise<void> {
		this.setLoading(true);
		const school = transformSchoolClientToServer(payload as Required<School>);
		try {
			await $axios.patch(`/v1/schools/${school.id}`, school);
			// TODO: Patch returns old data in response since it doesn't have enough time to sync between db instances
			// Get request can be removed after https://ticketsystem.dbildungscloud.de/browse/BC-3449 (need to be retested)
			const data = (await $axios.get(`/v1/schools/${school.id}`)).data;

			this.setSchool(transformSchoolServerToClient(data));
			this.setLoading(false);
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				this.setError(
					useApplicationError().createApplicationError(
						error.response?.status ?? 500,
						"pages.administration.school.index.error"
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
			if (envConfigModule.getEnv.FEATURE_NEST_SYSTEMS_API_ENABLED) {
				await this.systemsApi.systemControllerDeleteSystem(systemId);
			} else {
				await $axios.delete(`v1/systems/${systemId}`);
			}

			const updatedSystemsList = this.systems.filter(
				(system) => system._id !== systemId
			);

			this.setSystems(updatedSystemsList);
			await this.fetchSchool();
			this.setLoading(false);
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				this.setError(
					useApplicationError().createApplicationError(
						error.response?.status ?? 500,
						"pages.administration.school.index.error"
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
						"pages.administration.school.index.error"
					)
				);
			}
			this.setLoading(false);
		}
	}

	@Action
	async setSchoolInUserMigration(
		setSchoolInUserMigration = true
	): Promise<void> {
		if (this.school.inUserMigration) {
			return;
		}
		this.setLoading(true);
		this.setError(null);
		try {
			await this.importUserApi.importUserControllerStartSchoolInUserMigration(
				setSchoolInUserMigration
			);
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
						"pages.administration.school.index.error"
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
