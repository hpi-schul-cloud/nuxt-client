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
@use "sass:map";
@use "@/styles/settings.scss" as *;

.edusharing-footer {
	display: flex;
	justify-content: center;
	width: 100%;
	margin-top: 24px;

	@media #{map.get($display-breakpoints, 'sm-and-up')} {
		margin-top: 32px;
	}

	&__text {
		margin-top: 40px;
		margin-right: 12px;
		font-size: var(--text-sm);
	}

	&__logo {
		width: 100px;
		height: 40px;
		margin-top: calc(15 * var(--border-width));
	}
}
</style>
