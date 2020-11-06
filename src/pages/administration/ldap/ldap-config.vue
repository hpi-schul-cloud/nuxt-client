<template>
	<div>
		<connection />
		<users />
		<classes />
	</div>
</template>

<script>
import Connection from "@components/organisms/Ldap/Connection";
import Users from "@components/organisms/Ldap/Users";
import Classes from "@components/organisms/Ldap/Classes";

export default {
	components: {
		Connection,
		Users,
		Classes,
	},
};
</script>
