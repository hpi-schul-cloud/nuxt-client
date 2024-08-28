<template>
	<div>
		<RouterLink :to="roomPath" class="room-link">
			<v-avatar
				:color="avatarColor"
				:aria-label="avatarAriaLabel"
				rounded="lg"
				size="5em"
				data-testid="room-icon"
			>
				<span class="text-h3 text-white" data-testid="room-short-title">
					{{ room.shortTitle }}
				</span>
			</v-avatar>
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

const avatarColor = computed(() => props.room.displayColor);

const avatarAriaLabel = computed(() => {
	return `${t("common.labels.room")} ${props.room.title}`;
});
</script>

<style lang="scss" scoped>
@import "@/utils/multiline-ellipsis.scss";

a.room-link {
	display: block;
	text-decoration: none;
	text-align: center;
	color: rgba(var(--v-theme-primary));
}

.room-title {
	@include excerpt(
		$font-size: calc(var(--space-base-vuetify) * 4),
		$line-height: var(--line-height-lg),
		$lines-to-show: 3
	);
}
</style>
