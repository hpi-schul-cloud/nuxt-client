<template>
	<div>
		<RouterLink :to="roomPath" class="room-link">
			<div
				class="room-icon"
				:aria-label="iconAriaLabel"
				:style="{ 'background-color': iconColor }"
			>
				<span class="text-h3 text-white" data-testid="room-short-title">
					{{ room.shortTitle }}
				</span>
			</div>
			<div class="room-title mb-2 mt-2">{{ room.title }}</div>
		</RouterLink>
	</div>
</template>
<script setup lang="ts">
import { Room } from "@/types/room/Room";
import { computed, PropType } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	room: {
		type: Object as PropType<Room>,
		required: true,
	},
});

const { t } = useI18n();

const roomPath = computed(() => `/rooms/${props.room.id}`);

const iconColor = computed(() => props.room.displayColor);

const iconAriaLabel = computed(() => {
	return `${t("common.labels.room")} ${props.room.title}`;
});
</script>

<style lang="scss" scoped>
@import "@/utils/multiline-ellipsis.scss";

a.room-link {
	display: block;
	text-decoration: none;
	text-align: center;
	color: unset;
}

.room-icon {
	width: 5em;
	height: 5em;
	border-radius: 8px;
	user-select: none;
	// taken from VAvatar.sass
	flex: none;
	align-items: center;
	display: inline-flex;
	justify-content: center;
	line-height: normal;
	overflow: hidden;
	position: relative;
	text-align: center;
	transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
	transition-property: width, height;
	vertical-align: middle;
}

.room-title {
	@include excerpt(
		$font-size: calc(var(--space-base-vuetify) * 4),
		$line-height: var(--line-height-lg),
		$lines-to-show: 3
	);
}
</style>
