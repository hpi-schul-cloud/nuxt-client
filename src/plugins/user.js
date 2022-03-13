import Vue from "vue";
import { authModule } from "@/store";

export const mixin = {
	computed: {
		$user() {
			return authModule.getUser;
		},
	},
};

Vue.mixin(mixin);
