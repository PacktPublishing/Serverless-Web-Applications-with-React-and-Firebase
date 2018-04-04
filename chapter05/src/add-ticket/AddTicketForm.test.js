import React from 'react';
import ReactDOM from 'react-dom';
import AddTicketForm from './AddTicketForm';

it('Renders add ticket form component without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddTicketForm />, div);
});
