import React,{Component} from 'react'
import {inject,observer} from 'mobx-react'
import numeral from 'numeral'


@inject(stores => ({
	repos:stores.user.repos,
}))

@observer
export default class PinnedRepos extends Component{

	

	render(){
		const {repos} =this.props
		console.log(this.props.repos)
		return(
			<div className="pin-position">
				<div className="pin-repos-order">
					<h2 className="pin-header">
					Pinned repositories
					</h2>
					<ol className="pin-repos-list">
					{repos.slice().map((repo,index) => 
						<li className="pin-repos-item" key={index}>
							<div className="pin-repos-content">
								<span className="pin-repo-name">
								{repo.name}
								</span>
								<p className="pin-repo-desc">
								{repo.description}
								</p>
								<p className="pin-footer">
									<span className="pin-language">
									{repo.language}
									</span>
									<a className="pin-stars">&#9733; {(repo.stargazers_count>1000) ? numeral(repo.stargazers_count).format('0.0a') : numeral(repo.stargazers_count).format('0a') }</a>
									<a className="pin-stars">{numeral(repo.forks_count).format('0.0a')}</a>

								</p>
							</div>
						</li>
					)}
					</ol>

				</div>
			</div>
			)
		
	}
}