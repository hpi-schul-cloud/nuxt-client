<template>
	<v-custom-dialog
		ref="dialog"
		:is-open="isOpen"
		:size="480"
		has-buttons
		:buttons="['cancel', 'next']"
		@next="onNext(selectedCourse)"
		@dialog-canceled="onCancel"
	>
		<div slot="title" ref="textTitle" class="text-h4 my-2">
			{{ $t(`components.molecules.import.${parentType}.options.title`) }}
		</div>

		<template slot="content">
			<div>
				<div
					class="d-flex flex-row pa-2 mb-4 rounded blue lighten-5 background"
				>
					<div class="mx-2">
						<v-icon class="blue--text text--darken-1">{{
							mdiInformation
						}}</v-icon>
					</div>
					<div>
						{{
							$t(
								`components.molecules.import.${parentType}.options.selectCourse`
							)
						}}
					</div>
				</div>
				<v-select
					v-model="selectedCourse"
					return-object
					item-value="id"
					item-text="title"
					:items="courses"
					:placeholder="$t('pages.content.label.choose')"
					:rules="[rules.required]"
					:error="showError()"
					:hint="$t('common.labels.course')"
					persistent-hint
					:append-icon="mdiTriangleSmallDown"
					:menu-props="{ bottom: true, offsetY: true, nudgeBottom: 28 }"
				/>
			</div>
		</template>
	</v-custom-dialog>
</template>

<script type="ts">
import vCustomDialog from "@components/organisms/vCustomDialog.vue";
import { mdiInformation, mdiTriangleSmallDown } from "@mdi/js";
import { defineComponent, inject, reactive, ref } from "@vue/composition-api";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "SelectCourseModal",
	components: {
		vCustomDialog,
	},
	emits: ["import", "cancel"],
	props: {
		isOpen: { type: Boolean },
		parentName: { type: String, required: true },
		parentType: { type: String, required: true },
		courses: { type:Array, required: true }
	},
	setup(props, { emit }) {
		const i18n = inject("i18n");

		const selectedCourse = ref(undefined);

		const showErrorOnEmpty = ref(false);
		const showError = () => !(selectedCourse.value) && showErrorOnEmpty.value;

		const rules = reactive({
          required: value => !!value || i18n?.t("common.validation.required"),
		});

		const onNext = () => {
			showErrorOnEmpty.value = true;
			const id = selectedCourse.value?.id;
			if (rules.required(id) === true) {
				emit('next', id);
			}
		}
		const onCancel = () => emit('cancel')

		return {
			onNext,
			onCancel,
			mdiInformation,
			mdiTriangleSmallDown,
			rules,
			showError,
			selectedCourse
		};
	},
});
</script>
