<template>
	<div>
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
							Abbrechen
						</base-button>
						<base-button
							design="primary"
							:disabled="!isSendEnabled"
							@click="addToLesson"
							>Hinzufügen</base-button
						>
					</template>
				</modal-footer>
			</template>
		</base-modal>
		<notification-modal
			:show-notification-modal.sync="showNotificationModal"
			:response="$store.state.content.addToLessonResult"
			:success-msg="$t('pages.content.notification.successMsg')"
			:error-msg="$t('pages.content.notification.errorMsg')"
			@close="showNotificationModal = false"
		/>
	</div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import ModalFooter from "@components/molecules/ModalFooter";
import NotificationModal from "@components/molecules/NotificationModal";

export default {
	components: {
		NotificationModal,
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
			showNotificationModal: false,
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
				lessonId: this.selectedLesson && this.selectedLesson._id,
				material: {
					title: this.title,
					client: this.client,
					url: this.url,
				},
			});
			this.showNotificationModal = true;
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
