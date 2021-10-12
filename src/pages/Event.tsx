import React, {FC, useEffect, useState} from 'react';
import {Button, Layout, Modal, Row} from "antd";
import {EventCalendar} from "../components/EventCalendar";
import {EventForm} from "../components/EventForm";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IEvent} from "../models/IEvent";

export const Event: FC = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const {fetchGuests, createEvent, fetchEvents} = useActions()
    const {guests, events} = useTypedSelector(state => state.event)
    const {user} = useTypedSelector(state => state.auth)

    useEffect(() => {
        fetchGuests()
        fetchEvents(user.username)
    }, [])

    const addNewEvent = (event: IEvent) => {
        createEvent(event)
        setModalOpen(false)
    }

    return (
        <Layout>
            <EventCalendar events={events} />
            <Row justify="center">
                <Button
                    onClick={() => setModalOpen(true)}
                >
                    Create event
                </Button>
            </Row>
            <Modal
                title="Create event"
                visible={modalOpen}
                footer={null}
                onCancel={() => setModalOpen(false)}
            >
                <EventForm
                    guests={guests}
                    submit={addNewEvent}
                />
            </Modal>
        </Layout>
    );
};