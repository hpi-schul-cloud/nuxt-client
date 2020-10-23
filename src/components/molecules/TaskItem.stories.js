import { storiesOf } from "@storybook/vue";
import BaseListItem from "@components/molecules/TaskItem";
import ExampleImage from "@assets/img/courses/task-draft.svg";
import { boolean, text } from "@storybook/addon-knobs";

storiesOf("5 Molecules/TaskItem", module)
	.add("with knobs", () => ({
		components: { BaseListItem },
		data: () => ({
			image: ExampleImage,
			title: text("title", "Das Nervensystem"),
			subtitle: text("subtitle", "Editor-Dokument"),
			status: text("status", "Entwurf"),
			actionNeeded: boolean("actionNeeded", false),
			actions: [
				{ text: "Review", event: "event1" },
				{ text: "Send back", event: "event2" },
			],
			contextOpen: false,
		}),
		template: `<div>
		<BaseListItem :image="image" :title="title" :subtitle="subtitle" :status="status" :action-needed="actionNeeded" :actions="actions">
		</BaseListItem>
	</div>`,
	}))
	.add("with image (triple)", () => ({
		components: { BaseListItem },
		data: () => ({
			image: ExampleImage,
			title: "Das Nervensystem",
			subtitle: "Editor-Dokument",
			status: "Entwurf",
			actions: [
				{ text: "Review", event: "event1" },
				{ text: "Send back", event: "event2" },
			],
		}),
		template: `<div>
		<BaseListItem :image="image" :title="title" :subtitle="subtitle" :status="status" :action-needed="actionNeeded" :actions="actions">
		</BaseListItem>
        <BaseListItem :image="image" :title="title" :subtitle="subtitle" :status="status" :action-needed="actionNeeded" :actions="actions">
        </BaseListItem>
        <BaseListItem :image="image" :title="title" :subtitle="subtitle" :status="status" :action-needed="actionNeeded" :actions="actions">
        </BaseListItem>
	</div>`,
	}))
	.add("with pulsating dot", () => ({
		components: { BaseListItem },
		data: () => ({
			image: ExampleImage,
			title: "Das Nervensystem",
			subtitle: "Editor-Dokument",
			status: "Entwurf",
			actionNeeded: true,
			actions: [
				{ text: "Review", event: "event1" },
				{ text: "Send back", event: "event2" },
			],
		}),
		template: `<div>
    <BaseListItem :image="image" :title="title" :subtitle="subtitle" :status="status" :action-needed="actionNeeded" :actions="actions">
    </BaseListItem>
    </div>`,
	}));
