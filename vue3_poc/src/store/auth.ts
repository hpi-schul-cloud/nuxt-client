import { defineStore } from "pinia";

interface AuthStoreState {
	accessToken: string | undefined;
}

export const useAuthStore = defineStore("auth", {
	state: (): AuthStoreState => {
		return {
			accessToken: undefined,
		};
	},

	actions: {
		setAccessToken(acessToken: string | undefined): void {
			this.accessToken = acessToken;
		},

		logout(): void {
			this.accessToken = undefined;
		},
	},

	getters: {
		getAccessToken(): string | undefined {
			return this.accessToken;
		},

		isLoggedIn(): boolean {
			return this.accessToken !== undefined;
		},
	},
});
