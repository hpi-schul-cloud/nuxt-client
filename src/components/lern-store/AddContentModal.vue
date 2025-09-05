<template>
	<div>
		<base-modal v-model:active="showModal" class="modal">
			<template #header>
				{{ $t("components.molecules.AddContentModal") }}
			</template>
			<template #body>
				<div class="content-modal__body">
					<v-select
						v-model="selectedCourse"
						return-object
						item-value="_id"
						item-title="name"
						:items="coursesOptions"
						:label="$t('pages.content.label.chooseACourse')"
						data-testid="topicSelector"
					/>
					<transition name="fade">
						<v-select
							v-show="!!(selectedCourse || {})._id"
							v-model="selectedLesson"
							return-object
							item-value="_id"
							item-title="name"
							:items="lessonsOptions"
							:label="$t('pages.content.label.chooseALessonTopic')"
							:no-data-text="$t('pages.content.placeholder.noLessonTopic')"
							data-testid="courseSelector"
						/>
					</transition>
				</div>
			</template>
			<template #footer>
				<modal-footer>
					<template #right>
						<v-btn variant="text" @click="closeModal">
							{{ $t("common.actions.cancel") }}
						</v-btn>
						<v-btn
							color="primary"
							variant="flat"
							:disabled="!isSendEnabled"
							data-testid="modal_submit_btn"
							@click="addToLesson"
						>
							{{ $t("common.actions.add") }}
						</v-btn>
					</template>
				</modal-footer>
			</template>
		</base-modal>
	</div>
</template>

<script>
import ModalFooter from "@/components/molecules/ModalFooter.vue";
import { contentModule } from "@/store";
import { mapGetters } from "vuex";
import BaseModal from "../base/BaseModal.vue";

export default {
	components: {
		ModalFooter,
		BaseModal,
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
	emits: ["update:show-copy-modal", "close"],
	data() {
		return {
			selectedCourse: undefined,
			selectedLesson: undefined,
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
			return this.selectedLesson?._id !== undefined;
		},
		lessonsOptions() {
			return this.lessons?.data?.map((lesson) => {
				return {
					_id: lesson._id,
					name: lesson.name,
				};
			});
		},
		showModal: {
			get() {
				return this.showCopyModal;
			},
			set(value) {
				if (!value) {
					this.closeModal();
				}
			},
		},
	},
	watch: {
		selectedCourse(to, from) {
			this.selectedLesson = undefined;
			if (to) {
				this.findLessons(to);
			} else if (!to && !!from) {
				contentModule.clearLessons();
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
			const payload = {
				lessonId: this.selectedLesson._id,
				event: this.$eventBus,
				material: [],
			};
			if (this.items.length > 0) {
				this.items.forEach((element) => {
					payload.material.push({
						title: element.title,
						client: element.client,
						url: element.url,
						merlinReference: element.merlinReference,
					});
				});
			} else {
				payload.material = {
					title: this.title,
					client: this.client,
					url: this.url,
					merlinReference: this.merlinReference,
				};
			}
			contentModule.addToLesson(payload);
			this.closeModal();
		},
		findLessons(course) {
			contentModule.getLessons(course._id);
		},
		clearState() {
			this.selectedCourse = undefined;
			this.selectedLesson = undefined;
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
		&--select {
			margin-top: 32px;
		}
	}
}
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.9s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
