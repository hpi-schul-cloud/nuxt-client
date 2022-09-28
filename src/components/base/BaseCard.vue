<template v-slot:default="{ hover }">
	<section v-bind="$attrs" :class="`card elevation-${hover ? 24 : 6}`">
		<header class="customcard-header">
			<slot name="header" />
		</header>
		<div class="customcard-content">
			<slot>
				<slot name="content" />
			</slot>
		</div>
		<footer class="customcard-footer">
			<slot name="footer" />
		</footer>
	</section>
</template>

<style lang="scss" scoped>
@import "@styles";

.card {
	background: #fff;
	border-radius: var(--radius-md);
}
</style>
