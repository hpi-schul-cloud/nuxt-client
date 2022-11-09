<template>
	<div>
		<base-modal
			class="modal"
			:active="showCopyModal"
			@onBackdropClick="closeModal"
		>
			<template #header>{{
				$t("components.molecules.AddContentModal")
			}}</template>
			<template #body>
				<div class="content-modal__body">
					<v-select
						v-model="selectedCourse"
						:label="$t('pages.content.label.chooseACourse')"
						:items="coursesOptions"
						data-testid="topicSelector"
						@change="onCourseSelect"
					/>
					<transition name="fade">
						<v-select
							v-if="selectedCourse"
							v-model="selectedLessons"
							:label="$t('pages.content.label.chooseALessonTopic')"
							:items="lessonsOptions"
							multiple
							data-testid="courseSelector"
						/>
					</transition>
				</div>
			</template>
			<template #footer>
				<modal-footer>
					<template #right>
						<base-button design="text" @click="closeModal">{{
							$t("common.actions.cancel")
						}}</base-button>
						<base-button
							design="primary"
							:disabled="!isSendEnabled"
							data-testid="modal_submit_btn"
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
import { mapGetters } from "vuex";
import { contentModule } from "@/store";
import ModalFooter from "@/components/molecules/ModalFooter";

export default {
	components: {
		ModalFooter,
	},
	props: {
		title: { type: String, default: "" },
		url: { type: String, default: "" },
		client: { type: String, default: "Schul-Cloud" },
		merlinReference: { type: String, default: "" },
		items: { type: Array, default: () => [] },
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
			selectedCourse: "",
			selectedLessons: [],
		};
	},
	computed: {
		...mapGetters("courses", {
			coursesOptions: "getCoursesOptions",
		}),
		lessons() {
			return contentModule.getLessonsGetter;
		},
		isSendEnabled() {
			return this.selectedLessons.length !== 0;
		},
		lessonsOptions() {
			return (
				this.lessons &&
				this.lessons.data &&
				this.lessons.data.map((lesson) => {
					return {
						value: lesson._id,
						text: lesson.name,
					};
				})
			);
		},
	},
	watch: {
		selectedCourse(to, from) {
			this.selectedLessons = [];
			if (to) {
				this.findLessons(to);
			} else if (!to && !!from) {
				contentModule.clearLessons();
			}
		},
	},
	methods: {
		onCourseSelect(val) {
			if (val) contentModule.getLessons(val);
		},
		addToLesson() {
			this.$emit("close");
			const payload = this.selectedLessons.map((lesson) => {
				return {
					lessonId: lesson,
					material: {
						title: this.title,
						client: this.client,
						url: this.url,
						merlinReference: this.merlinReference,
					},
				};
			});
			contentModule.addToLesson(payload);
			this.closeModal();
		},
		closeModal() {
			this.$emit("update:show-copy-modal", false);
			this.clearState();
		},
		findLessons(courseId) {
			contentModule.getLessons(courseId);
		},
		clearState() {
			this.selectedCourse = "";
			this.selectedLessons = [];
		},
	},
};
</script>

<style lang="scss" scoped>
.modal {
	width: 100%;
}

.content-modal {
	&__body {
		min-height: 300px;
		color: var(--v-black-base) !important;

		&--select {
			margin-top: var(--space-xl);
		}
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity var(--duration-transition-slow);
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
