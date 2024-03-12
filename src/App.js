import React from 'react';
import Event from './components/Event';
import Guest from './components/Guest';
import Agenda from './components/Agenda';
import Registration from './components/Registration';

function App() {
  return (
    <div>
      <h1>Event Planning and Management Platform</h1>
      <Event />
      <Guest />
      <Agenda />
      <Registration />
    </div>
  );
}

export default App;
