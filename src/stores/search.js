import {observable,action,runInAction} from 'mobx'
import axios from 'axios'

const PATH = 'https://api.github.com/search/';



class Search{

	@observable sortBy=""
	@observable pageNumber = 0
	@observable globalPage=1
	@observable orderBy=""
	@observable sortType="Best Match"
	@observable response = {}
	 sortChanged=false
	@observable isLoading =true
	length = 0;
	@observable type="repositories"
	@observable searchTerm=""
	@observable fetchDone=false

	@action async searchRepo(){
		var response = await axios.get(`${PATH}${this.type}?q=${this.searchTerm}&sort=${this.sortBy}&order=${this.orderBy}&page=${this.globalPage}`)
		console.log(`${PATH}${this.type}?q=${this.searchTerm}&sort=${this.sortBy}&order=${this.orderBy}&page=${this.globalPage}`)
		runInAction(() => {
                    if(this.globalPage>1 && !this.sortChanged){
                    	this.response={...this.response,"items":[...this.response.items.slice(),...response.data.items]}
                    	this.length=this.length+response.data.items.length
                    }
                    else{
                    	this.response=response.data
                    this.length=response.data.items.length


                    }
                     this.isLoading=false          
                    
                })

	}

	@action async fetch(searchTerm){
		this.isLoading=true
        this.searchTerm=searchTerm 
		var response = await axios.get(`${PATH}${this.type}?q=${searchTerm}&sort=${this.sortBy}&order=${this.orderBy}&page=${this.globalPage}`)
		console.log(`${PATH}repositories?q=${searchTerm}`)
        this.response={...this.response,...response.data}     
                    this.length+=response.data.items.length  
                    this.isLoading=false 

	}
	@action reset(){
		this.response={}
	}
	

	@action setSearchTerm(term){
		this.searchTerm=term
	}

	@action alterFetch(){
		this.fetchDone=false
	}
	@action changeSortAndOrder(sortBy,orderBy,tag){
		this.isLoading=true
		this.sortChanged=true
		this.sortBy=sortBy
		this.orderBy=orderBy
		this.sortType=tag
		this.searchRepo()
	}

	@action setType(type){
		this.type=type
		this.searchRepo(this.searchTerm)
	}
	@action nextPage(){
		if(this.pageNumber+1>=this.length/10){
			this.isLoading=true
			this.globalPage+=1
			this.searchRepo()
		}
		this.pageNumber+=1
	}
	@action prevPage(){
		this.pageNumber-=1
	}
}

const search = new Search()
export default search