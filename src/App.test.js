import React from 'react';
import {getStates, validate, buildQuery, errorClass} from './controllers/controllers';

const test_obj_1 = {
	d_first : 'Chris',
	d_last  : 'Baumann',
	d_state : 'WA'
}

const test_obj_2 = {
	d_first : '  ',
	d_last  : 'Baumann',
	d_state : 'WA'
}

const test_obj_3 = {
	d_first : '  Chris',
	d_last  : '  ',
	d_state : ''
}

describe('Controller Unit Tests', () => {
  test('errorClass Controller', () => {
    expect(errorClass(['d_first'], 'd_first')).toEqual('error')
    expect(errorClass(['d_last'], 'd_first')).toEqual('')
    expect(errorClass([], 'd_state')).toEqual('')
  })

   test('validate Controller', () => {
    expect(validate(test_obj_1)).toEqual([])
    expect(validate(test_obj_2)).toEqual(['d_first'])
    expect(validate(test_obj_3)).toEqual(['d_last', 'd_state'])
  }) 

   test('buildQuery Controller', () => {
    expect(buildQuery(test_obj_1)).toEqual('&d_first=Chris&d_last=Baumann&d_state=WA')
  })    
})

