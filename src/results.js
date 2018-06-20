import React from 'react';
import './results.css';

const Results = ({status, response}) => {
	if(!status && !response.length) {
		return <div></div>;
	} else if (status === 'loading') {
		return <div className="loader"></div>;
	} else if (status === 'done' && response.length) {
		return	<div>
			   		{response.map((r,i)=>(
			   			<div className="result" key={i}>
			   				<span>Result #{i+1}</span>
			   				<ul>
			   					<li>FirstName: {r.FirstName}</li>
			   					<li>LastName: {r.LastName}</li>
			   					<li>Address: {r.Address}</li>
			   					<li>City: {r.City}</li>
			   					<li>State: {r.State}</li>
			   				</ul>
			   			</div>
			   		))}
			   	</div>
	} else if (status === 'done' && !response.length) {
		return	<div className="no-results">No results Found</div>
	}
}

export default Results;