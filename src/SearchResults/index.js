import React,{Component} from 'react'
import {inject,observer} from 'mobx-react'
import '../css/searchResults.css'
import SearchTags from './SearchTags'
import RepoList from './RepoList'
import SelectMenu from './SelectMenu'
import Loader from '../Loader'
import Pagination from './Pagination'
@inject(stores => ({
	searchTerm:stores.search.searchTerm,
	response:stores.search.response,
	isLoading:stores.search.isLoading,
	type:stores.search.type,
	alterFetch:() => {
		stores.search.alterFetch()
	},
	fetch:(searchTerm) => {
		stores.search.fetch(searchTerm);

	},
	
}))


@observer
export default class SearchResults extends Component{
	
	async componentWillMount(){
		const {term} = this.props.match.params
		const {prev} = this.props.searchTerm
		if(!this.props.response.items || (term!==prev)){
		 
		 await this.props.fetch(term)

		}
	}
	render(){
		const {response} = this.props
		console.log(response)
		return(
			<div>
			<SearchTags />
			{(!this.props.isLoading)
				?
				<div className="container2">
					<div className="partition">
						<div className="three-fourth">

							<div className="topper">
							<h3 className="topperHeading">{response.total_count} {this.props.type.toUpperCase()} Results</h3>
							<SelectMenu id="top"/>
						    </div>

						   <RepoList />
						   <Pagination />

					</div>
					<div className="one-fourth">
							<div className="lang-header">
								<h2>Languages</h2>
								<ul className="filter-list">
									<li>
									<span className="bar"></span>
									<a className="filter-item">
									<span className="count">1233</span>
									Java
									</a>
									</li>
								</ul>

							</div>
						</div>
				</div>
			</div>
			:
			<Loader />}
			
		</div>
			)
		
	}
}