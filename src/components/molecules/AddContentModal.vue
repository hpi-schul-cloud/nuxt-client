<template>
	<base-modal
		class="modal"
		:active="showCopyModal"
		@update:active="closeModalOutsideClick"
	>
		<template v-slot:header>
			Material zu Thema hinzufügen
		</template>
		<template v-slot:body>
			<div class="content-modal__body">
				<base-select
					v-model="selectedCourse"
					class="content-modal__body--select"
					:options="coursesOptions"
					:show-labels="true"
					placeholder="Mathe 5b"
					label="Wahle ein Unterrichtsthema"
					close-on-select
					option-label="name"
					deselect-label="Entfernen"
					select-label="Auswählen"
					selected-label="Aktiv"
					track-by="_id"
				/>
				<base-select
					v-model="selectedLesson"
					class="content-modal__body--select"
					:options="lessonsOptions"
					label="Wahle ein Unterrichtsthema"
					option-label="name"
					close-on-select
					placeholder="Pythagoras"
					deselect-label="Entfernen"
					select-label="Auswählen"
					selected-label="Aktiv"
					track-by="_id"
				/>
			</div>
		</template>
		<template v-slot:footer>
			<modal-footer>
				<template v-slot:right>
					<base-button design="text" @click="closeModal">
						Abbrechen
					</base-button>
					<base-button :disabled="!isSendEnabled" @click="addToLesson"
						>Senden</base-button
					>
				</template>
			</modal-footer>
		</template>
	</base-modal>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import ModalFooter from "@components/molecules/ModalFooter";

export default {
	components: {
		ModalFooter,
	},
	props: {
		title: { type: String, default: "" },
		url: { type: String, default: "" },
		client: { type: String, default: "Schul-Cloud" },

		showCopyModal: {
			type: Boolean,
			required: true,
		},
		contentid: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			selectedCourse: {},
			selectedLesson: {},
		};
	},
	computed: {
		...mapGetters("courses", {
			courses: "list",
		}),
		...mapState("content", {
			lessons: (state) => {
				return state.lessons;
			},
		}),
		isSendEnabled() {
			return this.selectedLesson._id !== undefined;
		},
		coursesOptions() {
			return this.courses
				.filter((course) => course.isArchived === false)
				.map((course) => {
					return {
						_id: course._id,
						name: course.name,
					};
				});
		},
		lessonsOptions() {
			return (
				this.lessons.data &&
				this.lessons.data.map((lesson) => {
					return {
						_id: lesson._id,
						name: lesson.name,
					};
				})
			);
		},
	},
	watch: {
		selectedCourse(to, from) {
			this.selectedLesson = {};
			if (to) {
				this.findLessons(to);
			}
		},
	},
	methods: {
		closeModal() {
			this.$emit("update:show-copy-modal", false);
			this.clearState();
		},
		closeModalOutsideClick(active) {
			if (!active) this.closeModal();
		},
		addToLesson() {
			this.$store.dispatch("content/addToLesson", {
				lessonId: this.selectedLesson._id,
				material: {
					title: this.title,
					client: this.client,
					url: this.url,
				},
			});
			this.closeModal();
		},
		findLessons(course) {
			this.$store.dispatch("content/getLessons", course._id);
		},
		clearState() {
			this.selectedCourse = {};
			this.selectedLesson = {};
		},
	},
};
</script>

<style lang="scss" scoped>
.modal {
	width: 300px;
}
.content-modal {
	&__body {
		min-height: 300px;
		color: var(--color-black) !important;
		&--select {
			margin-top: var(--space-xl);
		}
	}
}
</style>
