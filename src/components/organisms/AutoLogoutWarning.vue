<template>
	<base-modal :active="active" @onBackdropClick="extendSession">
		<template v-slot:body>
			<div class="wrapper">
				<img
					:src="getImage"
					class="sloth"
					role="presentation"
					:alt="$t('components.organisms.AutoLogoutWarning.image.alt')"
				/>
				<!-- eslint-disable-next-line -->
				<p class="sloth-text" v-html="getText" />
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
import AutoLogoutModule from "@/store/autoLogout";

const toast = {
	error401: -1,
	error: 0,
	success: 1,
};

export default {
	components: {
		CenterSlot,
	},
	computed: {
		remainingTimeInMinutes() {
			return Math.max(Math.floor(this.remainingTimeInSeconds / 60), 0);
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
		active() {
			return AutoLogoutModule.getActive;
		},
		error() {
			return AutoLogoutModule.getError;
		},
		remainingTimeInSeconds() {
			return AutoLogoutModule.getRemainingTimeInSeconds;
		},
		toastValue() {
			this.showToast(AutoLogoutModule.getToastValue);
			return AutoLogoutModule.getToastValue;
		},
	},
	created(ctx) {
		AutoLogoutModule.init();
	},
	methods: {
		extendSession() {
			AutoLogoutModule.extendSessionAction();
		},
		showToast(state) {
			switch (state) {
				case toast.success:
					this.$toast.success(
						this.$t("components.organisms.AutoLogoutWarning.success")
					);
					break;

				case toast.error:
					this.$toast.error(
						this.$t("components.organisms.AutoLogoutWarning.error.retry")
					);
					break;

				case toast.error401:
					this.$toast.error(
						this.$t("components.organisms.AutoLogoutWarning.error.401")
					);
					break;

				default:
					break;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.wrapper {
	width: 100%;
	height: 100%;
	text-align: center;

	.sloth {
		display: inline-block;
		width: 35%;
		min-width: 150px;
		vertical-align: top;
		opacity: 0.9;

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
			margin-top: var(--space-xl-4);
			text-align: left;
			vertical-align: middle;
		}
	}
}
</style>
