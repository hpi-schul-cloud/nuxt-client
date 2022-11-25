<template>
	<v-hover>
		<template #default="{ hover }">
			<section v-bind="$attrs" :class="`card elevation-${hover ? 4 : 2}`">
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
	</v-hover>
</template>

<style lang="scss" scoped>
.card {
	background: #fff;
	border-radius: var(--radius-md);
}
</style>
