import React from 'react';
import ReactDOM from 'react-dom';
import ViewTicketTable from './ViewTicketTable.jsx';

it('Renders view tickets component without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ViewTicketTable />, div);
});
