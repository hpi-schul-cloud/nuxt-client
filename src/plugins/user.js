import Vue from "vue";
import { mapState } from "vuex";

export const mixin = {
	computed: mapState("auth", {
		$user: "user",
	}),
};

Vue.mixin(mixin);
