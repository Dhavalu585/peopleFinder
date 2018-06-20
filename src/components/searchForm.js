import React from 'react';

import states from '../json/states.json';
import '../styles/form.css';

import {getStates, errorClass} from '../controllers/controllers';

const SearchForm = ({submitHandler, changeHandler, fields, errors, active}) => (
	<form onSubmit={submitHandler}>
		<div>
			<div><label className={errorClass(errors, 'd_first')} htmlFor="d_first">FirstName</label></div>
			<input onChange={changeHandler} value={fields.d_first} name="d_first" type="text" placeholder="eg. John" disabled={active}/>
		</div>
		<div>
			<div><label className={errorClass(errors, 'd_last')} htmlFor="d_last">LastName</label></div>
			<input onChange={changeHandler} value={fields.d_last} name="d_last" type="text" placeholder="eg. Smith" disabled={active}/>
		</div>
		<div>
			<div><label className={errorClass(errors, 'd_state')} htmlFor="d_state">State</label></div>
			<select onChange={changeHandler} value={fields.d_state} name="d_state" placeholder="eg. LA" disabled={active}>
				<option value="">eg. LA</option>
				{getStates(states)}
			</select>
		</div>
		<div>
			<div></div>
			<input type="submit" value="Submit" />
		</div>
	</form>
);

export default SearchForm;