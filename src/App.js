import React, { Component } from 'react';

import Results from './results';
import states from './states.json';
import './app.css';

class App extends Component { 
  constructor (props) {
    super(props);

    this.query  = '/proxy?service=phone&k2=9abbxna7d2b65ivia3p9vljs&cfg_maxrecs=100';
    this.ajax   = this.ajax.bind(this);
    this.submit = this.submit.bind(this);
    this.fieldError = this.fieldError.bind(this);
    this.statelist = Object.keys(states).map((s,i) => (<option key={i} value={s}>{states[s]}</option>));
    
    //
    
    this.state = {
      status    : null,
      response  : [],
      disabled  : false,
      errors    : [] 
    }    
  }

  fieldError (e) {
    if(this.state.errors.indexOf(e) >= 0) {
      return 'error';
    } else {
      return '';
    }
  }

  submit (e) {
    e.preventDefault();

    const errors = [], 
          params = Object.keys(this.refs).reduce((acc,a) => {
            let field = this.refs[a].value.trim();
            if(!field) {
              errors.push(a);
              return acc;
            } else {
              return acc + '&' + a + "=" + field;
            }
          }, '');

    if (!errors.length) {
      this.ajax(params);
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
          <form onSubmit={this.submit}>
            <div>
              <label className={this.fieldError('d_first')} htmlFor="d_first">FirstName</label>
              <input ref="d_first" name="d_first" type="text" placeholder="eg. John" required disabled={this.state.disabled}/>
            </div>
            <div>
              <label className={this.fieldError('d_last')} htmlFor="d_last">LastName</label>
              <input ref="d_last" name="d_last" type="text" placeholder="eg. Smith" required disabled={this.state.disabled}/>
            </div>
            <div>
              <label className={this.fieldError('d_state')} htmlFor="d_state">State</label>
              <select ref="d_state" name="d_state" placeholder="eg. LA" required disabled={this.state.disabled}>
                {this.statelist}
              </select>
            </div>
            <div>
              <input type="submit" value="Submit" />
            </div>
          </form>
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
