<template>
	<v-breadcrumbs :items="breadcrumbs" :nuxt="true" class="ml-4 px-0 py-0">
		<template v-slot:item="{ item }">
			<v-breadcrumbs-item
				:href="item.href"
				:disabled="item.disabled"
				class="text-h6 font-weight-bold"
			>
				{{ item.text }}
			</v-breadcrumbs-item>
		</template>
		<template v-slot:divider>
			<v-icon> {{ iconMdiChevronRight }} </v-icon>
		</template>
	</v-breadcrumbs>
</template>

<script>
import { mdiChevronRight } from "@mdi/js";

export default {
	props: {
		breadcrumbs: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			iconMdiChevronRight: mdiChevronRight,
		};
	},
};
</script>
