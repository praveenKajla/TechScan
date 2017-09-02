import React,{Component} from 'react'
import {inject,observer} from 'mobx-react'
import {Link,Route} from 'react-router-dom';
import numeral from 'numeral'
import moment from 'moment'

@inject(stores => ({
		pageNumber:stores.search.pageNumber,
		length:stores.search.length,
		nextPage:() => {
			stores.search.nextPage()
		},
		prevPage:() => {
			stores.search.prevPage()
		},

}))

@observer
export default class Pagination extends Component{
	
	render(){
		console.log(this.props.length)
		return(
			 
			<div className="pagination-container">
				<div className="pagination">
				{(this.props.pageNumber==0) 
				? 
				<a className="disabled">Previous</a>
				:
				<a onClick={() => this.props.prevPage()} href="#top">Previous</a>
				}
				<span>{this.props.pageNumber+1}</span>

				<a onClick={() => this.props.nextPage()} href="#top">Next</a>
					

				</div>
			</div>

			
		
			)
		
	}
}