<template>
	<v-list subheader two-line>
		<v-subheader v-if="title && isListFilled()" class="subtitle-1">
			{{ title }}
		</v-subheader>
		<template v-if="status === 'pending'">
			<v-skeleton-loader type="text" :max-width="'15%'" />
			<v-skeleton-loader
				v-for="homework of 4"
				ref="skeleton"
				:key="homework"
				:type="'list-item-avatar-two-line'"
			/>
		</template>

		<template
			v-for="(homework, index) of homeworks"
			v-else-if="type === 'student'"
		>
			<v-homework-item-student :key="index" :homework="homework" />
			<v-divider
				v-if="index < homeworks.length - 1"
				:key="`divider-${index}`"
			/>
		</template>

		<template
			v-for="(homework, index) of homeworks"
			v-else-if="type === 'teacher'"
		>
			<v-homework-item-teacher :key="index" :homework="homework" />
			<v-divider
				v-if="index < homeworks.length - 1"
				:key="`divider-${index}`"
			/>
		</template>
	</v-list>
</template>

<script>
import VHomeworkItemStudent from "@components/molecules/vHomeworkItemStudent";
import VHomeworkItemTeacher from "@components/molecules/vHomeworkItemTeacher";
import { mapGetters } from "vuex";

export default {
	components: { VHomeworkItemStudent, VHomeworkItemTeacher },
	props: {
		homeworks: {
			type: Array,
			required: false,
			default: () => [],
		},
		title: {
			type: String,
			required: false,
			default: null,
		},
		type: {
			type: String,
			required: true,
			validator: (value) => ["student", "teacher"].includes(value),
		},
	},
	computed: {
		...mapGetters("homeworks", {
			status: "getStatus",
		}),
	},
	methods: {
		isListFilled() {
			return this.status === "completed" && this.homeworks.length > 0;
		},
	},
};
</script>
