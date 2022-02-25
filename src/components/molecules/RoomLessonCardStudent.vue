<template>
	<v-card
		class="mx-auto mb-4 lesson-card"
		max-width="100%"
		:aria-label="ariaLabel"
		:href="lessonHref(lesson.id, room.roomId)"
		tabindex="0"
		outlined
	>
		<v-card-text>
			<div class="top-row-container mb-1">
				<div class="text-h6 title-section text--primary" tabindex="0">
					{{ lesson.name }}
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
import { mdiDotsVertical } from "@mdi/js";
const lessonRequiredKeys = ["createdAt", "id", "name"];
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
		},
		ariaLabel: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			iconStyle: { height: "20px", minWidth: "20px", width: "20px" },
			mdiDotsVertical,
			defaultTitleColor: "#54616e",
		};
	},
	computed: {
		defaultColor(room) {
			return room.displayColor || this.defaultTitleColor;
		},
		cardActions() {
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
	color: var(--color-primary);
}
.v-card {
	box-shadow: var(--shadow-sm);
	transition: box-shadow calc(var(--duration-transition-medium) * 0.5) ease-in;

	&:hover {
		box-shadow: var(--shadow-m);
	}
}
.v-card__text {
	padding-bottom: var(--space-xs-4);
}
</style>
