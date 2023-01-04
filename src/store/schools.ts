import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { $axios } from "@utils/api";
import { authModule } from "@/store";
import {
	Year,
	FederalState,
	School,
	OauthMigrationResponse,
	OauthMigrationRequest, OauthMigrationApiResponse, OauthMigrationApiRequest
} from "./types/schools";
import { UserImportApiFactory, UserImportApiInterface } from "@/serverApi/v3";
import {mapApiToOauthMigrationResponse, mapOauthMigrationRequestToApi} from "@store/school/oauth-migration.mapper";

const SCHOOL_FEATURES: any = [
	"rocketChat",
	"videoconference",
	"messenger",
	"studentVisibility", // deprecated
	"messengerSchoolRoom",
	"messengerStudentRoomCreate",
	"ldapUniventionMigrationSchool",
];

function transformSchoolServerToClient(school: any): School {
	const featureObject: any = {};
	SCHOOL_FEATURES.forEach((schoolFeature: any) => {
		if (school.features.includes(schoolFeature)) {
			featureObject[schoolFeature] = true;
		} else {
			featureObject[schoolFeature] = false;
		}
	});
	return { ...school, features: featureObject };
}

function transformSchoolClientToServer(school: any): School {
	const featureArray: any[] = [];
	SCHOOL_FEATURES.forEach((schoolFeature: any) => {
		if (school.features[schoolFeature]) {
			featureArray.push(schoolFeature);
		}
	});
	return { ...school, features: featureArray };
}

@Module({
	name: "schools",
	namespaced: true,
	stateFactory: true,
})
export default class SchoolsModule extends VuexModule {
	private _importUserApi?: UserImportApiInterface;

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
			messenger: false,
			studentVisibility: false,
			messengerSchoolRoom: false,
			messengerStudentRoomCreate: false,
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
	oauthUserMigration: boolean = false;
	oauthMigrationAvailable: boolean = false;
	oauthMigrationMandatory: boolean = false;
	migrationCompletionDate: Date | undefined = undefined;
	systems: any[] = [];
	loading: boolean = false;
	error: null | {} = null;

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
	setOauthMigration(enabled: boolean): void {
		this.oauthUserMigration = enabled;
	}

	@Mutation
	setOauthMigrationAvailable(available: boolean): void {
		this.oauthMigrationAvailable = available;
	}

	@Mutation
	setOauthMigrationMandatory(mandatory: boolean): void {
		this.oauthMigrationMandatory = mandatory;
	}

	@Mutation
	setMigrationCompletionDate(date: Date | undefined): void {
		this.migrationCompletionDate = date;
	}

