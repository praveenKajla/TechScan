import React,{Component} from 'react'
import {Link,Route} from 'react-router-dom';

import './css/header.css'
import SearchBar from './SearchBar'
export default class Header extends Component{

	constructor(props){
		super(props)
	}

	render(){

		return(
			<div className="header">
			<Link className="linkk" to="/">
			<h1 className="logo" >TechScan</h1>
			</Link>
			<SearchBar />
			
		</div>
			)
		
	}
}