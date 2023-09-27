<template>
	<div class="grey lighten-4">
		<v-card-title v-if="title || icon" data-testid="card-title" inactive>
			<div class="d-flex flex-no-wrap align-center text-truncate">
				<v-icon
					v-if="icon"
					color="black"
					class="mr-2"
					size="18"
					data-testid="card-title-icon"
					>{{ icon }}</v-icon
				>

				<span
					v-if="title"
					:class="spanClasses"
					data-testid="card-title-string"
					>{{ title }}</span
				>
			</div>
		</v-card-title>

		<v-card-subtitle v-if="subtitle">
			{{ subtitle }}
		</v-card-subtitle>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
	name: "CardTitle",
	props: {
		title: { type: String, required: false },
		subtitle: { type: String, required: false },
		icon: { type: String, required: false },
		shortenTitle: { type: Boolean, required: false },
	},
	setup(props) {
		const spanClasses = computed(() => {
			const marginClass = props.shortenTitle ? " mr-10" : "";
			const classes = `subtitle-1 font-weight-bold text-truncate${marginClass}`;

			return classes;
		});

		return {
			spanClasses,
		};
	},
});
</script>
