import React,{Component} from 'react'
import {inject,observer} from 'mobx-react'
import {Link,Route} from 'react-router-dom';
import numeral from 'numeral'
import moment from 'moment'

@inject(stores => ({
	page:stores.search.pageNumber,
	response:stores.search.response,
}))

@observer
export default class RepoList extends Component{

	render(){
		const {response,page} = this.props
		return(
			 <ul className="repo-list">
		    
		    	{
		    	response.items.slice(page*10,(page+1)*10).map((repo,index) => 
			    	<div className="repo-list-item" key={index}>
				    	<div className="item-1">
				    		<Link to={`/users/${repo.owner.login}`}>
					    	<h3>
							    <p  className="repo-name">
							   {repo.full_name}
							    </p>
					    	</h3>
					    	</Link>
						    <p className="repo-descp">
						    {repo.description}
						    </p>
						    	<p className="repo-time">
						    	Updated {moment(repo.updated_at).fromNow()}
						    	</p>
				    	</div>
				    	<div className="item-2">
				    		<span className="repo-lang">{repo.language}</span>
				    	</div>
				    	<div className="item-3">
				    		<a>&#9733; {(repo.stargazers_count>1000) ? numeral(repo.stargazers_count).format('0.0a') : numeral(repo.stargazers_count).format('0a') }</a>
				    	</div>
			    	</div>
			)
			}
						
		</ul>
		
			
		
			)
		
	}
}