<template>
	<v-card
		class="mx-auto mb-4 lesson-card"
		max-width="100%"
		:aria-label="ariaLabel"
		:href="lessonHref(lesson.id)"
		tabindex="0"
	>
		<v-card-text>
			<div class="top-row-container mb-1">
				<div class="text-h4 title-section">{{ lesson.name }}</div>
				<div class="dot-menu-section">
					<!-- Action menu to be determined with UXers-->
					<v-icon>{{ mdiDotsVertical }}</v-icon>
				</div>
			</div>
		</v-card-text>
		<v-card-actions class="pt-1">
			<v-btn
				v-for="(action, index) in cardActions"
				:key="index"
				class="action-button"
				text
			>
				{{ action.name }}</v-btn
			>
		</v-card-actions>
	</v-card>
</template>

<script>
import { fromNow } from "@plugins/datetime";
import { mdiDotsVertical } from "@mdi/js";
import RoomModule from "@store/room";
const lessonRequiredKeys = ["createdAt", "id", "name"];
export default {
	components: {},
	props: {
		lesson: {
			type: Object,
			required: true,
			validator: (lesson) => lessonRequiredKeys.every((key) => key in lesson),
		},
		ariaLabel: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			fromNow,
			iconStyle: { height: "20px", minWidth: "20px", width: "20px" },
			mdiDotsVertical: mdiDotsVertical,
			defaultTitleColor: "#54616e",
		};
	},
	computed: {
		roomData() {
			return RoomModule.getRoomData;
		},
		defaultColor() {
			return roomData.displayColor || this.defaultTitleColor;
		},
		cardActions() {
			// TODO: add i18i files
			// TODO: actions must be controled by UX
			return [
				{
					icon: "lessonSend",
					action: "action name",
					name: this.$t("pages.room.taskCard.label.post"),
				},
			];
		},
	},
	methods: {
		lessonHref: (id) => {
			return `/courses/${roomData.roomId}/topics/${id}`;
		},
	},
};
</script>

<style lang="scss" scoped>
@import "~vuetify/src/styles/styles.sass";
@import "@styles";
.top-row-container {
	display: grid;
	grid-template-columns: 95% 5%;
	align-items: center;
	.title-section {
		text-align: left;
	}
	.dot-menu-section {
		text-align: right;
	}
}
.action-button {
	/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
	color: var(--color-primary);
}

/* @media #{map-get($display-breakpoints, 'xs-only')} {
	.title-section {
		padding-left: var(--text-sm);
	}
} */
</style>
