<template>
	<VCard class="room-grid-item d-flex flex-column" :data-testid="`board-grid-item-${index}`" variant="elevated">
		<VCardTitle
			class="text-body-1 flex-grow-1"
			style="max-width: max-content"
			:data-testid="`board-grid-title-${index}`"
		>
			<RouterLink tabindex="-1" :to="roomPath" class="room-link-item">
				<VBadge bordered :model-value="room.isLocked" :icon="mdiLock" :data-testid="`room-badge-lock-${index}`">
					<div class="room-grid-icon" :class="avatarColor">
						<span class="text-h1 text-white text-decoration-none" :data-testid="`room-short-title-${index}`">
							{{ roomShortName }}
						</span>
					</div>
				</VBadge>

				<span class="text-break" :data-testid="`room--title-${index}`">
					{{ room.name }}
				</span>
			</RouterLink>
		</VCardTitle>

		<VCardActions class="justify-end pr-4">
			<VBtn
				:data-testid="`room-open-button-${index}`"
				:disabled="room.isLocked"
				variant="text"
				color="primary"
				:to="roomPath"
				:aria-label="roomAriaLabel"
			>
				{{ t("pages.room.boardCard.label.openItem") }}
			</VBtn>
		</VCardActions>
	</VCard>
</template>

<script setup lang="ts">
import { RoomItem } from "@/types/room/Room";
import { mdiLock } from "@icons/material";
import { computed, PropType } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	room: {
		type: Object as PropType<RoomItem>,
		required: true,
	},
	index: { type: Number, required: true },
});

const { t } = useI18n();

const roomPath = computed(() => `/rooms/${props.room.id}`);
const roomShortName = computed(() => props.room?.name?.slice(0, 2) ?? "");
const avatarColor = computed(() => `room-color--${props.room.color}`);
const roomAriaLabel = computed(() => `${t("common.labels.room")} ${props.room.name}`);
</script>

<style lang="scss" scoped>
.room-grid-item:focus-within {
	outline: auto;
}

.room-link-item {
	display: flex;
	flex-direction: row;
	gap: 16px;
	white-space: normal;
	color: inherit;
	text-decoration: none;
	line-height: 1.5 !important;
}

.room-link-item:hover span {
	text-decoration: underline;
}

.room-grid-icon {
	width: 5em;
	height: 5em;
	border-radius: 8px;
	user-select: none;
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
</style>
