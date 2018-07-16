import React, { Component } from 'react';
//import Button from '@material-ui/core/Button';
import requestPromise from 'request-promise';
import {proxy} from '../config/config';
class Index extends Component {

    constructor(){
        super()
        this.state= {
            output:'',
            languages:[]
        }
    }

  async  componentWillMount(){
     let lang = await fetch(`${proxy}/languages`);
     let languages= await lang.json();
    
     this.setState({languages});
     console.log(this.state.languages);
    }

    async  componentDidMount(){
        let lang = await fetch(`${proxy}/languages`);
        let languages= await lang.json();
       
        this.setState({languages});
        console.log(this.state.languages);
       }

   
    handleClick(){
        let post={
            word: this.refs.word.value,
            from: this.refs.from.value,
            to:this.refs.to.value
        }
        var options = {
            method: 'POST',
            uri: `${proxy}/translate/translate`,
            body: post,
            json: true // Automatically stringifies the body to JSON
        };
        requestPromise(options)
            .then( (parsedBody) => {
                // POST succeeded...
                console.log(parsedBody)
              
                this.setState({
                    output:  parsedBody
                })
            })
            .catch((err )=> {
                // POST failed...
                console.log(err)
            });

    }

    handleKeyDown(e){
       if(e.keyCode==13 && e.shiftKey==false) 
       {
        if(this.refs.word.value != '')
        {
            this.handleClick();
            e.preventDefault();
        }
       }
       else{
    
       }
    }

    handleToChange(){
        if(this.refs.word.value != '')
        {
            this.handleClick();
        }
    }
    

    render() {
        return (
          <div>
        <div class="jumbotron">
        </div>
              <div class="container">
              <div class="row">
              <div class="col-lg-6">
              <div class="textarea-wrap">
              <div class="col-lg-3">
        <select className="form-control" ref="from">
            <option value="" disabled>Select Language</option>
            <option value="english" >english</option>
            {this.state.languages.map((value)=>{
                return(
              <option key={value.id} value={value.lang} >{value.lang}</option>
                )
            })
            }
        </select>
        </div>
        <textarea rows="10" cols="20" class="form-control" ref="word" onKeyDown={this.handleKeyDown.bind(this)} placeholder="Enter Text" />
        </div>
        </div>
        <div class="col-lg-6">
        <div class="textarea-wrap">
        <div class="col-lg-3">
        <select className="form-control" ref="to" onChange={this.handleToChange.bind(this)}>
            <option value="" disabled>Select Language</option>
            <option value="english" >english</option>
            {this.state.languages.map((value)=>{
                return(
              <option key={value.id} value={value.lang} >{value.lang}</option>
                )
            })
            }
        </select>
        </div>
        
        <textarea rows="10" cols="20" value={this.state.output} class="form-control" ref="output"
        placeholder="Translation"
        />
        </div>
        </div>
        </div>
        </div>

              </div>  
        );
    }
}
<style>
 
</style>
export default Index;