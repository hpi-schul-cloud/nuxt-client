<template>
	<div class="edusharing-footer">
		<div class="edusharing-footer__text">
			{{ $t("components.molecules.EdusharingFooter.text") }}
		</div>
		<img
			class="edusharing-footer__logo"
			src="@assets/img/edusharing/edusharing-logo.svg"
			alt="edusharing-logo"
		/>
	</div>
</template>

<style lang="scss">
.edusharing-footer {
	display: flex;
	justify-content: center;
	width: 100%;
	margin-top: var(--space-xl);

	&__text {
		margin-top: var(--space-xl-2);
		margin-right: var(--space-sm);
		font-size: var(--text-sm);
	}
	&__logo {
		width: 150px;
	}
}
</style>