	@Mutation
	setError(error: {} | null): void {
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

	get getSystems(): {} {
		return this.systems;
	}

	get getLoading(): boolean {
		return this.loading;
	}

	get getError(): {} | null {
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

	get getOauthMigration(): boolean{
		return this.oauthUserMigration;
	}

	get getOauthMigrationAvailable(): boolean{
		return this.oauthMigrationAvailable;
	}

	get getOauthMigrationMandatory(): boolean{
		return this.oauthMigrationMandatory;
	}

	get getMigrationCompletionDate(): Date | undefined{
		return this.migrationCompletionDate;
	}

	@Action
	async fetchSchool(): Promise<void> {
		this.setLoading(true);

		if (authModule.getUser?.schoolId) {
			try {
				const school = await $axios.$get(
					`/v1/schools/${authModule.getUser?.schoolId} `
				);

				this.setSchool(transformSchoolServerToClient(school));

				this.setLoading(false);
			} catch (error: any) {
				this.setError(error);
				this.setLoading(false);
				// TODO what is supposed to happen on error?
			}
		}
	}

	@Action
	async fetchFederalState(): Promise<void> {
		this.setLoading(true);
		try {
			const response = await $axios.$get(
				`/v1/federalStates/${this.school.federalState}`
			);

			this.setFederalState(response);
			this.setLoading(false);
		} catch (error: any) {
			this.setError(error);
			this.setLoading(false);
			// TODO what is supposed to happen on error?
		}
	}

	@Action
	async fetchCurrentYear(): Promise<void> {
		this.setLoading(true);
		try {
			const currentYear = await $axios.$get(
				`/v1/years/${this.school.currentYear}`
			);
			this.setCurrentYear(currentYear);
			this.setLoading(false);
		} catch (error: any) {
			this.setError(error);
			this.setLoading(false);
			// TODO what is supposed to happen on error?
		}
	}

	@Action
	async fetchSystems(): Promise<void> {
		this.setLoading(true);
		try {
			// TODO - monitor if not checking for ldap key causes any errors in the future
			const systemIds = this.school.systems;

			const requests = systemIds.map((systemId) =>
				$axios.$get(`v1/systems/${systemId}`)
			);
			const response = await Promise.all(requests);

			this.setSystems(response);
			this.setLoading(false);
		} catch (error: any) {
			this.setError(error);
			this.setLoading(false);
			// TODO what is supposed to happen on error?
		}
	}

	@Action
	async update(payload: any): Promise<void> {
		this.setLoading(true);
		const school = transformSchoolClientToServer(payload);
		try {
			const data = await $axios.$patch(`/v1/schools/${school.id}`, school);
			this.setSchool(transformSchoolServerToClient(data));
			this.setLoading(false);
		} catch (error: any) {
			this.setError(error);
			this.setLoading(false);
			// TODO what is supposed to happen on error?
		}
	}

	@Action
	async deleteSystem(systemId: string): Promise<void> {
		this.setLoading(true);
		try {
			await $axios.$delete(`v1/systems/${systemId}`);

			const updatedSystemsList = this.systems.filter(
				(system) => system._id !== systemId
			);

			this.setSystems(updatedSystemsList);
			await this.fetchSchool();
			this.setLoading(false);
		} catch (error: any) {
			this.setError(error);
			this.setLoading(false);
			// TODO what is supposed to happen on error?
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
		} catch (error: any) {
			this.setError(error);
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
		} catch (error: any) {
			this.setError(error);
			this.setLoading(false);
		}
	}

	@Action
	async fetchSchoolOAuthMigration(): Promise<void> {
		if(!this.school._id) {
			return;
		}

		try {
			const oauthMigration: OauthMigrationApiResponse = await $axios.$get(`v3/school/${this.school._id}/migration`);
			const mappedOauthMigration: OauthMigrationResponse = mapApiToOauthMigrationResponse(oauthMigration);
			this.setOauthMigration(mappedOauthMigration.enabled);
			this.setOauthMigrationAvailable(mappedOauthMigration.available);
			this.setOauthMigrationMandatory(mappedOauthMigration.mandatory);

			console.log("available: ", mappedOauthMigration.available, "mandatory: ", mappedOauthMigration.mandatory, "enabled: ", mappedOauthMigration.enabled)
		} catch (error: unknown) {
			if (error instanceof Error) {
				this.setError(error);
			}
		}
	}

	@Action
	async setSchoolOauthMigration(migrationFlags: OauthMigrationRequest): Promise<void> {
		if(!this.school._id) {
			return;
		}

		try {
			const mapOauthMigration: OauthMigrationApiRequest = mapOauthMigrationRequestToApi(migrationFlags);
			await $axios.$put(`v3/school/${this.school._id}/migration`, { oauthMigrationPossible: mapOauthMigration.oauthMigrationPossible, oauthMigrationMandatory: mapOauthMigration.oauthMigrationMandatory });
			this.setOauthMigrationAvailable(migrationFlags.available);
			this.setOauthMigrationMandatory(migrationFlags.mandatory);
		} catch (error: unknown) {
			if (error instanceof Error) {
				this.setError(error);
			}
		}
	}
	@Action
	async endMigration(): Promise<void> {
		if(!this.school._id) {
			return;
		}

		try {
			// await $axios.$post(`v3/school/${this.school._id}/end-migration`); // {available: false, mandatory, migrationCompletionDate: true}
			this.setOauthMigrationAvailable(false);
			const mappedDate = new Date();
			this.setMigrationCompletionDate(mappedDate);
		} catch (error: unknown) {
			if (error instanceof Error) {
				this.setError(error);
			}
		}
	}

	private get importUserApi(): UserImportApiInterface {
		if (!this._importUserApi) {
			this._importUserApi = UserImportApiFactory(undefined, "/v3", $axios);
		}
		return this._importUserApi;
	}
}
