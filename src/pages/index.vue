<template>
	<section class="section">
		<div class="columns is-mobile">
			<h1>{{ $theme.short_name }}</h1>
		</div>
	</section>
</template>

<script>
export default {
	name: "HomePage",
	methods: {
		setToken() {
			// const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJhY2NvdW50SWQiOiIwMDAwZDIzMTgxNmFiYmE1ODQ3MTRjOWYiLCJ1c2VySWQiOiIwMDAwZDIzMTgxNmFiYmE1ODQ3MTRjOWUiLCJpYXQiOjE1NDUwNDYwMDgsImV4cCI6MTU0NzYzODAwOCwiYXVkIjoiaHR0cHM6Ly9zY2h1bC1jbG91ZC5vcmciLCJpc3MiOiJmZWF0aGVycyIsInN1YiI6ImFub255bW91cyIsImp0aSI6Ijc1Y2RlYzJiLWEwYmQtNDUwMy04NjU0LWZhZjgzY2M1NWJlZiJ9.ROklq5kJPW0s_Hq5E0Pnj5MEs7a_ch_gLJjd3jRxJsI'
			// this.$store.dispatch('auth/authenticate', { accessToken, strategy: 'jwt' })
			// this.$store.dispatch('auth/authenticate')
		},
	},
};
</script>
