import {
	ChangeLanguageParamsLanguageEnum,
	UserApiFactory,
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

const userApi = UserApiFactory(undefined, "/v3", $axios);
@Module({
	name: "authModule",
	namespaced: true,
	stateFactory: true,
})
export default class AuthModule extends VuexModule {
	accesToken: string | null = "";
	payload = null;
	user: User | null = {
		_id: "",
		__v: 0,
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
				__v: 2,
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
	locale: string = "de"; // TODO why are we not using I18N__FALLBACK_LANGUAGE?

	businessError: BusinessError = {
		statusCode: "",
		message: "",
	};

	status: Status = "";

	_userApi?: UserApiInterface;

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
		this.accesToken = payload;
	}

	@Mutation
	addUserPermmission(permission: string): void {
		this.user?.permissions.push(permission);
	}

	@Mutation
	clearAuthData(): void {
		this.accesToken = null;
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
		return this.accesToken;
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
		return this.accesToken || false;
	}

	// TODO - why are we using toLowerCase() on permissions here?
	get getUserPermissions() {
		return this.user?.permissions
			? this.user.permissions.map((p) => p.toLowerCase())
			: [];
	}

	get userIsExternallyManaged() {
		return !!this.user?.externallyManaged;
	}

	@Action
	async populateUser(): Promise<void> {
		const user = (await $axios.get("/v1/me")).data;
		// @ts-ignore
		const roles = (await $axios.get(`/v1/roles/user/${user.id}`)).data;

		// @ts-ignore
		user.permissions = roles.reduce(
			(acc: any, role: any) => [...new Set(acc.concat(role.permissions))],
			[]
		);
		// @ts-ignore
		this.setUser(user);
		// @ts-ignore
		if (user.schoolId) {
			schoolsModule.fetchSchool();
		}
		// @ts-ignore
		if (user.language) {
			// @ts-ignore
			this.setLocale(user.language);
		}

		//TODO Remove once added to User permissions SC-2401
		if (envConfigModule.getEnv.FEATURE_EXTENSIONS_ENABLED) {
			this.addUserPermmission("ADDONS_ENABLED");
		}
		if (envConfigModule.getEnv.FEATURE_TEAMS_ENABLED) {
			this.addUserPermmission("TEAMS_ENABLED");
		}
	}

	@Action
	async updateUserLanguage(language: ChangeLanguageParamsLanguageEnum) {
		this.resetBusinessError();
		this.setStatus("pending");
		try {
			const response = await userApi.userControllerChangeLanguage({
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
	logout(): void {
		localStorage.clear();
		// Delete matrix messenger indexedDB databases
		if (window.indexedDB) {
			// window.indexedDB.databases() is not available in all browsers
			const databases = [
				"logs",
				"matrix-js-sdk:crypto",
				"matrix-js-sdk:riot-web-sync",
			];

			for (let i = 0; i < databases.length; i += 1) {
				window.indexedDB.deleteDatabase(databases[i]);
			}
		}
		this.context.commit("clearAuthData");
		window.location.assign("/logout");
	}
}
