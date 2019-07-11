import { storiesOf } from "@storybook/vue";

import notes from "@docs/storybook/UserHas.md";
import UserHasPermission from "@components/UserHasPermission";
import UserHasRole from "@components/UserHasRole";

storiesOf("UserHas", module)
	.addParameters({
		notes,
	})
	.add("UserHasPermission", () => ({
		components: { UserHasPermission },
		template: `<div>
			<UserHasPermission permission="USER_CREATE">
				CREATE
			</UserHasPermission>

			<UserHasPermission permission="USER_EDIT">
				<template v-slot:true>Edit</template>
				<template v-slot:false>View</template>
			</UserHasPermission>
		</div>`,
		methods: {},
	}))
	.add("UserHasRole", () => ({
		components: { UserHasRole },
		template: `<div>
			<UserHasRole role="ADMIN">
				CREATE
			</UserHasRole>

			<UserHasRole role="ADMIN">
				<template v-slot:true>Edit</template>
				<template v-slot:false>View</template>
			</UserHasRole>
		</div>`,
		methods: {},
	}));
