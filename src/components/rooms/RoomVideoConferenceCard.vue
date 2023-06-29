<template>
	<v-card
		class="card"
		max-width="100%"
		:aria-label="
			t('pages.videoConference.title') + ` (${videoConferenceStatusText})`
		"
		hover
		@click="onClick"
	>
		<div class="logo-container">
			<v-img
				class="mx-auto logo"
				:src="logoUrl"
				contain
				data-testid="vc-card-logo"
				:alt="$t('pages.rooms.tools.logo')"
			/>
		</div>
		<h5 class="title my-auto">{{ t("pages.videoConference.title") }}</h5>
		<div class="mx-auto"></div>
		<div v-if="hasPermission" class="ml-1 my-auto">
			<div v-if="isRunning">
				<div class="pulsating-dot"></div>
			</div>
			<div v-else class="ml-1 my-auto">
				<v-btn
					icon
					:aria-label="t('pages.videoConference.action.refresh')"
					@click.stop="refreshVideoConferenceStatus"
				>
					<v-icon :class="{ spin: isRefreshing }">{{ mdiReload }}</v-icon>
				</v-btn>
			</div>
		</div>
	</v-card>
</template>

<script lang="ts">
import { I18N_KEY, injectStrict } from "@/utils/inject";
import { mdiReload } from "@mdi/js";
import { defineComponent, ComputedRef, computed } from "vue";

export default defineComponent({
	emits: ["click", "refresh"],
	props: {
		isRunning: {
			type: Boolean,
			required: true,
		},
		hasPermission: {
			type: Boolean,
			required: true,
		},
		isRefreshing: {
			type: Boolean,
			required: true,
		},
	},
	setup(props, { emit }) {
		const i18n = injectStrict(I18N_KEY);

		const t = (key: string): string => i18n.tc(key, 0) || key;

		const refreshVideoConferenceStatus = () => {
			emit("refresh");
		};

		const onClick = () => {
			emit("click");
		};

		const logoUrl: ComputedRef<string> = computed(() => {
			if (!props.hasPermission) {
				return require("@/assets/img/bbb/no_permission.png");
			} else if (props.isRunning) {
				return require("@/assets/img/bbb/available.png");
			} else {
				return require("@/assets/img/bbb/not_started.png");
			}
		});

		const videoConferenceStatusText: ComputedRef<string> = computed(() => {
			if (!props.hasPermission) {
				return t("pages.videoConference.status.noPermission");
			} else if (props.isRunning) {
				return t("pages.videoConference.status.running");
			} else {
				return t("pages.videoConference.status.not_running");
			}
		});

		return {
			t,
			onClick,
			mdiReload,
			logoUrl,
			refreshVideoConferenceStatus,
			videoConferenceStatusText,
		};
	},
});
</script>

<style lang="scss" scoped>
.card {
	display: flex;
	align-content: center;
	height: 100px;
	padding: 16px;
}

.title {
	overflow: hidden;
	max-height: 100%;
}

.logo-container {
	margin-right: 16px;
	max-width: 160px;
	height: 100%;
}

@media only screen and (max-width: 749px) {
	.logo-container {
		max-width: 68px;
	}
}

@media only screen and (max-width: 399px) {
	.logo-container {
		display: none;
	}
}

.logo {
	max-width: 140px;
	height: 100%;
	width: auto;
}

.no-wrap {
	flex-shrink: 0;
}

$pulseIconColor: #15ba97;

.pulsating-dot {
	background: $pulseIconColor;
	border-radius: 50%;
	height: 20px;
	width: 20px;
	margin: 10px;
	box-shadow: 0 0 0 0 $pulseIconColor;
	transform: scale(1);
	animation: pulse 1.5s infinite;
}

@keyframes pulse {
	0% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 $pulseIconColor;
	}
	70% {
		transform: scale(1);
		box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
	}
	100% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
	}
}

.spin {
	animation: spin 1s linear infinite;
}

@keyframes spin {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>
