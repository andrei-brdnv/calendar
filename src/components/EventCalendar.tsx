import React, {FC} from 'react';
import {Badge, Calendar} from "antd";
import {IEvent} from "../models/IEvent";
import {Moment} from "moment";
import {formatDate} from "../utils/date";

interface EventCalendarProps {
    events: IEvent[];
}

export const EventCalendar: FC<EventCalendarProps> = ({ events }) => {
    function dateCellRender(value: Moment) {
        const formattedDate = formatDate(value.toDate())
        const currentDayEvents = events.filter(event => event.date === formattedDate)

        return (
            <ul className="events">
                {currentDayEvents.map(event => (
                    <li key={event.description}>
                        <span>{event.description}</span>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <Calendar
            dateCellRender={dateCellRender}
        />
    );
};