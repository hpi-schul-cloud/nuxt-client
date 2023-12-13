import {
	SchoolApiFactory,
	SchoolApiInterface,
	SchoolFeature,
	SchoolResponse,
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
declare type SchoolPayload = {
	features: string[];
	enableStudentTeamCreation: boolean;
} & Omit<School, "features">;

const SCHOOL_FEATURES = Object.values(SchoolFeature);

function transformSchoolServerToClient(school: SchoolResponse): School {
	const featureObject: Partial<School["features"]> = {};

	SCHOOL_FEATURES.forEach((schoolFeature) => {
		if (school.features?.includes(schoolFeature)) {
			featureObject[schoolFeature] = true;
		} else {
			featureObject[schoolFeature] = false;
		}
	});

	return { ...school, features: featureObject as Required<School["features"]> };
}

function transformSchoolClientToServer(school: School): SchoolPayload {
	const features: string[] = [];
	let enableStudentTeamCreation = false;

	SCHOOL_FEATURES.forEach((schoolFeature) => {
		// This extra check for isTeamCreationByStudentsEnabled is needed for compatibility with api/v1.
		// It can be removed when PATCH school is migrated to api/v3.
		if (schoolFeature === "isTeamCreationByStudentsEnabled") {
			enableStudentTeamCreation = true;
		} else if (school.features[schoolFeature]) {
			features.push(schoolFeature);
		}
	});

	return { ...school, enableStudentTeamCreation, features };
}

@Module({
	name: "schoolsModule",
	namespaced: true,
	stateFactory: true,
})
export default class SchoolsModule extends VuexModule {
	school: School = {
		id: "",
		name: "",
		logo_name: "",
		fileStorageType: "",
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
		},
		purpose: "",
		features: {
			rocketChat: false,
			videoconference: false,
			studentVisibility: false,
			ldapUniventionMigrationSchool: false,
			showOutdatedUsers: false,
			enableLdapSyncDuringMigration: false,
			isTeamCreationByStudentsEnabled: false,
			oauthProvisioningEnabled: false,
			nextcloud: false,
		},
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
			},
			lastYear: {
				id: "",
				name: "",
				startDate: "",
				endDate: "",
			},
			activeYear: {
				id: "",
				name: "",
				startDate: "",
				endDate: "",
			},
			schoolYears: [],
		},
	};
	systems: any[] = [];
	loading = false;
	error: null | ApplicationError = null;

	private get schoolApi(): SchoolApiInterface {
		return SchoolApiFactory(undefined, "v3", $axios);
	}

	@Mutation
	setSchool(updatedSchool: School): void {
		this.school = updatedSchool;
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

	get getCurrentYear(): Year | undefined {
		return this.school.currentYear;
	}

	get getFederalState(): FederalState {
		return this.school.federalState;
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
					await this.schoolApi.schoolControllerGetSchoolById(
						authModule.getUser?.schoolId
					)
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
	async fetchSystems(): Promise<void> {
		this.setLoading(true);
		try {
			// TODO - monitor if not checking for ldap key causes any errors in the future
			const systemIds = this.school.systemIds;

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
			const data = (
				await this.schoolApi.schoolControllerGetSchoolById(school.id)
			).data;

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
