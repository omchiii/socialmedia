import React, {Component} from 'react';
import {connect} from 'react-redux';
import {googleLogin} from '../actions/userActions';

class Login extends Component {

	componentWillMount() {
		if (this.props.user !== null) {
			this.props.history.push('/');
		}

	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.user !== null) {
			nextProps.history.push('/');
		}
	}

	render(){
		return(
			<div className="container-fluid">
				<div className="row">
					<div className="col-sm-12 jumbotron" style={{marginTop: '-20px'}}>
						<h1>DIARY | {new Date().getFullYear()}</h1> 
						<h2>
						<i>
						Login with your favorite <b>Social Network</b>
						</i>
						</h2> 

					</div>
					</div>
					<div className="row">
					<div className="col-sm-12">

						<button className="btn btn-danger col-sm-6" onClick={this.props.googleLogin}>Login with Google</button>
					
						<button className="btn btn-success col-sm-6">Login with Twitter</button>
				</div>
				</div>
			</div>
			);

	}

}

function mapStateToProps(state) {
	return {
		user: state.user,
	}
};

export default connect(mapStateToProps, {googleLogin})(Login);