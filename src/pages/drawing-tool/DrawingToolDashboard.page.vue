<template>
	<div class="d-flex flex-column">
		<p>TLDRAW</p>
		<a :href="`http://localhost:3046/${$route.params.id}`" target="_blank">
			NEW WINDOW
		</a>
		<iframe
			:src="`http://localhost:3046/${$route.params.id}`"
			width="600px"
			height="600px"
		></iframe>
	</div>
</template>

<style lang="scss" scoped></style>
