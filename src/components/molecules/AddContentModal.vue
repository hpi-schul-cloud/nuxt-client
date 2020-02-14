<template>
	<base-modal :active.sync="show">
		<template v-slot:header>
			Material zu Thema hinzufügen
		</template>
		<template v-slot:body>
			<div class="content-modal__body">
				<base-select
					v-model="selectedCourse"
					class="content-modal__body--select"
					:options="formattedCourses"
					label="Wahle einen Kurs / Fach"
					close-on-select
					option-label="name"
					placeholder="Wahle"
					deselect-label="Entfernen"
					select-label="Auswählen"
					selected-label="Aktiv"
					track-by="_id"
				/>
				<base-select
					v-model="selectedLesson"
					class="content-modal__body--select"
					:options="options"
					label="Wahle ein Unterrichtsthema"
					option-label="name"
					close-on-select
					placeholder=""
					deselect-label="Entfernen"
					select-label="Auswählen"
					selected-label="Aktiv"
					track-by="_id"
				/>
			</div>
		</template>
		<template v-slot:footer>
			<default-modal-footer>
				<template v-slot:right>
					<base-button @click="closeModal">
						Abbrechen
					</base-button>
					<base-button design="outline" @click="closeModal">
						Senden</base-button
					>
				</template>
			</default-modal-footer>
		</template>
	</base-modal>
</template>

<script>
import { mapGetters } from "vuex";
import DefaultModalFooter from "@components/molecules/ModalFooterActions";

export default {
	components: {
		DefaultModalFooter,
	},
	props: {
		show: {
			type: Boolean,
			required: true,
		},
	},
	data() {
		return {
			options: [
				{ _id: 1, value: 1, name: "Option 1" },
				{ _id: 2, value: 2, name: "Option 2" },
				{ _id: 3, value: 3, name: "Option 3" },
			],
			selectedCourse: {},
			selectedLesson: {},
		};
	},
	computed: {
		...mapGetters("courses", {
			courses: "list",
			course: "current",
		}),
		...mapGetters("lessons", {}),
		filteredCourses() {
			return this.courses.filter((course) => course.isArchived !== "false");
		},
		formattedCourses() {
			return this.filteredCourses.map((course) => {
				return {
					_id: course._id,
					name: course.name,
				};
			});
		},
	},
	created(ctx) {
		this.findCourses();
	},
	methods: {
		closeModal() {
			this.$emit("update:show", false);
			this.getCourse();
			this.getLesson();
		},
		findCourses() {
			this.$store.dispatch("courses/find");
		},
		getCourse() {
			this.$store.dispatch("courses/get", this.formattedCourses[0]._id);
		},
		getLesson() {
			this.$store.dispatch("lessons/find", {
				query: {
					courseId: this.formattedCourses[0]._id,
				},
			});
			// this.$store.dispatch("lessons/find", this.formattedCourses[0].id);
		},
	},
};
</script>

<style lang="scss" scoped>
.content-modal {
	&__body {
		min-height: 300px;
		color: var(--color-black) !important;
		&--select {
			margin-top: var(--space-sm);
		}
	}
}
</style>
