<template>
	<base-modal :active.sync="active" :on-back-drop="extendSession">
		<template v-slot:header></template>
		<template v-slot:body>
			<div class="container">
				<img :src="getImage" class="sloth" alt="Faultier" />
				<!-- eslint-disable-next-line -->
				<p class="sloth-text" v-html="getText" />
			</div>
		</template>
		<template v-slot:footer>
			<center-slot class="mb--md">
				<base-button design="danger" @click="extendSession">{{
					$t("components.organisms.AutoLogoutWarning.confirm")
				}}</base-button>
			</center-slot>
		</template>
	</base-modal>
</template>
<script>
// import ModalBodyInfo from "@components/molecules/ModalBodyInfo";
import CenterSlot from "@components/atoms/CenterSlot";

let timeOnStart = Date.now(); // timestamp on script load
const showWarningOnRemainingSeconds =
	process.env.JWT_SHOW_TIMEOUT_WARNING_SECONDS;
const deafultRemainingTimeInSeconds = process.env.JWT_TIMEOUT_SECONDS || 120;

let processing = false;
let totalRetry = 0;
let retry = 0;

export default {
	components: {
		// ModalBodyInfo,
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
		getText() {
			if (this.error) {
				return this.$t("components.organisms.AutoLogoutWarning.error");
			} else {
				const remainingTime = this.$tc(
					"components.organisms.AutoLogoutWarning.warning.remainingTime",
					this.remainingTimeInMinutes,
					{
						remainingTime: this.remainingTimeInMinutes,
					}
				);
				return this.$t("components.organisms.AutoLogoutWarning.warning", {
					remainingTime,
				});
			}
		},
		getImage() {
			if (this.error)
				return "https://s3.hidrive.strato.com/schul-cloud-hpi/images/Sloth_error.svg";
			return "https://s3.hidrive.strato.com/schul-cloud-hpi/images/Sloth.svg";
		},
	},
	mounted() {
		this.decRst();
		this.showAutoLogoutModal((this.error = false));
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
					} else {
						//this.active = false;
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
					.catch(() => {
						console.error("Update remaining session time failed!");
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
					if (err.response && err.response.status !== 405) {
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
					} else {
						console.warn("This feature is disabled on this instance!");
					}
				});
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.container {
	width: 100%;
	height: 100%;
	text-align: center;

	.sloth {
		display: inline-block;
		width: 35%;
		min-width: 150px;
		vertical-align: top;

		@include breakpoint(tablet) {
			float: right;
		}
	}

	.sloth-text {
		display: inline-block;
		width: 100%;
		font-size: var(--text-lg);

		@include breakpoint(tablet) {
			width: 60%;
			/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
			margin-top: 4em;
			text-align: left;
			vertical-align: middle;
		}
	}
}
</style>
