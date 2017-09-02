import React,{Component} from 'react'
import {inject,observer} from 'mobx-react'

const navTags = ["Repositories","Code","Commits","Issues","Wikis","Users"]

@inject(stores => ({
	searchTerm:stores.search.searchTerm,
	type:stores.search.type,
	setType:(type) => {
		stores.search.setType(type.toLowerCase())
	}
}))

@observer
export default class searchTags extends Component{

	constructor(props){
		super(props)
		this.state={
			selectedIndex:0,
		}
	}

	setSearch(index){
		this.setState({selectedIndex:index})
		this.props.setType(navTags[index])
		
	}

	render(){
		
		const {selectedIndex} = this.state
		console.log(this.props.type)
		console.log(this.props.searchTerm)
		return(
			<div className="bottom-border-nav">
			<div className="container" >
			<nav className="underline-nav">

			{
				navTags
				.map((tag,index) => 
					<a key={index} className={"underline-nav-item " + ( (selectedIndex==index) ? 'selected' : ' ')}
						onClick={() => this.setSearch(index)}>
						{tag}
					</a>

				)
			}
			
			</nav>

			</div>
			
			
		</div>
			)
		
	}
}