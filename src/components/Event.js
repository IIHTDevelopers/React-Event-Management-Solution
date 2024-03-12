import React, { useState, useEffect } from 'react';

function Event() {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({
        title: '',
        date: '',
        time: '',
        venue: '',
        description: ''
    });

    // Fetch events on component mount
    useEffect(() => {
        fetch('http://localhost:4000/events')
            .then(response => response.json())
            .then(data => setEvents(data));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddEvent = (e) => {
        e.preventDefault();
        fetch('http://localhost:4000/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEvent),
        })
            .then(response => response.json())
            .then(data => {
                setEvents(events.concat(data));
                setNewEvent({ title: '', date: '', time: '', venue: '', description: '' }); // Reset form
            });
    };

    return (
        <div>
            <h2>Create New Event</h2>
            <form onSubmit={handleAddEvent}>
                <div>
                    <label>Title:
                        <input type="text" name="title" value={newEvent.title} onChange={handleInputChange} required />
                    </label>
                </div>
                <div>
                    <label>Date:
                        <input type="date" name="date" value={newEvent.date} onChange={handleInputChange} required />
                    </label>
                </div>
                <div>
                    <label>Time:
                        <input type="time" name="time" value={newEvent.time} onChange={handleInputChange} required />
                    </label>
                </div>
                <div>
                    <label>Venue:
                        <input type="text" name="venue" value={newEvent.venue} onChange={handleInputChange} required />
                    </label>
                </div>
                <div>
                    <label>Description:
                        <textarea name="description" value={newEvent.description} onChange={handleInputChange}></textarea>
                    </label>
                </div>
                <button type="submit">Add Event</button>
            </form>
            <h3>Events List</h3>
            <ul>
                {events.map((event) => (
                    <li key={event.id}>{`${event.title} - ${event.date} at ${event.time}, Venue: ${event.venue}, Description: ${event.description}`}</li>
                ))}
            </ul>
        </div>
    );
}

export default Event;
