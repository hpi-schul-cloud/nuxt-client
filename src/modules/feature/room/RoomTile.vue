<template>
	<RouterLink :to="roomPath" class="room-link" :aria-label="avatarAriaLabel">
		<div class="room-avatar" :class="avatarColor">
			<span class="text-h3 text-white" data-testid="room-short-title">
				{{ roomShortName }}
			</span>
		</div>
		<div class="room-title mb-2 mt-2" data-testid="room-title">
			{{ room.name }}
		</div>
	</RouterLink>
</template>

<script setup lang="ts">
import { RoomItem } from "@/types/room/Room";
import { computed, PropType } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	room: {
		type: Object as PropType<RoomItem>,
		required: true,
	},
});

const { t } = useI18n();

const roomPath = computed(() => `/rooms/${props.room.id}`);

const roomShortName = computed(() => {
	if (props.room) {
		return props.room.name.length > 2
			? props.room.name.slice(0, 2)
			: props.room.name;
	}
	return "";
});

const avatarColor = computed(() => `room-color--${props.room.color}`);

const avatarAriaLabel = computed(() => {
	return `${t("common.labels.room")} ${props.room.name}`;
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

.room-avatar {
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
