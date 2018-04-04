class TicketTable extends React.Component {
  constructor(){
    super();
    this.state = {
      tickets:[]
    }
  }

componentDidMount() {
 var itemsRef = firebaseDb.ref('/helpdesk/tickets/all/');
 console.log(itemsRef,"test");
 itemsRef.on('value', (snapshot) => {
   let tickets = snapshot.val();
   console.log(tickets);
   let newState = [];
   for (let ticket in tickets) {
     newState.push({
       id:tickets[ticket],
       email:tickets[ticket].email,
       issueType:tickets[ticket].issueType,
       department:tickets[ticket].department,
       comments:tickets[ticket].comments,
       date:tickets[ticket].date
   });
 }
 this.setState({
   tickets: newState
 });

 });
}

render() {
  return (<table className="table">
<thead>
<tr> 
    <th>Email</th>
    <th>Issue Type</th> 
    <th>Department</th> 
    <th>Comments</th> 
    <th>Date</th> 
</tr>
</thead>
<tbody>
 {
   this.state.tickets.map((ticket) => 
    { return ( 
    <tr key={ticket.id}> 
        <td>{ticket.email}</td> 
        <td>{ticket.issueType}</td> 
        <td>{ticket.department}</td> 
        <td>{ticket.comments}</td> 
        <td>{ticket.date}</td> 
</tr> )})
 } 
</tbody>
</table>
  )}
};
ReactDOM.render(
    <TicketTable />,
    document.getElementById('table')
);