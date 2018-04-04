class AddTicketForm extends React.Component {
	
	constructor() {
		super();
		this.handleSubmitEvent = this.handleSubmitEvent.bind(this);
	}
	// Initialize Firebase
	
	handleSubmitEvent(event) {
		
	   event.preventDefault();
	   
	   console.log("Email--",this.refs.email.value.trim());
	   console.log("Issue Type--",this.refs.issueType.value.trim());
	   console.log("Department--",this.refs.department.value.trim());
	   console.log("Comments--",this.refs.comment.value.trim());
	   
	   //React form data object
		var data = {
		   date: Date(),
		   email:this.refs.email.value.trim(),
		   issueType:this.refs.issueType.value.trim(),
		   department:this.refs.department.value.trim(),
		   comments:this.refs.comment.value.trim()
		}
		
		firebaseDb.ref().child('helpdesk').child('tickets').push(data);
		firebaseDb.ref().on('child_added', function(snapshot) {
		 var data = snapshot.val();
		  snapshot.forEach(function(childSnap) {
			console.log(childSnap.val());
			this.refs.form.reset();
			console.log("Ticket submitted successfully");
		  });
		 });
	}
    render() {
		var style = {color: "#ffaaaa"};
        return (
		<div>		
			<form ref="form" onSubmit={this.handleSubmitEvent}>
			   <div className="form-group">
				  <label htmlFor="email">Email <span style={style}>*</span></label>
				  <input type="text" id="email" className="form-control"
				   placeholder="Enter your email address" required ref="email"/>
			   </div>
				<div className="form-group">
					<label htmlFor="issueType">Issue Type <span style={style}>*</span></label>
					<select className="form-control" id="issueType" required ref="issueType">
						<option value="">-----Select----</option>
						<option value="Access Related Issue">Access Related Issue</option>
						<option value="Email Related Issues">Email Related Issues</option>
						<option value="Hardware Request">Hardware Request</option>
						<option value="Health & Safety">Health & Safety</option>
						<option value="Network">Network</option>
						<option value="Intranet">Intranet</option>
						<option value="Other">Other</option>
					</select>
				</div>
				<div className="form-group">
				<label htmlFor="department">Assign Department
				<span style={style}>*</span></label>
					<select className="form-control" id="department" required ref="department">
						<option value="">-----Select----</option>
						<option value="Admin">Admin</option>
						<option value="HR">HR</option>
						<option value="IT">IT</option>
						<option value="Development">Development</option>
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="comments">Comments <span style={style}>*</span></label>
					(<span id="maxlength"> 200 </span> characters max)
					<textarea className="form-control" rows="3" id="comments" required ref="comment"></textarea>
				</div>
				<div className="btn-group">
					<button type="submit" className="btn btn-primary">Submit</button>
					<button type="reset" className="btn btn-default">cancel</button>
				</div>
			</form>
		</div>
		
		);
    }
}
ReactDOM.render(
    <AddTicketForm />,
    document.getElementById('form')
);