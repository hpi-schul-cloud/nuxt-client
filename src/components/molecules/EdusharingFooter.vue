<template>
	<div class="edusharing-footer">
		<div class="edusharing-footer__text">{{
			$t("components.molecules.EdusharingFooter.text")
		}}</div>
		<img
			class="edusharing-footer__logo"
			src="@assets/img/edusharing/edusharing-logo.svg"
			alt=""
		/>
	</div>
</template>

<style lang="scss">
.edusharing-footer {
	display: flex;
	align-items: flex-end;
	justify-content: center;
	width: 100%;
	margin-top: var(--space-xl);

	&__text {
		margin-right: var(--space-sm);
		font-size: var(--text-sm);
	}
	&__logo {
		width: 150px;
	}
}
</style>
