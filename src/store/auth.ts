import {
	ChangeLanguageParamsLanguageEnum,
	UserApiFactory,
	UserApiInterface,
} from "@/serverApi/v3";
import { envConfigModule, schoolsModule } from "@/store";
import { User } from "@/store/types/auth";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { $axios } from "../utils/api";
import { BusinessError, Status } from "./types/commons";
import { School } from "./types/schools";

const setCookie = (cname: string, cvalue: string, exdays: number) => {
	const d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	const expires = "expires=" + d.toUTCString();
	document.cookie = `${cname}=${cvalue}; Expires=${expires}; Secure; SameSite=None`;
};

@Module({
	name: "authModule",
	namespaced: true,
	stateFactory: true,
})
export default class AuthModule extends VuexModule {
	accessToken: string | null = "";
	payload = null;
	user: User | null = {
		_id: "",
		firstName: "",
		lastName: "",
		email: "",
		updatedAt: "",
		birthday: "",
		createdAt: "",
		preferences: {},
		schoolId: "",
		roles: [
			{
				_id: "",
				name: "",
				updatedAt: "",
				createdAt: "",
				roles: [],
				permissions: [],
				displayName: "",
				id: "",
			},
		],
		emailSearchValues: [],
		firstNameSearchValues: [],
		lastNameSearchValues: [],
		consent: {
			userConsent: {
				form: "",
				privacyConsent: true,
				termsOfUseConsent: true,
				dateOfPrivacyConsent: "",
				dateOfTermsOfUseConsent: "",
			},
		},
		forcePasswordChange: false,
		language: "",
		fullName: "",
		id: "",
		avatarInitials: "",
		avatarBackgroundColor: "",
		age: 44,
		displayName: "",
		permissions: [],
		accountId: "",
		schoolName: "",
		externallyManaged: false,
	};
	publicPages: string[] = ["index", "login", "signup", "impressum"];
	locale = "de"; // TODO why are we not using I18N__FALLBACK_LANGUAGE?

	businessError: BusinessError = {
		statusCode: "",
		message: "",
	};

	status: Status = "";

	@Mutation
	setUser(user: User): void {
		this.user = user;
	}

	@Mutation
	setLocale(locale: string): void {
		this.locale = locale;
	}

	@Mutation
	setAccessToken(payload: string): void {
		this.accessToken = payload;
	}

	@Mutation
	addUserPermmission(permission: string): void {
		this.user?.permissions.push(permission);
	}

	@Mutation
	clearAuthData(): void {
		this.accessToken = null;
		this.user = null;
	}

	@Mutation
	setStatus(status: Status): void {
		this.status = status;
	}

	@Mutation
	setBusinessError(businessError: BusinessError): void {
		this.businessError = businessError;
	}

	@Mutation
	resetBusinessError(): void {
		this.businessError = {
			statusCode: "",
			message: "",
		};
	}

	get getLocale(): string {
		if (this.locale) {
			return this.locale;
		}
		if (schoolsModule.getSchool && schoolsModule.getSchool.language) {
			return schoolsModule.getSchool.language;
		}
		if (envConfigModule.getEnv.I18N__DEFAULT_LANGUAGE) {
			return envConfigModule.getEnv.I18N__DEFAULT_LANGUAGE;
		}
		return "de"; // TODO why are we not using I18N__FALLBACK_LANGUAGE?
	}

	get getSchool(): School {
		return schoolsModule.getSchool;
	}

	get getUser(): User | null {
		return this.user;
	}

	get getAccessToken(): string | null {
		return this.accessToken;
	}

	get getUserRoles(): string[] {
		return this.user?.roles
			? this.user.roles.map((r) => r.name.toLowerCase())
			: [];
	}

	get getUserRolesDisplayName(): string | string[] {
		return this.user?.roles ? this.user.roles.map((r) => r.displayName) : [];
	}

	get getAuthenticated(): string | boolean {
		return this.accessToken || false;
	}

	// TODO - why are we using toLowerCase() on permissions here?
	get getUserPermissions(): string[] {
		return this.user?.permissions
			? this.user.permissions.map((p) => p.toLowerCase())
			: [];
	}

	get userIsExternallyManaged() {
		return !!this.user?.externallyManaged;
	}

	get isLoggedIn(): boolean {
		return !!this.accessToken;
	}

	// @Action
	// async populateUser(): Promise<void> {
	// 	const user = (await $axios.get("/v1/me")).data;
	// 	// @ts-ignore
	// 	const roles = (await $axios.get(`/v1/roles/user/${user.id}`)).data;

	// 	// @ts-ignore
	// 	user.permissions = roles.reduce(
	// 		(acc: any, role: any) => [...new Set(acc.concat(role.permissions))],
	// 		[]
	// 	);
	// 	// @ts-ignore
	// 	this.setUser(user);
	// 	// @ts-ignore
	// 	if (user.schoolId) {
	// 		schoolsModule.fetchSchool();
	// 	}
	// 	// @ts-ignore
	// 	if (user.language) {
	// 		// @ts-ignore
	// 		this.setLocale(user.language);
	// 	}

	// 	//TODO Remove once added to User permissions SC-2401
	// 	if (envConfigModule.getEnv.FEATURE_EXTENSIONS_ENABLED) {
	// 		this.addUserPermmission("ADDONS_ENABLED");
	// 	}
	// 	if (envConfigModule.getEnv.FEATURE_TEAMS_ENABLED) {
	// 		this.addUserPermmission("TEAMS_ENABLED");
	// 	}
	// }

	@Action
	async login(jwt: string) {
		const user: User | undefined = await $axios.get("/v1/me").then(
			(resp) => resp.data,
			() => undefined
		);

		if (user === undefined) {
			this.clearAuthData();
			return;
		}

		const roles: { permissions: string[] }[] = (
			await $axios.get(`/v1/roles/user/${user.id}`)
		).data;

		user.permissions = roles.reduce(
			(acc, role) => [...new Set(acc.concat(role.permissions))],
			[] as string[]
		);
		this.setUser(user);

		if (user.schoolId) {
			await schoolsModule.fetchSchool();
		}
		if (user.language) {
			this.setLocale(user.language);
		}

		//TODO Remove once added to User permissions SC-2401
		if (envConfigModule.getEnv.FEATURE_EXTENSIONS_ENABLED) {
			this.addUserPermmission("ADDONS_ENABLED");
		}
		if (envConfigModule.getEnv.FEATURE_TEAMS_ENABLED) {
			this.addUserPermmission("TEAMS_ENABLED");
		}

		// isLoggedIn => true
		this.setAccessToken(jwt);
	}

	@Action
	async updateUserLanguage(language: ChangeLanguageParamsLanguageEnum) {
		this.resetBusinessError();
		this.setStatus("pending");
		try {
			const response = await this.userApi.userControllerChangeLanguage({
				language,
			});
			if (response.data.successful === true) {
				this.setLocale(language);
				setCookie("USER_LANG", language, 30);
			}
		} catch (error) {
			this.setBusinessError(error as BusinessError);
			this.setStatus("error");
		}
	}

	@Action
	logout(redirectUrl = "/logout"): void {
		localStorage.clear();
		delete $axios.defaults.headers.common["Authorization"];
		window.location.replace(redirectUrl);
	}

	private get userApi(): UserApiInterface {
		return UserApiFactory(
			undefined,
			"/v3", //`${EnvConfigModule.getApiUrl}/v3`,
			$axios
		);
	}
}
