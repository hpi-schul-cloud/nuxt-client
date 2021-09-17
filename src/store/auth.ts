import {
	Module,
	VuexModule,
	Mutation,
	Action,
	getModule,
} from "vuex-module-decorators";
import { rootStore } from "./index";
import { $axios } from "../utils/api";
import EnvConfigModule from "@/store/env-config";
import SchoolsModule, { School } from "@/store/schools";

export interface User {
	_id: string;
	__v: number;
	firstName: string;
	lastName: string;
	email: string;
	updatedAt: string;
	birthday: string;
	createdAt: string;
	preferences: {};
	schoolId: string;
	roles: any[];
	emailSearchValues: string[];
	firstNameSearchValues: string[];
	lastNameSearchValues: string[];
	consent: {};
	forcePasswordChange: boolean;
	language: string;
	fullName: string;
	id: string;
	avatarInitials: string;
	avatarBackgroundColor: string;
	age: number;
	displayName: string;
	permissions: string[];
	accountId: string;
	schoolName: string;
	externallyManaged: boolean;
}

@Module({
	name: "auth",
	namespaced: true,
	dynamic: true,
	store: rootStore,
	stateFactory: true,
})
export class Auth extends VuexModule {
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
	locale: string = "de";

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

	get getLocale(): string {
		if (this.locale) {
			return this.locale;
		}
		if (SchoolsModule.getSchool && SchoolsModule.getSchool.language) {
			return SchoolsModule.getSchool.language;
		}
		if (EnvConfigModule.getEnv.I18N__DEFAULT_LANGUAGE) {
			return EnvConfigModule.getEnv.I18N__DEFAULT_LANGUAGE;
		}
		return "de";
	}

	get getSchool(): School {
		return SchoolsModule.getSchool;
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
		const user = await $axios.$get("/v1/me");
		const roles = await $axios.$get(`/v1/roles/user/${user.id}`);
		user.permissions = roles.reduce(
			(acc: any, role: any) => [...new Set(acc.concat(role.permissions))],
			[]
		);
		this.setUser(user);
		if (user.schoolId) {
			SchoolsModule.fetchSchool();
		}
		if (user.language) {
			this.setLocale(user.language);
		}

		//TODO Remove once added to User permissions SC-2401
		if (EnvConfigModule.getEnv.FEATURE_EXTENSIONS_ENABLED) {
			this.addUserPermmission("ADDONS_ENABLED");
		}
		if (EnvConfigModule.getEnv.FEATURE_TEAMS_ENABLED) {
			this.addUserPermmission("TEAMS_ENABLED");
		}
	}

	@Action
	logout(): void {
		// remove jwt from cookie
		const date = new Date();
		date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);
		document.cookie = `jwt=; expires=${date.toUTCString()}; path=/`;

		localStorage.clear();
		// Delete matrix messenger indexedDB databases
		if (indexedDB) {
			// window.indexedDB.databases() is not available in all browsers
			const databases = [
				"logs",
				"matrix-js-sdk:crypto",
				"matrix-js-sdk:riot-web-sync",
			];

			for (let i = 0; i < databases.length; i += 1) {
				indexedDB.deleteDatabase(databases[i]);
			}
		}
		this.clearAuthData();
	}
}

export default getModule(Auth);
