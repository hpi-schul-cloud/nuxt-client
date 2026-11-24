<template>
	<VCard
		class="room-grid-item d-flex flex-column"
		:data-testid="`board-grid-item-${index}`"
		:data-room-id="room.id"
		:ripple="false"
		variant="elevated"
	>
		<VCardItem class="d-block flex-grow-1" :class="{ 'room-grid-item__content--with-menu': isArrangeMenuVisible }">
			<RouterLink tabindex="-1" :to="roomPath" class="room-link-item overflow-visible">
				<VBadge :model-value="room.isLocked" bordered :icon="mdiLock" :data-testid="`room-badge-lock-${index}`">
					<VAvatar rounded="lg" :class="avatarColor" class="room-grid-avatar" :data-testid="`room-avatar-${index}`">
						<span class="text-h1 text-white text-decoration-none" :data-testid="`room-short-title-${index}`">
							{{ roomShortName }}
						</span>
					</VAvatar>
				</VBadge>
				<div>
					<VCardTitle class="mb-1" :data-testid="`room--title-${index}`">
						<component :is="titleTag" class="text-break text-body-1 font-weight-bold ma-0">{{ room.name }}</component>
					</VCardTitle>
					<div class="d-flex ga-2">
						<VChip
							size="small"
							:prepend-icon="mdiAccountMultipleOutline"
							class="text-decoration-none"
							:data-testid="`room--member-count-${index}`"
						>
							{{ room.totalMembers }} {{ t("common.words.member", room.totalMembers) }}
						</VChip>
						<VChip
							v-if="isExternalSchool"
							size="small"
							class="text-decoration-none"
							:data-testid="`room--external-school-${index}`"
						>
							{{ t("common.words.external") }}
						</VChip>
					</div>
				</div>
			</RouterLink>
			<div v-if="isArrangeMenuVisible" class="room-card-menu">
				<KebabMenu
					data-testid="room-card-menu"
					:aria-label="t('pages.rooms.groups.roomMenu.ariaLabel', { name: room.name })"
				>
					<KebabMenuAction
						v-if="canMoveToGroup"
						:icon="mdiFolderMoveOutline"
						:disabled="arrangeDisabled"
						data-testid="room-card-menu-move-to-group"
						@click="emit('move-to-group')"
					>
						{{ t("pages.rooms.groups.roomMenu.moveToGroup") }}
					</KebabMenuAction>
					<KebabMenuAction
						:icon="mdiArrowLeft"
						:disabled="!canMoveEarlier"
						data-testid="room-card-menu-move-earlier"
						@click="emit('move-earlier')"
					>
						{{ t("pages.rooms.groups.roomMenu.moveEarlier") }}
					</KebabMenuAction>
					<KebabMenuAction
						:icon="mdiArrowRight"
						:disabled="!canMoveLater"
						data-testid="room-card-menu-move-later"
						@click="emit('move-later')"
					>
						{{ t("pages.rooms.groups.roomMenu.moveLater") }}
					</KebabMenuAction>
				</KebabMenu>
			</div>
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
import { useSchoolStoreRefs } from "@data-app";
import { mdiAccountMultipleOutline, mdiArrowLeft, mdiArrowRight, mdiFolderMoveOutline, mdiLock } from "@icons/material";
import { KebabMenu, KebabMenuAction } from "@ui-kebab-menu";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const props = withDefaults(
	defineProps<{
		room: RoomItem;
		index: number;
		showArrangeMenu?: boolean;
		canMoveEarlier?: boolean;
		canMoveLater?: boolean;
		/** Arranging is temporarily not possible, e.g. while another change is being saved. */
		arrangeDisabled?: boolean;
		titleTag?: "h2" | "h3";
		/** False when there is no other section to move to, so the move dialog would be a dead end. */
		canMoveToGroup?: boolean;
	}>(),
	{
		showArrangeMenu: false,
		canMoveEarlier: false,
		canMoveLater: false,
		arrangeDisabled: false,
		titleTag: "h2",
		canMoveToGroup: true,
	}
);

const emit = defineEmits<{
	"move-to-group": [];
	"move-earlier": [];
	"move-later": [];
}>();

const { t } = useI18n();

const { schoolDetails } = useSchoolStoreRefs();

const isExternalSchool = computed(() => schoolDetails.value?.id !== props.room.schoolId);

const roomPath = computed(() => `/rooms/${props.room.id}`);
const roomShortName = computed(() => props.room?.name?.slice(0, 2) ?? "");
const avatarColor = computed(() => `room-color--${props.room.color}`);
const roomAriaLabel = computed(() => `${t("common.labels.room")} ${props.room.name}`);
const isArrangeMenuVisible = computed(
	() => props.showArrangeMenu && props.room.allowedOperations?.arrangeRooms === true
);
</script>

<style lang="scss" scoped>
.room-grid-item:focus-within {
	outline: auto;
}

:deep(.v-card-item__content) {
	overflow: visible;
}

.room-link-item {
	display: flex;
	flex-direction: row;
	gap: 16px;
	color: inherit;
	text-decoration: none;

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

.room-grid-item__content--with-menu {
	padding-inline-end: 48px;
}

.room-card-menu {
	position: absolute;
	inset-block-start: 8px;
	inset-inline-end: 4px;
}

.room-grid-avatar {
	width: 5em;
	height: 5em;
	user-select: none;
	transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
	transition-property: width, height;
}
</style>
