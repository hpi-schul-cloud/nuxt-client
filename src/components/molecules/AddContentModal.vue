<template>
	<div>
		<base-modal
			class="modal"
			:active="showCopyModal"
			@update:active="closeModalOutsideClick"
		>
			<template v-slot:header>
				{{ $t("components.molecules.AddContentModal") }}
			</template>
			<template v-slot:body>
				<div class="content-modal__body">
					<base-select
						v-model="selectedCourse"
						class="content-modal__body--select"
						:options="coursesOptions"
						:show-labels="true"
						:placeholder="$t('pages.content.placeholder.chooseACourse')"
						:label="$t('pages.content.label.chooseACourse')"
						close-on-select
						option-label="name"
						:deselect-label="$t('pages.content.label.deselect')"
						:select-label="$t('pages.content.label.select')"
						:selected-label="$t('pages.content.label.selected')"
						track-by="_id"
					/>
					<base-select
						v-model="selectedLesson"
						class="content-modal__body--select"
						:options="lessonsOptions"
						:label="$t('pages.content.label.chooseALessonTopic')"
						:placeholder="$t('pages.content.placeholder.chooseALessonTopic')"
						option-label="name"
						close-on-select
						:deselect-label="$t('pages.content.label.deselect')"
						:select-label="$t('pages.content.label.select')"
						:selected-label="$t('pages.content.label.selected')"
						track-by="_id"
					/>
				</div>
			</template>
			<template v-slot:footer>
				<modal-footer>
					<template v-slot:right>
						<base-button design="text" @click="closeModal">
							{{ $t("common.actions.cancel") }}
						</base-button>
						<base-button
							design="primary"
							:disabled="!isSendEnabled"
							@click="addToLesson"
							>{{ $t("common.actions.add") }}</base-button
						>
					</template>
				</modal-footer>
			</template>
		</base-modal>
	</div>
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
				this.lessons &&
				this.lessons.data &&
				this.lessons.data.map((lesson) => {
					return {
						_id: lesson._id,
						name: lesson.name,
					};
				})
			);
		},
		isSuccess() {
			const response =
				this.$store.state.content &&
				this.$store.state.content.addToLessonResult;
			return response && response.status === 201;
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
			this.$emit("close");
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
