import Vue from "vue";
import { mapGetters } from "vuex";

export const mixin = {
	computed: mapGetters("auth", {
		$user: "getUser",
	}),
};

Vue.mixin(mixin);
