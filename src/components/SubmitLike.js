import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateLike} from '../actions/notesAction';


class SubmitLike extends Component {

	constructor(props){
		super(props);
		this.state = {
			like: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}



	handleSubmit(e){


		e.preventDefault();
		
		const likes = {
			likes: {likes2: this.props.notes[`${this.props.id}`].likes.likes2 +1,uid: `"${this.props.notes[`${this.props.id}`].likes.uid + this.props.uid}"`}
			
		};

		const likes2 = {
			likes: {likes2: this.props.notes[`${this.props.id}`].likes.likes2 -1,uid: [this.props.notes[`${this.props.id}`].likes.uid].filter(item => {
    		return item !== this.props.uid ;
  			})
		}
	}

		if (this.props.notes[`${this.props.id}`].likes.uid.includes(this.props.uid)){
			this.props.updateLike(this.props.id, likes2)
			console.log("does")
		} else {
			this.props.updateLike(this.props.id, likes)
		}
		
   }

	render(){
		return(
					<div>
						<button  onClick={this.handleSubmit} className="btn btn-success">Like</button>
					</div>

			)
	}
} 

function mapStateToProps(state, ownProps){
	return {
		notes: state.notes,
		uid: state.user.uid,
		name: state.user.displayName
	}
}

export default connect(mapStateToProps, {updateLike})(SubmitLike)