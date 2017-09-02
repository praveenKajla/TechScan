import React,{Component} from 'react'
import {inject,observer} from 'mobx-react'
import {observable} from 'mobx'

const sortTags = ["Best match","Most stars","Fewest stars","Most forks","Fewest forks","Recently updated","Least recently updated"]


@inject(stores => ({
	sortType:stores.search.sortType,
	changeSortAndOrder:(sortBy,orderBy,tag) => {
		stores.search.changeSortAndOrder(sortBy,orderBy,tag)
	},
}))

@observer
export default class SelectMenu extends Component{

	@observable modalActive=false
	setModal = () => {
		this.modalActive=!this.modalActive
		
	}
	Sort(tag){
		var sortBy=""
		var orderBy=""
		if(tag.includes('Most') || tag.includes('Recently')){
			orderBy="desc"
		}
		else if(tag.includes('Least') || tag.includes('Fewest')){
			orderBy="asc"
		}
		if(tag.includes('stars'))sortBy="stars"
		else if(tag.includes('forks'))sortBy="forks"
		else if(tag.includes('updated'))sortBy="updated"

		console.log(sortBy+" "+orderBy)
		this.modalActive=false
		this.props.changeSortAndOrder(sortBy,orderBy,tag)
	}


	render(){
		const {response} = this.props
		console.log(this.props.sortType)
		return(
			 	<div className="select-menu">
					<button onClick={() => this.setModal()}className="select-btn">
						<i>Sort:</i>
						<span>{this.props.sortType}</span>
					</button>
					{
					(this.modalActive)
					?
					<div className="select-menu-modal-holder">
						<div className="select-menu-modal">
							<div className="select-menu-header">
								<a  onClick={() => this.setModal()}className="header-close">&#9932;</a>
								<span className="header-title">Sort Options </span>
								</div>
								<div className="select-menu-list">
								{sortTags.map((tag,index) => 
									<a  onClick={() => this.Sort(tag)}
										className="select-menu-item"
										key={index}>
									<span className="select-menu-item-text"> 
									{tag}</span>
									</a>
								)}
							</div>
						</div>
					</div>
					:
					<div></div>
					}
				</div>
		
			)
		
	}
}