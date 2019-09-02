import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUser,logout} from '../actions/userActions';



class Header extends Component {
	render(){
		return(
		<nav className="navbar navbar-default">
			<div className="container-fluid">
				<div className="navbar-header">
					<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
						<span className="icon-bar" />
						<span className="icon-bar" />
						<span className="icon-bar" />
					</button>

					<Link className="navbar-brand" to="/">Diary2019</Link>
				</div>
				<div className="collapse navbar-collapse" id="myNavbar">
				<ul className="nav navbar-nav navbar-right">
					{
						this.props.user === null ?	(
							<li><Link to="/login">Login</Link></li>
							) : (
							<li><Link to="/login" onClick={() => this.props.logout()}>Logout <span class="glyphicon glyphicon-log-out" aria-hidden="true"></span></Link></li>	
							)}
				</ul>
				</div>		
			</div>
		</nav>

	);
}
}
function mapStateToProps(state, ownProps){
	return {
		user:state.user
	}
}
export default connect(mapStateToProps, {getUser,logout})(Header);




