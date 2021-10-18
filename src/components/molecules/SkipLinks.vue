<template>
	<a id="skiplink" tabindex="0" class="skip-link" href="#main-content">
		{{ $t("global.skipLink.mainContent") }}
	</a>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@styles";

.skip-link {
	position: absolute;
	top: -100px;
	left: 50%;
	padding: var(--space-xs);
	color: var(--color-primary);
	background-color: var(--color-white);
	border: 1px solid #555;
	border-radius: var(--radius-xs);
}

.skip-link:focus {
	top: 10px;
}
</style>
