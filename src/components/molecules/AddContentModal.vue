<template>
	<div>
		<base-modal
			class="modal"
			:active="showCopyModal"
			@onBackdropClick="closeModal"
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
						:label="$t('pages.content.label.chooseACourse')"
						placeholder=""
						close-on-select
						option-label="name"
						:deselect-label="$t('pages.content.label.deselect')"
						:select-label="$t('pages.content.label.select')"
						:selected-label="$t('pages.content.label.selected')"
						track-by="_id"
					/>
					<transition name="fade">
						<base-select
							v-if="!!(selectedCourse || {})._id"
							v-model="selectedLesson"
							class="content-modal__body--select"
							:options="lessonsOptions"
							:label="$t('pages.content.label.chooseALessonTopic')"
							option-label="name"
							close-on-select
							:placeholder="
								(lessonsOptions || []).length === 0
									? $t('pages.content.placeholder.noLessonTopic')
									: ''
							"
							:deselect-label="$t('pages.content.label.deselect')"
							:select-label="$t('pages.content.label.select')"
							:selected-label="$t('pages.content.label.selected')"
							track-by="_id"
						/>
					</transition>
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
			return (this.selectedLesson || {})._id !== undefined;
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
	},
	watch: {
		selectedCourse(to, from) {
			this.selectedLesson = {};
			if (to) {
				this.findLessons(to);
			} else if (!to && !!from) {
				this.$store.commit("content/clearLessons");
			}
		},
	},
	methods: {
		closeModal() {
			this.$emit("update:show-copy-modal", false);
			this.clearState();
		},
		addToLesson() {
			this.$emit("close");
			this.$store.dispatch("content/addToLesson", {
				lessonId: this.selectedLesson._id,
				material: {
					title: this.title,
					client: this.client,
					url: this.url,
					merlinReference: this.$parent.getMerlinReference,
				},
				event: this.$eventBus,
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

.fade-enter-active,
.fade-leave-active {
	transition: opacity var(--duration-transition-slow);
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
