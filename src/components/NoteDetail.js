import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import SubmitComment from './SubmitComment';
import _ from 'lodash';
import Comment from './Comment';
import SubmitLike from './SubmitLike';


class NoteDetail extends Component {

renderComments(){
	const {note} = this.props;
	return _.map(note.comments, (comment,key) =>{
		return <Comment key={key} id={key}><h2>{comment.commentBody}</h2><br /><p>{comment.name}</p></Comment>
	})
}


 render() {
 	const {note} = this.props;
 return (
 	<div className="container-fluid">
 		<div className="row">
 			<div className="col-sm-6 col-sm-offset-3">
 			<h1>{note.title}</h1>
 			<p>{note.body}</p>
 				<Link to='/'>Back</Link>
 			<SubmitLike id={this.props.match.params.id} />
			{Object.keys(this.props.note.likes).length}
 			<SubmitComment id={this.props.match.params.id} />
			{this.renderComments()}	
 			</div>
 		</div>
 	</div>
 		

 		);
 }
}

function mapStateToProps(state, ownProps) {
	return {
		note: state.notes[ownProps.match.params.id], 
	};
}

export default connect(mapStateToProps)(NoteDetail);