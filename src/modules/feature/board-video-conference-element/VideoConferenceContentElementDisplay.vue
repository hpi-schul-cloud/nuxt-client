<template>
	<div
		data-testid="board-video-conference-element"
		ref="videoConferenceContentElementDisplay"
		tabindex="-1"
	>
		<ContentElementBar
			:hasGreyBackground="true"
			:icon="mdiVideo"
			:has-row-style="isSmallOrLargerListBoard"
			@click.stop="onClick"
		>
			<template #display>
				<div
					v-if="!isRunning && canJoin && !canStart"
					class="mt-2"
					data-testId="vc-info-box-show"
				>
					<v-alert
						density="compact"
						class="ma-0"
						type="info"
						data-testId="vc-info-box"
					>
						<div class="d-flex flex-wrap gap-4">
							<span class="flex-1 my-auto">
								{{
									hasPermission
										? t("pages.videoConference.info.notStarted")
										: t("pages.videoConference.info.noPermission")
								}}
							</span>
						</div>
					</v-alert>
				</div>
				<v-img :src="imageSrc" alt="" cover />
			</template>
			<template #title>
				{{ title }}
			</template>
			<template #menu v-if="isEditMode">
				<slot />
			</template>
			<template #logo>
				<div
					v-if="isRunning && hasParticipationPermission"
					class="pulsating-dot my-auto"
				/>
			</template>
		</ContentElementBar>
	</div>
</template>

<script setup lang="ts">
import image from "@/assets/img/videoConference.svg";
import { computed, ref } from "vue";
import { mdiVideo } from "@icons/material";
import { ContentElementBar } from "@ui-board";
import { injectStrict } from "@/utils/inject";
import { useDisplay } from "vuetify";
import { BOARD_IS_LIST_LAYOUT } from "@util-board";
import { useI18n } from "vue-i18n";

const emit = defineEmits(["click", "refresh"]);

const imageSrc = image;

const props = defineProps({
	canJoin: {
		type: Boolean,
		required: true,
	},
	canStart: {
		type: Boolean,
		required: true,
	},
	hasParticipationPermission: {
		type: Boolean,
		required: true,
	},
	isEditMode: { type: Boolean, required: true },
	isRunning: {
		type: Boolean,
		required: true,
	},
	title: {
		type: String,
		require: true,
	},
	url: {
		type: String,
		required: true,
	},
});

const videoConferenceContentElementDisplay = ref(null);

const { t } = useI18n();

const isListLayout = ref(injectStrict(BOARD_IS_LIST_LAYOUT));
const { smAndUp } = useDisplay();

const isSmallOrLargerListBoard = computed(() => {
	return smAndUp.value && isListLayout.value;
});

const onClick = () => {
	if (!props.isRunning && props.canJoin && !props.canStart) {
		emit("refresh");
	} else if (props.canStart) {
		emit("click");
	}
};
</script>

<style lang="scss" scoped>
a {
	text-decoration: none;
}
.menu {
	position: absolute;
	right: 10px;
	top: 10px;
	z-index: 100;
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

	@media (prefers-reduced-motion: reduce) {
		animation: none;
	}
}
</style>
