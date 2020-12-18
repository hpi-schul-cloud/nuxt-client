import Vue from "vue";
import { BaseDialog } from ".";

declare module "vue/types/vue" {
	interface Vue {
		$dialog: typeof BaseDialog;
	}
}
