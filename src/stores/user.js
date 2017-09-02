import {observable,action,runInAction} from 'mobx'
import axios from 'axios'

const PATH = 'https://api.github.com/users/';



class User{
	@observable username=""
	@observable type=""
	@observable isLoading =true
	@observable repos=[]
	@observable userDetails = {}

	@action async getDetails(username){
		
		this.username=username
		this.isLoading=true
		var response = await axios.get(`${PATH}${username}`)
		this.userDetails=response.data
		this.isLoading=false

	}
	@action async getRepos(username){
		this.username=username
		this.isLoading=true
		
		var response = await axios.get(`${PATH}${username}/repos`)
		this.repos=response.data
		this.isLoading=false

	}
	@action setType(type){
		this.type=type
	}

	
}

const user = new User()
export default user