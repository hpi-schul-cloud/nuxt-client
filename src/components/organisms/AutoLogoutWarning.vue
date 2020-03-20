<template>
	<base-modal :active.sync="active" :on-back-drop="extendSession">
		<template v-slot:body>
			<div class="container">
				<img
					:src="getImage"
					class="sloth"
					:alt="$t('components.organisms.AutoLogoutWarning.image.alt')"
				/>
				<!-- eslint-disable-next-line -->
				<p class="sloth-text mt--xl-4" v-html="getText" />
			</div>
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
import CenterSlot from "@components/atoms/CenterSlot";

const showWarningOnRemainingSeconds =
	process.env.JWT_SHOW_TIMEOUT_WARNING_SECONDS || 3600;
const defaultRemainingTimeInSeconds =
	process.env.JWT_TIMEOUT_SECONDS || showWarningOnRemainingSeconds * 2;

export default {
	components: {
		CenterSlot,
	},
	data: () => {
		return {
			active: false,
			processing: false,
			error: false,
			remainingTimeInSeconds: defaultRemainingTimeInSeconds,
			retry: 0,
			totalRetry: 0,
			decRstIntervallSec: 20,
			updateIntervallMin: 3,
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
		this.update();
	},
	methods: {
		decRst() {
			setTimeout(() => {
				if (this.remainingTimeInSeconds >= 60) {
					this.remainingTimeInSeconds -= this.decRstIntervallSec;
					if (
						!this.processing &&
						!this.active &&
						this.remainingTimeInSeconds <= showWarningOnRemainingSeconds
					) {
						this.showAutoLogoutModal((this.error = false));
					} else if (
						this.remainingTimeInSeconds > showWarningOnRemainingSeconds
					) {
						this.activ = false;
					}
					this.decRst();
				}
			}, 1000 * this.decRstIntervallSec);
		},
		update() {
			setInterval(async () => {
				try {
					const res = await this.$store.dispatch("accounts/getTTL");
					if (res && res.ttl && Number.isInteger(res.ttl) && res.ttl > 0) {
						this.remainingTimeInSeconds = res.ttl;
					} else {
						console.error("Update remaining session time failed!");
					}
				} catch (error) {
					console.error("Update remaining session time failed!");
				}
			}, 1000 * 60 * this.updateIntervallMin);
		},
		showAutoLogoutModal() {
			this.active = true;
		},
		async extendSession() {
			this.processing = true;
			this.active = false;

			try {
				await this.$store.dispatch("accounts/resetJwtTimer");
				this.processing = false;
				this.totalRetry = 0;
				this.retry = 0;
				this.$toast.success(
					this.$t("components.organisms.AutoLogoutWarning.success")
				);
				if (this.remainingTimeInSeconds < 60) {
					this.decRst();
				}
				this.remainingTimeInSeconds = defaultRemainingTimeInSeconds;
			} catch (err) {
				if (err.response && err.response.status !== 405) {
					if (err.response && err.response.status !== 401) {
						// retry 4 times before showing error
						if (this.retry < 4) {
							this.retry += 1;
							setTimeout(() => {
								this.extendSession();
							}, 2 ** retry * 1000);
						} else {
							this.retry = 0;
							if (this.totalRetry) {
								this.$toast.error(
									this.$t("components.organisms.AutoLogoutWarning.error.retry")
								);
							} else {
								this.showAutoLogoutModal((this.error = true));
							}
							this.totalRetry += 1;
						}
					} else {
						this.$toast.error(
							this.$t("components.organisms.AutoLogoutWarning.error.401")
						);
					}
				}
			}
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
			text-align: left;
			vertical-align: middle;
		}
	}
}
</style>
