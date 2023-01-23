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
					:items="rooms"
					:label="$t('common.labels.course')"
					:rules="[rules.required]"
					:error="!selectedCourse"
				/>
			</div>
		</template>
	</v-custom-dialog>
</template>

<script type="ts">
import vCustomDialog from "@components/organisms/vCustomDialog.vue";
import { mdiInformation } from "@mdi/js";
import { defineComponent, inject, reactive, ref, onMounted } from "@vue/composition-api";
import { roomsModule } from "@/store";

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
	},
	data() {
		return {
			selectedCourse: undefined,
		};
	},
	setup(props, { emit }) {
		const i18n = inject("i18n");

		const rooms = ref([]);
		onMounted(async () => {
			await roomsModule.fetch();
			rooms.value = roomsModule.getRoomsData;
    	});

		const rules = reactive({
          required: value => !!value || i18n?.t("common.validation.required"),
		});

		const onNext = (selectedCourse) => {
			if (rules.required(selectedCourse?.id) === true) {
				emit('next', selectedCourse.id);
			}
		}
		const onCancel = () => emit('cancel')

		return {
			rooms,
			onNext,
			onCancel,
			mdiInformation,
			rules,
		};
	},
});
</script>
