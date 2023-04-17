<template>
	<div>
		<v-select
			v-model="select"
			:items="visibilityOptions"
			item-value="value"
			item-text="text"
			filled
			attach
			:menu-props="{ bottom: true, offsetY: true }"
			:label="$t('common.labels.visibility')"
			validate-on-blur
			:rules="[rules.required]"
			@change="handleChange"
		/>
		<date-time-picker
			v-if="select === 'visibleAt'"
			class="mb-4"
			required
			:date-time="dateTime"
			:minDate="minDate"
			:maxDate="maxDate"
			:date-input-label="t('components.organisms.FormNews.label.date')"
			:time-input-label="t('components.organisms.FormNews.label.time')"
			@input="handleDateTimeInput"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, inject } from "vue";
import VueI18n from "vue-i18n";
import { VisibleState, VisibilityOption } from "./types/visibilty";
import DateTimePicker from "@/components/date-time-picker/DateTimePicker.vue";
import { isInPast } from "@/plugins/datetime";

export default defineComponent({
	name: "VisibilitySelector",
	components: {
		DateTimePicker,
	},
	props: {
		value: { type: String, default: "" },
		minDate: { type: String },
		maxDate: { type: String },
	},
	emits: ["input"],
	setup(props, { emit }) {
		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
		if (!i18n) {
			throw new Error("Injection of dependencies failed");
		}
		const t = (key: string) => {
			const translateResult = i18n.t(key);
			if (typeof translateResult === "string") {
				return translateResult;
			}
			return "unknown translation-key:" + key;
		};

		const initialSelect = () => {
			if (props.value === "") {
				return "notVisible";
			}
			if (isInPast(props.value)) {
				return "visible";
			}
			return "visibleAt";
		};

		const select = ref<VisibleState>(initialSelect());
		const dateTime = ref(props.value);

		const visibilityOptions = ref<VisibilityOption[]>([
			{
				text: t("common.labels.visible"),
				value: "visible",
			},
			{
				text: t("common.labels.notVisible"),
				value: "notVisible",
			},
			{
				text: t("common.labels.visibleAt"),
				value: "visibleAt",
			},
		]);

		const rules = {
			required: (value: string) => !!value || t("common.validation.required"),
		};

		const handleChange = (option: VisibleState) => {
			if (option === "notVisible") {
				emit("input", "");
			}
			if (option === "visible") {
				emit("input", new Date().toISOString());
			}
		};

		const handleDateTimeInput = (dateTime: string) => {
			emit("input", dateTime);
		};

		return {
			rules,
			select,
			dateTime,
			visibilityOptions,
			t,
			handleChange,
			handleDateTimeInput,
		};
	},
});
</script>
