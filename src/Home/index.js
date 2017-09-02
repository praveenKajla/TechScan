import React,{Component} from 'react'
import {inject,observer} from 'mobx-react'
import '../css/home.css'
import {Link,Route} from 'react-router-dom';

const langs = ["JavaScript", "Java", "Python", "Php", "Ruby","Kotlin","Swift","Go","TypeScript","Rust","Julia","scala"]

@observer
export default class Home extends Component{
	
	
	render(){
		return(
			<div className="p-container">
				<div className="home-header">
					<h2>Technologies</h2>
					<p>Browse latest Technologies, or Search and Explore</p>
				</div>
				<ul className="explore-home">
				{langs.map((lang,index) => 
				
				<li className="explore-lang" key={index}>
				<Link className="linkk" to={`/repo/${lang}`}>
				<a className="lang-name lang-text">
				{lang}
				</a>
				</Link>
				</li>
				)}

				</ul>
			
			
		</div>
			)
		
	}
}