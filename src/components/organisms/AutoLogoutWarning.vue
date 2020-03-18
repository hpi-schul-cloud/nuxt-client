<template>
	<base-modal :active.sync="active" :on-back-drop="extendSession">
		<template v-slot:header></template>
		<template v-slot:body>
			<modal-body-info :title="getTitle">
				<template v-slot:icon>
					<base-icon
						source="material"
						icon="report_problem"
						style="color: var(--color-danger)"
					/>
				</template>
			</modal-body-info>
		</template>
		<template v-slot:footer>
			<center-slot class="mb--md">
				<base-button design="primary" @click="extendSession">{{
					$t("components.organisms.AutoLogoutWarning.confirm")
				}}</base-button>
			</center-slot>
		</template>
	</base-modal>
</template>
<script>
import ModalBodyInfo from "@components/molecules/ModalBodyInfo";
import CenterSlot from "@components/atoms/CenterSlot";

let timeOnStart = Date.now(); // timestamp on script load
const showWarningOnRemainingSeconds = 60;
const deafultRemainingTimeInSeconds =
	process.env.JWT_TIMEOUT_SECONDS || showWarningOnRemainingSeconds * 2;

let processing = false;
let totalRetry = 0;
let retry = 0;

export default {
	components: {
		ModalBodyInfo,
		CenterSlot,
	},
	data: () => {
		return {
			active: false,
			error: false,
			remainingTimeInSeconds: deafultRemainingTimeInSeconds,
		};
	},
	computed: {
		remainingTimeInMinutes() {
			return Math.floor(this.remainingTimeInSeconds / 60);
		},
		getTitle() {
			if (this.error)
				return this.$t("components.organisms.AutoLogoutWarning.error");
			return this.$t("components.organisms.AutoLogoutWarning.warning", {
				remainingTime: this.remainingTimeInMinutes,
			});
		},
		getImage() {
			if (this.error)
				return "https://s3.hidrive.strato.com/schul-cloud-hpi/images/Sloth_error.svg";
			return "https://s3.hidrive.strato.com/schul-cloud-hpi/images/Sloth.svg";
		},
	},
	mounted() {
		this.decRst();
		// this.update();
	},
	methods: {
		decRst() {
			setTimeout(() => {
				if (this.remainingTimeInSeconds >= 60) {
					this.remainingTimeInSeconds = Math.max(
						0,
						deafultRemainingTimeInSeconds -
							Math.floor((Date.now() - timeOnStart) / 1000)
					);
					if (
						!processing &&
						!this.active &&
						this.remainingTimeInSeconds <= showWarningOnRemainingSeconds
					) {
						this.showAutoLogoutModal((this.error = false));
					}

					this.decRst();
				}
			}, 1000 * 20);
		},
		update() {
			setInterval(async () => {
				await this.$store
					.dispatch("accounts/getTTL")
					.then((res) => {
						if (res && res.ttl && Number.isInteger(res.ttl) && res.ttl > 0) {
							this.remainingTimeInSeconds = res.ttl;
						} else {
							console.error("Update remaining session time failed!");
						}
					})
					.catch((err) => {
						console.error(err);
					});
			}, 1000 * 30);
		},
		showAutoLogoutModal() {
			this.active = true;
		},
		async extendSession() {
			processing = true;
			this.active = false;

			await this.$store
				.dispatch("accounts/resetJwtTimer")
				.then(() => {
					processing = false;
					totalRetry = 0;
					retry = 0;
					timeOnStart = Date.now();
					this.$toast.success(
						this.$t("components.organisms.AutoLogoutWarning.success")
					);
					if (this.remainingTimeInSeconds < 60) {
						this.decRst();
					}
					this.remainingTimeInSeconds = deafultRemainingTimeInSeconds;
				})
				.catch((err) => {
					if (err.response && err.response.status !== 408) {
						if (err.response && err.response.status !== 401) {
							// retry 4 times before showing error
							if (retry < 4) {
								retry += 1;
								setTimeout(() => {
									this.extendSession();
								}, 2 ** retry * 1000);
							} else {
								retry = 0;
								if (totalRetry) {
									this.$toast.error(
										this.$t(
											"components.organisms.AutoLogoutWarning.error.retry"
										)
									);
								} else {
									this.showAutoLogoutModal((this.error = true));
								}
								totalRetry += 1;
							}
						} else {
							this.$toast.error(
								this.$t("components.organisms.AutoLogoutWarning.error.401")
							);
						}
					}
				});
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
