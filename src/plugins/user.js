import Vue from "vue";
import AuthModule from "@/store/auth";

export const mixin = {
	computed: {
		$user() {
			return AuthModule.getUser;
		},
	},
};

Vue.mixin(mixin);
