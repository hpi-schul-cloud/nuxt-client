<template>
	<div class="edusharing-footer">
		<div class="edusharing-footer__text">
			{{ $t("components.molecules.EdusharingFooter.text") }}
		</div>
		<img
			class="edusharing-footer__logo"
			src="@/assets/img/edusharing/edusharing-logo.svg"
			:alt="$t('components.molecules.EdusharingFooter.img_alt')"
		/>
	</div>
</template>

<style lang="scss">
@use "@/styles/mixins" as *;

.edusharing-footer {
	display: flex;
	justify-content: center;
	width: 100%;
	margin-top: var(--space-lg);

	@include breakpoint(tablet) {
		margin-top: var(--space-xl);
	}

	&__text {
		margin-top: var(--space-xl-2);
		margin-right: var(--space-sm);
		font-size: var(--text-sm);
	}

	&__logo {
		width: 100px;
		height: 40px;
		margin-top: calc(15 * var(--border-width));
	}
}
</style>
