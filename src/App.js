import React, { Component } from 'react';

import SearchForm from './components/searchForm';
import Results from './components/results';

import {validate, buildQuery} from './controllers/controllers';

import './styles/app.css';

class App extends Component { 
  constructor (props) {
    super(props);

    this.query  = '/proxy?service=phone&k2=9abbxna7d2b65ivia3p9vljs&cfg_maxrecs=100';
    
    this.ajax   = this.ajax.bind(this);
    this.submit = this.submit.bind(this);
    this.change = this.change.bind(this);
    
    this.state = {
      status    : null,
      response  : [],
      disabled  : false,
      errors    : [],
      fields    : {
          d_first : '',
          d_last  : '',
          d_state : ''
      } 
    }    
  }

  change (e) {
    let newFields = this.state.fields;

    newFields[e.target.name] = e.target.value;
    this.setState({fields : newFields});
  }

  submit (e) {
    e.preventDefault();

    let errors = validate(this.state.fields);

    if (!errors.length) {
      this.ajax(buildQuery(this.state.fields));
      this.setState({errors : []});
    } else {
      this.setState({errors : errors});
    }
  }

  ajax (params) {
    let xhr = new XMLHttpRequest();
    
    this.setState({
      status    : 'loading',
      disabled  : true
    });

    xhr.open("GET", this.query + params, true);
    
    xhr.onreadystatechange = function () {
      if(xhr.readyState === 4 && xhr.status === 200) {
        let data = JSON.parse(xhr.responseText), dataResults = [];
        
        if(data && data.datafinder.results) {
          dataResults = data.datafinder.results.filter((r)=>{
            return r.State === data.datafinder['input-query'].State;
          });
        }

        this.setState({
          status    : 'done',
          response  : dataResults,
          disabled  : false
        });
      }
    }.bind(this);
    
    xhr.send();
  }

  render() {
    return (
      <div className="peopleSearch">
        <div className="peopleSearch-title"><h1>Welcome to Versium People Search</h1></div>
        <div className="peopleSearch-form">
          <SearchForm 
            submitHandler={this.submit}
            changeHandler={this.change}
            fields={this.state.fields}
            errors={this.state.errors}
            active={this.state.disabled}
          />
        </div>
        <div className="peopleSearch-results">
          <Results 
            status={this.state.status}
            response={this.state.response}
          />
        </div>
      </div>
    );
  }
}

export default App;
