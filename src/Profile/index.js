import React,{Component} from 'react'
import {inject,observer} from 'mobx-react'
import '../css/profile.css'

import PinnedRepos from './PinnedRepos'
import ProfileTags from './ProfileTags'
import Loader from '../Loader'

@inject(stores => ({
	username:stores.user.username,
	isLoading:stores.user.isLoading,
	details:stores.user.userDetails,
	getDetails:(username) => {
		stores.user.getDetails(username)
	},
	getRepos:(username) => {
		stores.user.getRepos(username)
	},
	
}))


@observer
export default class Profile extends Component{
	async componentWillMount(){
		 const {username} = this.props.match.params
		 const {prevUsername}=this.props.username
		if(!this.props.details.name || (username!==prevUsername)){
		 await this.props.getDetails(username)
		 await this.props.getRepos(username)

		}
	}
	
	render(){
		const {details} = this.props
		console.log(details)
		return(
			<div className="p-container">
			{(!this.props.isLoading)
			?
			<div className="container-p">
				<div className="profile-left">
					<a className="profile-photo">
						<img src={details.avatar_url}/>
					</a>
					<div className="profile-name">
					<h1>
						<span className="profile-full-name">{details.name}</span>
						<span className="profile-user-name">{details.login}</span>
					</h1>
					</div>
					<div className="profile-bio">
						{details.bio}
					</div>
					<ul className="profile-details">
					<li className="vcard-details">
					{details.company}
					</li>
					<li className="vcard-details">
					{details.location}
					</li>
					<li className="vcard-details link" href={details.blog}>
					Blog
					</li>
					</ul>

				</div>
				<div className="profile-right">
				<ProfileTags />
				<PinnedRepos />
				</div>
			</div>
			:
			<Loader/>
		}
			
		</div>
			)
		
	}
}