import React from 'react';

const getStates = (obj) => {
	return Object.keys(obj).map((k,i) => (<option value={k} key={i}>{obj[k]}</option>));
}

const validate = (obj) => {
	return Object.keys(obj).filter((key) => {
		return !obj[key].trim();
	});
}

const buildQuery = (obj) => {
	return Object.keys(obj).reduce((acc, a) => {
		return acc + '&' + encodeURIComponent(a) + "=" + encodeURIComponent(obj[a]);
	}, '');
}

const errorClass = (arr, inp) => {
	if(arr.indexOf(inp) >= 0) {
		return 'error';
	} else {
		return '';
	}
}

export {getStates, validate, buildQuery, errorClass};
