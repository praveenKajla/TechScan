import React,{Component} from 'react'
import {Link,Route} from 'react-router-dom';
import {withRouter} from "react-router-dom";
import {inject,observer} from 'mobx-react'


@inject(stores => ({
	fetchDone:stores.search.fetchDone,
	searchTerm:stores.search.searchTerm,
	setSearchTerm:(term) => {
		stores.search.setSearchTerm(term)
	},
	alterFetch:() => {
		stores.search.alterFetch()
	},
	searchRepo:() => {
		stores.search.searchRepo();

	},
}))

@observer
 class SearchBar extends Component{

	constructor(props){
		super(props);
		this.state={
			searchTerm:'',
		}
		this.fillSearch=this.fillSearch.bind(this)
		this.handlePress=this.handlePress.bind(this)
	}

	
	fillSearch(event){
		this.props.setSearchTerm(event.target.value)
		event.preventDefault()
	}
	async handlePress(e){
		const {searchTerm} = this.props
		if (e.key === 'Enter') {
			await this.props.searchRepo(searchTerm)   
			this.props.history.push(`/repo/${searchTerm}`)   		
     }
	}
	

	render(){
		
		
		return(

			<div id="searchbar">
			
			<input placeholder="Search TechScan" 
					value={this.props.searchTerm}
					onChange={this.fillSearch}
					onKeyPress={this.handlePress}/>
			
			</div>

			)

	}
}

export default withRouter(SearchBar)