import { storiesOf } from "@storybook/vue";

import Roles from "./Roles";

storiesOf("6 Organisms/Ldap Page/Roles", module).add("Roles", () => {
	return {
		components: { Roles },
		template: `<roles :data="mockData" />`,
		data: () => ({
			mockData: {
				member: "description",
				student: "cn=schueler,ou=rolle",
				teacher: "cn=lehrer,ou=rolle",
				admin: "cn=admin,ou=rolle",
				user: "cn=ehemalige,ou=rolle",
			},
		}),
		methods: {},
	};
});
