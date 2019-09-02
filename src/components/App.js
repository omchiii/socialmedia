import React, { Component } from 'react';
import '../styles/app.css';
import _ from 'lodash';
import {connect} from 'react-redux';
import {getNotes, saveNote, deleteNote} from '../actions/notesAction.js';
import NoteCard from './NoteCard.js';
import {getUser} from '../actions/userActions.js';
import { Link } from 'react-router-dom';
import SubmitLike from './SubmitLike';
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';


class App extends Component {

constructor(props){
	super(props);
	this.state = {
		title: '',
		body: '',
		image:'',
		imageURL:''
	};

	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.renderNotes = this.renderNotes.bind(this);
}


handleUploadSuccess = filename => {


	this.setState({

		image: filename

	})

	firebase.storage().ref('posts').child(filename).getDownloadURL()
	.then(url => this.setState({
		imageURL: url
	}))


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
		imageURL: this.state.imageURL,
		comments: '',
		likes: {
			likes2:0,
			uid:[""]
		},
		uid: this.props.user.uid,
		name: this.props.user.displayName,
		profile: this.props.user.photoURL,
		date: Date()

	}
	this.props.saveNote(note);
	this.setState({
		title: '',
		body: '',
		image:'',
		imageURL:''
		
	})

}


renderNotes() {
	return _.map(this.props.notes, (note,key) => {
		return (
			 <NoteCard key={key}>
			 <div className="row">
			 <div className="col-sm-8">
				 
				 <h2>{note.title}</h2>
				<p>{note.body}</p>
				<img className="post-picture" src={note.imageURL} alt="post" />
				<br />
				<br />
				<SubmitLike id={key} />
				<Link to={`/${key}`}>
				<p> Likes({this.props.notes[`${key}`].likes.likes2}) Comments ({Object.keys(this.props.notes[`${key}`].comments).length})</p>
				 </Link>
				 {note.uid === this.props.user.uid && (
					<div className="btn-toolbar">
				<button className="btn btn-danger btn-xs"
				 onClick={() => this.props.deleteNote(key)}>
				 Delete
				 </button>


				 <button className="btn btn-info btn-xs">
				 <Link to={`/${key}/edit`}>Edit</Link> 
				 </button>

				 	</div>
				 )}
				
				 </div>
			
			<div className="col-sm-4">
			<br />
			<div className="post-details">
				

				<p><i>Published By:</i></p>

			<img src={note.profile} alt="profile-2" />
				 <br />
				 <p>{note.name}</p>
				 <p><i>Date published:<br />{note.date}</i></p>
			</div>
			</div>
			</div>
			</NoteCard>

			);
	});
}


  render() {


  return (<div className="container-fluid">
      <div className="row">
      	<div className="col-sm-2">
      	<div className="user-info ">
      	<img
                            alt="profile"
                            src={this.props.user.photoURL}
                            height="100px"
                        />
      	<h4 className="username">Welcome Back, <br /> <b>{this.props.user.displayName}</b></h4>
      	</div>
      	</div>
      	<div className="col-sm-10">
      	<div className="post">
      	<h2><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> Create a Post</h2>
      	<form onSubmit={this.handleSubmit}>
      		<div className="form-group">
      			<input onChange={this.handleChange} value={this.state.title} type="text" name="title" className="form-control no-border" placeholder="Title" required />
      		</div>

      		<div className="form-group">
      			<textarea onChange={this.handleChange} value={this.state.body} type="text" name="body" className="form-control no-border" placeholder="Body" required />
      		</div>

      		<div className="form-group">
      			<FileUploader accept="image/*" name="image" storageRef={firebase.storage().ref('posts')} onUploadSuccess={this.handleUploadSuccess}/>
      		</div>

      		<div className="form-group">
      			<button class="btn btn-primary">Post</button>
      		</div>
      	</form>
      	</div>
      	<br />
      	<br />
      	<br />
   		<h2><span className="glyphicon glyphicon-align-left" aria-hidden="true"></span> News Feed</h2>
      	{this.renderNotes()}
       	</div>
      </div>
    </div>
  );
}

}

function mapStateToProps(state, ownProps){
	return {
		notes: state.notes,
		user: state.user,
	}
}

export default connect(mapStateToProps, { getNotes, saveNote, deleteNote , getUser})(App);
