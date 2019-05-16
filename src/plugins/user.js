import Vue from "vue";
import { mapState, mapActions } from "vuex";

export const mixin = {
	methods: {
		...mapActions("auth", ["hasRole"]),
	},
	computed: mapState("auth", {
		$user: "user",
	}),
};

Vue.mixin(mixin);
