import { storiesOf } from "@storybook/vue";
import { boolean } from "@storybook/addon-knobs";

import notes from "@docs/storybook/UserHas.md";
import UserHasPermission from "@components/helpers/UserHasPermission";
import UserHasRole from "@components/helpers/UserHasRole";

storiesOf("8 Helpers/UserHas", module)
	.addParameters({
		notes,
	})
	.add("UserHasPermission", () => ({
		components: { UserHasPermission },
		data: () => ({
			hasPermission: boolean("hasPermission", true),
		}),
		template: `<div>
			<UserHasPermission permission="USER_CREATE">
				CREATE
			</UserHasPermission>

			<UserHasPermission :permission="() => hasPermission">
				<template v-slot:true>Edit</template>
				<template v-slot:false>View</template>
			</UserHasPermission>

			<UserHasPermission :permission="(permissions) => true">
				You can also specify a validation function
			</UserHasPermission>
		</div>`,
		methods: {},
	}))
	.add("UserHasRole", () => ({
		components: { UserHasRole },
		data: () => ({
			hasRole: boolean("hasRole", true),
		}),
		template: `<div>
			<UserHasRole role="ADMIN">
				CREATE
			</UserHasRole>

			<UserHasRole :role="() => hasRole">
			<template v-slot:true>Edit</template>
			<template v-slot:false>View</template>
			</UserHasRole>

			<UserHasRole :role="(role) => true">
				You can also specify a validation function
			</UserHasRole>
		</div>`,
		methods: {},
	}));
