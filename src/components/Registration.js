import React, { useState, useEffect } from 'react';

function Registration() {
    const [registrations, setRegistrations] = useState([]);
    const [guests, setGuests] = useState([]);
    const [agendas, setAgendas] = useState([]);
    const [newRegistration, setNewRegistration] = useState({
        guestId: '',
        agendaId: '',
        status: 'Registered'
    });

    useEffect(() => {
        fetch('http://localhost:4000/registrations')
            .then(response => response.json())
            .then(data => setRegistrations(data));
        fetch('http://localhost:4000/guests')
            .then(response => response.json())
            .then(data => setGuests(data));
        fetch('http://localhost:4000/agendas')
            .then(response => response.json())
            .then(data => setAgendas(data));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRegistration(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddRegistration = (e) => {
        e.preventDefault();
        fetch('http://localhost:4000/registrations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRegistration),
        })
            .then(response => response.json())
            .then(data => {
                setRegistrations(registrations.concat(data));
                setNewRegistration({ guestId: '', agendaId: '', status: 'Registered' }); // Reset form
            });
    };

    const findGuestNameById = (guestId) => {
        const guest = guests.find(guest => guest.id.toString() === guestId.toString());
        return guest ? guest.name : 'Unknown Guest';
    };

    const findAgendaTitleById = (agendaId) => {
        const agenda = agendas.find(agenda => agenda.id.toString() === agendaId.toString());
        return agenda ? agenda.title : 'Unknown Session';
    };

    return (
        <div>
            <h2>Session Registrations</h2>
            <form onSubmit={handleAddRegistration}>
                <div>
                    <label>Select Guest:
                        <select name="guestId" value={newRegistration.guestId} onChange={handleInputChange} required>
                            <option value="">Select a guest</option>
                            {guests.map(guest => (
                                <option key={guest.id} value={guest.id}>{guest.name}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    <label>Select Session:
                        <select name="agendaId" value={newRegistration.agendaId} onChange={handleInputChange} required>
                            <option value="">Select a session</option>
                            {agendas.map(agenda => (
                                <option key={agenda.id} value={agenda.id}>{agenda.title}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <button type="submit">Register</button>
            </form>
            <h3>Registrations</h3>
            <ul>
                {registrations.map(registration => (
                    <li key={registration.id}>
                        {`${findGuestNameById(registration.guestId)} registered for "${findAgendaTitleById(registration.agendaId)}"`}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Registration;
