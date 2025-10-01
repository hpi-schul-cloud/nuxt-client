import { notifierModule } from "@/store";

export default {
	mounted() {
		if (!document.referrer || new URL(document.referrer).origin !== location.origin) {
			return;
		}
		const type = this.$route.query["toast-type"];
		const message = this.$route.query["toast-message"];

		if (!type || !message) {
			return;
		}

		const duration = parseInt(this.$route.query["toast-duration"] || "5000", 10);

		notifierModule.show({
			text: decodeURI(message),
			status: type,
			timeout: duration || 5000,
		});
	},
};
