import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { $axios } from "@/utils/api";
import { authModule } from "@/store";
import { FederalState, OauthMigration, School, Year } from "./types/schools";
import {
	MigrationBody,
	MigrationResponse,
	SchoolApiFactory,
	SchoolApiInterface,
	UserImportApiFactory,
	UserImportApiInterface,
} from "@/serverApi/v3";
import { AxiosError, AxiosResponse } from "axios";
import { ApplicationError } from "./types/application-error";
import { useApplicationError } from "../composables/application-error.composable";

/**
 * The Api expects and returns a List of Feature-names. In the Frontend it is mapped to an object indexed by the feature-names.
 * This Type represents this change to the School entity.
 */
declare type SchoolPayload = { features: string[] } & Omit<School, "features">;

const SCHOOL_FEATURES: (keyof School["features"])[] = [
	"rocketChat",
	"videoconference",
	"studentVisibility", // deprecated
	"ldapUniventionMigrationSchool",
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
		__v: 0,
		currentYear: "",
		purpose: "",
		features: {
			rocketChat: false,
			videoconference: false,
			studentVisibility: false,
			ldapUniventionMigrationSchool: false,
		},
		enableStudentTeamCreation: false,
		permissions: {},
		inMaintenance: false,
		inUserMigration: false,
		documentBaseDir: "",
		isExternal: false,
		id: "",
		years: {},
		isTeamCreationByStudentsEnabled: false,
	};
	currentYear: Year = {
		_id: "",
		name: "",
		startDate: "",
		endDate: "",
		__v: 0,
		years: {},
		isTeamCreationByStudentsEnabled: false,
	};
	federalState: FederalState = {
		_id: "",
		counties: [],
		name: "",
		abbreviation: "",
		logoUrl: "",
		__v: 0,
	};
	oauthMigration: OauthMigration = {
		enableMigrationStart: false,
		oauthMigrationPossible: false,
		oauthMigrationMandatory: false,
		oauthMigrationFinished: "",
		oauthMigrationFinalFinish: "",
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
	setCurrentYear(currentYear: Year): void {
		this.currentYear = currentYear;
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
	setOauthMigration(state: OauthMigration): void {
		this.oauthMigration = state;
	}

	@Mutation
	setError(error: ApplicationError | null): void {
		this.error = error;
	}

	get getSchool(): School {
		return this.school;
	}

	get getCurrentYear(): Year {
		return this.currentYear;
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
				(system.type === "ldap" &&
					(system.ldapConfig.provider === "iserv-idm" ||
						system.ldapConfig.provider === "univention" ||
						system.ldapConfig.provider === "general"))
		);
	}

	get getOauthMigration(): OauthMigration {
		return this.oauthMigration;
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

				await this.fetchCurrentYear();

				this.setLoading(false);
			} catch (error: unknown) {
				if (error instanceof AxiosError) {
					this.setError(this.createApplicationError());
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
				this.setError(this.createApplicationError());
			}
			this.setLoading(false);
		}
	}

	@Action
	async fetchCurrentYear(): Promise<void> {
		this.setLoading(true);
		try {
			const currentYear = (
				await $axios.get<Year>(`/v1/years/${this.school.currentYear}`)
			).data;
			this.setCurrentYear(currentYear);
			this.setLoading(false);
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				this.setError(this.createApplicationError());
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
				this.setError(this.createApplicationError());
			}
			this.setLoading(false);
		}
	}

	@Action
	async update(payload: Partial<School>): Promise<void> {
		this.setLoading(true);
		const school = transformSchoolClientToServer(payload as Required<School>);
		try {
			const data = (await $axios.patch(`/v1/schools/${school.id}`, school))
				.data;
			this.setSchool(transformSchoolServerToClient(data));
			this.setLoading(false);
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				this.setError(this.createApplicationError());
			}
			this.setLoading(false);
		}
	}

	@Action
	async deleteSystem(systemId: string): Promise<void> {
		this.setLoading(true);
		try {
			await $axios.delete(`v1/systems/${systemId}`);

			const updatedSystemsList = this.systems.filter(
				(system) => system._id !== systemId
			);

			this.setSystems(updatedSystemsList);
			await this.fetchSchool();
			this.setLoading(false);
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				this.setError(this.createApplicationError());
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
				this.setError(this.createApplicationError());
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
				this.setError(this.createApplicationError());
			}
			this.setLoading(false);
		}
	}

	@Action
	async fetchSchoolOAuthMigration(): Promise<void> {
		if (!this.getSchool.id) {
			await this.fetchSchool();
		}

		try {
			const oauthMigration: AxiosResponse<MigrationResponse> =
				await this.schoolApi.schoolControllerGetMigration(this.getSchool.id);
			this.setOauthMigration({
				enableMigrationStart: oauthMigration.data.enableMigrationStart,
				oauthMigrationPossible: !!oauthMigration.data.oauthMigrationPossible,
				oauthMigrationMandatory: !!oauthMigration.data.oauthMigrationMandatory,
				oauthMigrationFinished: oauthMigration.data.oauthMigrationFinished,
				oauthMigrationFinalFinish:
					oauthMigration.data.oauthMigrationFinalFinish,
			});
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				this.setError(this.createApplicationError());
			}
		}
	}

	@Action
	async setSchoolOauthMigration(migrationFlags: MigrationBody): Promise<void> {
		if (!this.school._id) {
			return;
		}

		try {
			const oauthMigration: AxiosResponse<MigrationResponse> =
				await this.schoolApi.schoolControllerSetMigration(
					this.school._id,
					migrationFlags
				);
			this.setOauthMigration({
				enableMigrationStart: oauthMigration.data.enableMigrationStart,
				oauthMigrationPossible: !!oauthMigration.data.oauthMigrationPossible,
				oauthMigrationMandatory: !!oauthMigration.data.oauthMigrationMandatory,
				oauthMigrationFinished: oauthMigration.data.oauthMigrationFinished,
				oauthMigrationFinalFinish:
					oauthMigration.data.oauthMigrationFinalFinish,
			});
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				this.setError(
					useApplicationError().createApplicationError(
						error.response?.status ?? 500,
						"pages.administration.school.index.error.gracePeriodExceeded"
					)
				);
			}
		}
	}

	private get importUserApi(): UserImportApiInterface {
		return UserImportApiFactory(undefined, "/v3", $axios);
	}

	private createApplicationError(
		statusCode = 500,
		translationKey = "pages.administration.school.index.error"
	): ApplicationError {
		const applicationError = useApplicationError().createApplicationError(
			statusCode,
			translationKey
		);
		return applicationError;
	}
}
