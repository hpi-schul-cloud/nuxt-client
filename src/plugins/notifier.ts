import Vue from "vue";
import { notifierModule } from "@/store";

export const notifierMixin = {
	methods: {
		$notifier(payload = {}) {
			notifierModule.show({ ...payload });
		},
	},
};

Vue.mixin(notifierMixin);
