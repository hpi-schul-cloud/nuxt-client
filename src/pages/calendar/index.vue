<template>
	<div class="content">
		<div class="route-calendar">
			<full-calendar
				ref="calendar"
				class="fullcalender"
				:events="events"
				@day-click="handleDateClick"
				@event-selected="eventClick"
			></full-calendar>
		</div>
	</div>
</template>
<script>
import "fullcalendar/dist/fullcalendar.css";
import moment from "moment";
export default {
	layout: "loggedInFull",
	data() {
		return {
			events: [],
			calendar: undefined,
		};
	},
	created() {
		this.init();
	},
	methods: {
		handleDateClick(date) {
			console.log(date);
			// eslint-disable-next-line no-underscore-dangle
			const startDate = moment(date, "DD.MM.YYYY HH:mm")._d.toISOString();
			console.log(startDate);
			this.postCalendarData(startDate);
			this.getCalendarData();
		},
		eventClick() {},
		init() {
			try {
				this.getCalendarData().then(() => {
					this.calendar.forEach((element) => {
						this.events.push({
							title: element.title,
							start: element.start,
							end: element.end,
						});
					});
				});
			} catch (error) {
				console.error(error);
			}
		},
		async getCalendarData() {
			try {
				await this.$store.dispatch("calendar/find").then((res) => {
					this.calendar = res;
				});
			} catch (error) {
				console.error(error);
			}
		},
		async postCalendarData(date) {
			this.$store.dispatch("calendar/create", [
				{
					events: {
						startDate: date,
					},
				},
			]);
		},
	},

	header: {
		left: "title",
		right: "month,agendaWeek,agendaDay prev,today,next",
	},
	locale: "de",
};
</script>

<style lang="scss" scoped>
.route-calendar {
	.fullcalendar {
		float: left;
		width: 100%;

		.fc-time-grid .fc-slats .fc-minor td {
			border: 0px;
		}

		.fc-event {
			border: 0px;
			color: #646464;
			background: #e9e9e9;

			.fc-content {
				padding: 5px;
				color: #fff;
				background: rgba(0, 0, 0, 0.45);

				.fc-title {
					font-weight: 600;
				}
			}

			&.fc-event-cancelled {
				background: #f5f5f5;
				color: #a9a9a9;
			}

			&:not(.fc-event-cancelled):hover {
				background: #ddd;
			}

			&.fc-time-grid-event {
				&.fc-event-cancelled {
					&:after {
						color: #b10438;
						content: attr(data-status);
						bottom: 5px;
						right: 10px;
						position: absolute;
						font-weight: 600;
					}
				}
			}
		}
	}

	.fc-state-default {
		text-shadow: none;
		box-shadow: none;
		color: #292b2c;
		background: #fff;
		border-color: #ccc;
	}

	.fc-state-hover,
	.fc-state-down,
	.fc-state-active,
	.fc-state-disabled {
		color: #292b2c;
		background-color: #e6e6e6;
	}

	.fc-state-hover {
		color: #292b2c;
		background: #e6e6e6;
		-webkit-transition: background-position 0.1s linear;
		-moz-transition: background-position 0.1s linear;
		-o-transition: background-position 0.1s linear;
		transition: none;
	}

	.fc-state-down,
	.fc-state-active {
		color: #292b2c;
		background: #e6e6e6;
		border-color: #adadad;
	}

	.fc-state-disabled {
		cursor: default;
		opacity: 1;
		box-shadow: none;
		background: #fff;
		border-color: #ccc;
	}
}

.create-course-event,
.create-team-event,
.create-videoconference {
	label {
		margin-left: 0.5rem;
	}
	.toggle {
		height: 2rem !important;
		width: 7rem !important;
		.toggle-handle {
			width: 0.3rem !important;
			background: whitesmoke !important;
		}
	}

	.off {
		background: grey !important;
		label {
			color: whitesmoke !important;
			padding-left: 48px !important;
		}
	}

	.on {
		label {
			padding-right: 48px !important;
		}
	}
}
</style>
