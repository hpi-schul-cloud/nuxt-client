<template>
	<room-base-card
		:title="videoConferenceTitle"
		:logo-url="logoUrl"
		test-id="vc-card"
		@click="onClick"
	>
		<template v-slot:right>
			<div
				v-if="isRunning && hasPermission"
				class="pulsating-dot my-auto"
			></div>
		</template>
		<template v-slot:footer>
			<div v-show="!isRunning" class="mt-2">
				<v-alert dense text class="ma-0" type="info">
					<div class="d-flex flex-wrap gap-4">
						<span class="flex-1">
							Die Video Konferenz wurde noch nicht gestartet oder du hast nicht
							die berechtigung dies zu sehen.
						</span>
						<v-btn
							class="my-auto"
							outlined
							color="secondary"
							:disabled="isRefreshing"
							@click.stop="refreshVideoConferenceStatus"
							data-testId="refresh-btn"
							aria-label="Status aktualisieren"
						>
							<span>Status aktualisieren</span>
						</v-btn>
					</div>
				</v-alert>
			</div>
		</template>
	</room-base-card>
</template>

<script lang="ts">
import { I18N_KEY, injectStrict } from "@/utils/inject";
import { mdiReload, mdiLoading } from "@mdi/js";
import { defineComponent, ComputedRef, computed } from "vue";
import RoomBaseCard from "./RoomBaseCard.vue";

export default defineComponent({
	components: { RoomBaseCard },
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

		const t = (key: string): string => i18n.tc(key, 0);

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

		const videoConferenceTitle: ComputedRef<string> = computed(() => {
			return t("pages.videoConference.title.running");
		});

		return {
			t,
			onClick,
			mdiReload,
			mdiLoading,
			logoUrl,
			refreshVideoConferenceStatus,
			videoConferenceTitle,
		};
	},
});
</script>

<style lang="scss" scoped>
.v-alert {
	::v-deep .v-icon {
		margin-top: auto;
		margin-bottom: auto;
	}
}

.gap-4 {
	gap: 4px;
}

.flex-1 {
	flex: 1;
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
</style>
