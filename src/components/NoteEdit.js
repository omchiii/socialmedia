import React, {Component} from 'react';
import {connect} from 'react-redux';
import { editNote } from '../actions/notesAction.js';


class NoteEdit extends Component {

constructor(props){
	super(props);
	this.state = {
		title: this.props.note.title,
		body: this.props.note.body
	};

	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
}


handleChange(e){
	this.setState({
		[e.target.name] : e.target.value
	})
}

handleSubmit(e){
	e.preventDefault();
	const note = {
		title: this.state.title,
		body: this.state.body,
		date: `(Edited)${Date()}`

	};
	this.props.editNote(this.props.match.params.id,note);
	this.setState({
		title: '',
		body: '',
		
	});
	this.props.history.push('/')
}

  render() {
  return (
    <div className="container-fluid">
      <div className="row">
      	<div className="col-sm-6 col-sm-offset-3">
      	<form onSubmit={this.handleSubmit}>
      		<div className="form-group">
      			<input onChange={this.handleChange} value={this.state.title} type="text" name="title" className="form-control no-border" placeholder="Title" required />
      		</div>

      		<div className="form-group">
      			<textarea onChange={this.handleChange} value={this.state.body} type="text" name="body" className="form-control no-border" placeholder="Body" required />
      		</div>

      		<div className="form-group">
      			<button className="btn btn-primary col-sm-12">Update</button>
      		</div>
      	</form>
      	<br />
      	<br />
      	<br />
      	</div>
      </div>
    </div>
  );
}

}

function mapStateToProps(state, ownProps){
	return {
		note: state.notes[ownProps.match.params.id],
		uid: state.user.uid
	};
}
export default connect(mapStateToProps, {editNote})(NoteEdit);