import React, { useState, useEffect } from 'react';

function Agenda() {
    const [agendas, setAgendas] = useState([]);
    const [events, setEvents] = useState([]);
    const [newAgenda, setNewAgenda] = useState({
        eventId: '',
        time: '',
        title: '',
        speaker: '',
        description: ''
    });

    // Fetch agendas and events on component mount
    useEffect(() => {
        fetch('http://localhost:4000/agendas')
            .then(response => response.json())
            .then(data => setAgendas(data));

        fetch('http://localhost:4000/events')
            .then(response => response.json())
            .then(data => setEvents(data));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAgenda(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddAgenda = (e) => {
        e.preventDefault();
        fetch('http://localhost:4000/agendas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAgenda),
        })
            .then(response => response.json())
            .then(data => {
                setAgendas(agendas.concat(data));
                setNewAgenda({ eventId: '', time: '', title: '', speaker: '', description: '' }); // Reset form
            });
    };

    return (
        <div>
            <h2>Manage Event Agendas</h2>
            <form onSubmit={handleAddAgenda}>
                <div>
                    <label>Select Event:
                        <select name="eventId" value={newAgenda.eventId} onChange={handleInputChange} required>
                            <option value="">Select an event</option>
                            {events.map(event => (
                                <option key={event.id} value={event.id}>{event.title}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    <label>Time:
                        <input type="time" name="time" value={newAgenda.time} onChange={handleInputChange} required />
                    </label>
                </div>
                <div>
                    <label>Title:
                        <input type="text" name="title" value={newAgenda.title} onChange={handleInputChange} required />
                    </label>
                </div>
                <div>
                    <label>Speaker:
                        <input type="text" name="speaker" value={newAgenda.speaker} onChange={handleInputChange} />
                    </label>
                </div>
                <div>
                    <label>Description:
                        <textarea name="description" value={newAgenda.description} onChange={handleInputChange}></textarea>
                    </label>
                </div>
                <button type="submit">Add Agenda Item</button>
            </form>
            <h3>Agenda Items</h3>
            <ul>
                {agendas.map((agenda) => (
                    <li key={agenda.id}>
                        {`[${findEventTitleById(agenda.eventId)}] ${agenda.time} - ${agenda.title}: ${agenda.speaker}`}
                    </li>
                ))}
            </ul>
        </div>
    );

    function findEventTitleById(eventId) {
        const event = events.find(event => event.id === parseInt(eventId));
        return event ? event.title : 'Unknown Event';
    }
}

export default Agenda;
