import { storiesOf } from "@storybook/vue";

import FormCreateUser from "./FormCreateUser";

storiesOf("6 Organisms", module).add("FormCreateUser", () => ({
	components: { FormCreateUser },
	template: `<FormCreateUser>
                            <template v-slot:inputs="{ userData }">
                                <base-input
                                    v-model="userData.birthdate"
                                    type="text"
                                    required="true"
                                    label="Geburtstag"
                                    :placeholder="'29.3.2004'"
                                    class="mt--md"
                                >
                                </base-input>
                            </template>
                        />`,
	data: () => ({
		userData: {
			userData: {
				firstName: "Anna",
				lastName: "Meier",
				email: "anna.meier@mail.de",
			},
		},
	}),
}));
