<template>
	<div class="mt-16">
		<v-empty-state :headline="headline" :title="title" :text="text">
			<template #media>
				<div aria-hidden="true">
					<slot name="media" aria-hidden="true" />
				</div>
			</template>
		</v-empty-state>
	</div>
</template>

<script setup lang="ts">
defineProps({
	headline: {
		type: String,
		default: "",
	},
	title: {
		type: String,
		default: "",
	},
	text: {
		type: String,
		default: "",
	},
});
</script>
