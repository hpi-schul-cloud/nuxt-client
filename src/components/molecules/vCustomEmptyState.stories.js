import { storiesOf } from "@storybook/vue";
import vCustomEmptyState from "@components/molecules/vCustomEmptyState";
import { text } from "@storybook/addon-knobs";

const image = "@assets/img/empty-state/Task_Empty_State.svg";
const imgHeight = "300px";
const title = "Es gibt keine offenen Aufgaben.";
const subtitle = "Du hast alle Aufgaben erledigt. Genieße deine freie Zeit!";

storiesOf("0 Vuetify/EmptyState", module).add(
	"vCustomEmptyState",
	() => ({
		components: {
			vCustomEmptyState,
		},
        data: () => ({
            image,
            title: text("title", title),
            subtitle: text("subtitle", subtitle),
            imgHeight
        }),
		template: `<v-custom-empty-state :image="image" :title="title" :subtitle="subtitle"/>`,
	})
);
