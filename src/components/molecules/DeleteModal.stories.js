import { storiesOf } from "@storybook/vue";

import DeleteModal from "@components/molecules/DeleteModal";

storiesOf("4 Base UI Components/Modals", module)
    .add("Delete Dialog", () => ({
        components: { DeleteModal },
        template: `<delete-modal></delete-modal>`,
    }))
