import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";

import FormCreateUser from "./FormCreateUser";

storiesOf("6 Organisms", module).add("FormCreateUser", () => ({
	components: { FormCreateUser },
	template: `<FormCreateUser @create-user="createUser">
                   <template v-slot:inputs>
                       <base-input
                           v-model="birthday"
                           type="date"
                           required="true"
                           label="Geburtstag"
                           :placeholder="'29.3.2004'"
                           class="mt--md"
                           >
                       </base-input>
                   </template>
               />`,
	data: () => ({
		birthday: null,
	}),
	methods: {
		createUser: action("create-user"),
	},
}));
