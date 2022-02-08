<template>
	<v-card
		class="mx-auto mb-4 lesson-card"
		max-width="100%"
		:aria-label="ariaLabel"
		:href="lessonHref(lesson.id, room.roomId)"
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
				:color="defaultColor"
			>
				{{ action.name }}</v-btn
			>
		</v-card-actions>
	</v-card>
</template>

<script>
import { fromNow } from "@plugins/datetime";
import { mdiDotsVertical } from "@mdi/js";
const lessonRequiredKeys = ["createdAt", "id", "name"];
const roomRequiredKeys = ["roomId", "displayColor"];
export default {
	components: {},
	props: {
		lesson: {
			type: Object,
			required: true,
			validator: (lesson) => lessonRequiredKeys.every((key) => key in lesson),
		},
		room: {
			type: Object,
			required: true,
			validator: (room) => roomRequiredKeys.every((key) => key in room),
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
		defaultColor(room) {
			return room.displayColor || this.defaultTitleColor;
		},
		isHidden() {
			return this.lesson.hidden;
		},
		cardActions() {
			// TODO: add i18i files
			// TODO: actions must be controled by UX
			if (this.isHidden) {
				return [
					{
						icon: "lessonSend",
						action: "action name",
						name: this.$t("pages.room.lessonCard.label.post"),
					},
				];
			}
			return [];
		},
	},
	methods: {
		lessonHref: (id, roomId) => {
			return `/courses/${roomId}/topics/${id}`;
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
</style>
