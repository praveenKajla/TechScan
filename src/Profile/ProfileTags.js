import React,{Component} from 'react'
import {inject,observer} from 'mobx-react'

const profileTags = ["Overview","Repositories","Stars","Followers","Following"]

@inject(stores => ({
	username:stores.user.username,
	type:stores.user.type,
	setType:(type) => {
		stores.user.setType(type.toLowerCase())
	}
}))

@observer
export default class ProfileTags extends Component{

	constructor(props){
		super(props)
		this.state={
			selectedIndex:0,
		}
	}

	setSearch(index){
		this.setState({selectedIndex:index})
		this.props.setType(profileTags[index])
		
	}

	render(){
		
		const {selectedIndex} = this.state
		console.log(this.props.type)
		return(
			<div className="profile-nav">
			<nav className="underline-nav">

			{
				profileTags
				.map((tag,index) => 
					<a key={index} className={"underline-nav-item " + ( (selectedIndex==index) ? 'selected' : ' ')}
						onClick={() => this.setSearch(index)}>
						{tag}
					</a>

				)
			}
			
			</nav>
			
			
		</div>
			)
		
	}
}