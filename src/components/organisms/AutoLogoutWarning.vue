<template>
	<base-modal v-model:active="active">
		<template #body>
			<div class="wrapper">
				<img
					:src="getImage"
					class="sloth"
					role="presentation"
					:alt="$t('components.organisms.AutoLogoutWarning.image.alt')"
				/>
				<RenderHTML class="sloth-text" :html="getText" component="p" />
			</div>
		</template>
		<template #footer>
			<div class="d-flex justify-center align-center mb-4">
				<v-btn color="primary" variant="flat" @click="extendSession">
					{{ $t("components.organisms.AutoLogoutWarning.confirm") }}
				</v-btn>
			</div>
		</template>
	</base-modal>
</template>

<script>
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { RenderHTML } from "@feature-render-html";

const toast = {
	error401: -1,
	error: 0,
	success: 1,
};

export default {
	components: {
		RenderHTML,
	},
	inject: {
		autoLogoutModule: { from: "autoLogoutModule" },
		notifierModule: { from: NOTIFIER_MODULE_KEY },
	},
	computed: {
		remainingTimeInMinutes() {
			return Math.max(Math.floor(this.remainingTimeInSeconds / 60), 0);
		},
		getText() {
			if (this.error) {
				return this.$t("components.organisms.AutoLogoutWarning.error");
			} else {
				const remainingTime = this.$t(
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
				return "https://s3.hidrive.strato.com/cloud-instances/images/Sloth_error.svg";
			return "https://s3.hidrive.strato.com/cloud-instances/images/Sloth.svg";
		},
		active: {
			get() {
				return this.autoLogoutModule.getActive;
			},
			set(value) {
				if (!value) {
					this.extendSession();
				}
			},
		},
		error() {
			return this.autoLogoutModule.getError;
		},
		remainingTimeInSeconds() {
			return this.autoLogoutModule.getRemainingTimeInSeconds;
		},
		toastValue() {
			return this.autoLogoutModule.getToastValue;
		},
	},
	watch: {
		toastValue(value) {
			this.showToast(value);
		},
	},
	created() {
		this.autoLogoutModule.init();
	},
	methods: {
		extendSession() {
			this.autoLogoutModule.extendSessionAction();
		},
		showToast(state) {
			switch (state) {
				case toast.success:
					this.notifierModule.show({
						text: this.$t("components.organisms.AutoLogoutWarning.success"),
						status: "success",
						timeout: 5000,
					});
					break;

				case toast.error:
					this.notifierModule.show({
						text: this.$t("components.organisms.AutoLogoutWarning.error.retry"),
						status: "error",
						timeout: 5000,
					});
					break;

				case toast.error401:
					this.notifierModule.show({
						text: this.$t("components.organisms.AutoLogoutWarning.error.401"),
						status: "error",
						timeout: 5000,
					});
					break;

				default:
					break;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixins";

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
