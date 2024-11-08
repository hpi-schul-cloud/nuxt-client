import {
	LanguageType,
	MeApiFactory,
	MeApiInterface,
	MeResponse,
	MeSchoolResponse,
	MeUserResponse,
	UserApiFactory,
	UserApiInterface,
} from "@/serverApi/v3";
import { envConfigModule, schoolsModule } from "@/store";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { $axios } from "../utils/api";
import { BusinessError, Status } from "./types/commons";

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
	me?: MeResponse;
	publicPages: string[] = ["index", "login", "signup", "impressum"];
	locale?: LanguageType;

	businessError: BusinessError = {
		statusCode: "",
		message: "",
	};

	status: Status = "";

	private get meApi(): MeApiInterface {
		return MeApiFactory(undefined, "/v3", $axios);
	}

	private get userApi(): UserApiInterface {
		return UserApiFactory(undefined, "/v3", $axios);
	}

	@Mutation
	setMe(me: MeResponse): void {
		this.locale = me.language;
		this.me = me;
	}

	@Mutation
	setLocale(locale: LanguageType): void {
		this.locale = locale;
	}

	@Mutation
	setAccessToken(payload: string): void {
		this.accessToken = payload;
	}

	@Mutation
	addUserPermission(permission: string): void {
		this.me?.permissions.push(permission);
	}

	@Mutation
	clearAuthData(): void {
		this.accessToken = null;
		this.me = undefined;
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
		if (envConfigModule.getEnv.I18N__DEFAULT_LANGUAGE) {
			return envConfigModule.getEnv.I18N__DEFAULT_LANGUAGE;
		}
		return LanguageType.De; // TODO why are we not using I18N__FALLBACK_LANGUAGE?
	}

	get getMe(): MeResponse | undefined {
		return this.me;
	}

	get getUser(): MeUserResponse | undefined {
		return this.me?.user;
	}

	get getSchool(): MeSchoolResponse | undefined {
		return this.me?.school;
	}

	get getAccessToken(): string | null {
		return this.accessToken;
	}

	get getUserRoles(): string[] {
		const roleNames = this.me?.roles.map((r) => r.name.toLowerCase());

		return roleNames ?? [];
	}

	get getAuthenticated(): string | boolean {
		return this.accessToken || false;
	}

	// TODO - why are we using toLowerCase() on permissions here?
	get getUserPermissions(): string[] {
		const permissions = this.me?.permissions.map((p) => p.toLowerCase());

		return permissions ?? [];
	}

	get isLoggedIn(): boolean {
		return !!this.accessToken;
	}

	@Action
	async login(jwt: string) {
		const { data } = await this.meApi.meControllerMe();

		this.setMe(data);

		// There are several places in the app, where more school data is needed, than is included in the MeResponse (e.g. on school admin page).
		// It is not easily possible to fetch it there when needed. That's why it is fetched here centrally.
		await schoolsModule.fetchSchool();

		//TODO Remove once added to User permissions SC-2401
		if (envConfigModule.getEnv.FEATURE_EXTENSIONS_ENABLED) {
			this.addUserPermission("ADDONS_ENABLED");
		}
		if (envConfigModule.getEnv.FEATURE_TEAMS_ENABLED) {
			this.addUserPermission("TEAMS_ENABLED");
		}

		this.setAccessToken(jwt);
	}

	@Action
	async updateUserLanguage(language: LanguageType) {
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

	@Action
	externalLogout(redirectUrl = "/logout/external"): void {
		window.location.replace(redirectUrl);
	}
}
