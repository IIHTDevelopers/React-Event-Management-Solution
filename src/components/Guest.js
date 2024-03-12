import React, { useState, useEffect } from 'react';

function Guest() {
    const [guests, setGuests] = useState([]);
    const [newGuest, setNewGuest] = useState({
        name: '',
        email: '',
        rsvp: 'Pending'
    });

    // Fetch guests on component mount
    useEffect(() => {
        fetch('http://localhost:4000/guests')
            .then(response => response.json())
            .then(data => setGuests(data));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewGuest(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddGuest = (e) => {
        e.preventDefault();
        fetch('http://localhost:4000/guests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newGuest),
        })
            .then(response => response.json())
            .then(data => {
                setGuests(guests.concat(data));
                setNewGuest({ name: '', email: '', rsvp: 'Pending' }); // Reset form
            });
    };

    const handleRSVPChange = (id, rsvp) => {
        fetch(`http://localhost:4000/guests/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rsvp }),
        })
            .then(response => response.json())
            .then(() => {
                setGuests(guests.map(guest => guest.id === id ? { ...guest, rsvp } : guest));
            });
    };

    return (
        <div>
            <h2>Guest List</h2>
            <form onSubmit={handleAddGuest}>
                <div>
                    <label>Name:
                        <input type="text" name="name" value={newGuest.name} onChange={handleInputChange} required />
                    </label>
                </div>
                <div>
                    <label>Email:
                        <input type="email" name="email" value={newGuest.email} onChange={handleInputChange} required />
                    </label>
                </div>
                <div>
                    <label>RSVP:
                        <select name="rsvp" value={newGuest.rsvp} onChange={handleInputChange} required>
                            <option value="Pending">Pending</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </label>
                </div>
                <button type="submit">Add Guest</button>
            </form>
            <h3>Guests</h3>
            <ul>
                {guests.map((guest) => (
                    <li key={guest.id}>{`${guest.name} (${guest.email}) - RSVP: ${guest.rsvp}`}
                        <button onClick={() => handleRSVPChange(guest.id, 'Yes')}>Yes</button>
                        <button onClick={() => handleRSVPChange(guest.id, 'No')}>No</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Guest;
