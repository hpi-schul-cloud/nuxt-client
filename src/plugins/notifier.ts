import Vue from "vue";
import { notifierModule } from "@/store";
import { AlertPayload } from "@/store/types/alert-payload";

export const notifierMixin = {
	methods: {
		$notifier(payload: AlertPayload) {
			notifierModule.show({ ...payload });
		},
	},
};

Vue.mixin(notifierMixin);
