<template>
	<VCard
		class="room-grid-item d-flex flex-column"
		:data-testid="`board-grid-item-${index}`"
		:ripple="false"
		variant="elevated"
	>
		<VCardItem class="flex-grow-1">
			<RouterLink tabindex="-1" :to="roomPath" class="room-link-item">
				<VBadge :model-value="room.isLocked" bordered :icon="mdiLock" :data-testid="`room-badge-lock-${index}`">
					<VAvatar rounded="lg" :class="avatarColor" class="room-grid-avatar" :data-testid="`room-avatar-${index}`">
						<span class="text-h1 text-white text-decoration-none" :data-testid="`room-short-title-${index}`">
							{{ roomShortName }}
						</span>
					</VAvatar>
				</VBadge>
				<div>
					<VCardTitle class="mb-1" :data-testid="`room--title-${index}`">
						<h2 class="text-break text-body-1 font-weight-bold ma-0">{{ room.name }}</h2>
					</VCardTitle>
					<VChip
						size="small"
						:prepend-icon="mdiAccountMultipleOutline"
						class="text-decoration-none"
						:data-testid="`room--member-count-${index}`"
					>
						{{ room.totalMembers }} {{ t("common.words.member", room.totalMembers) }}
					</VChip>
				</div>
			</RouterLink>
		</VCardItem>
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
import { mdiAccountMultipleOutline, mdiLock } from "@icons/material";
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
	color: inherit;
	text-decoration: none;

	:deep(.v-card-item__content) {
		overflow: visible;
	}

	.v-card-title {
		line-height: 1.5 !important;
		white-space: normal;
	}

	&:hover {
		.v-card-title {
			text-decoration: underline;
		}
	}
}

.room-grid-avatar {
	width: 5em;
	height: 5em;
	user-select: none;
	transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
	transition-property: width, height;
}
</style>
