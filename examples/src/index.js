import React from 'react';
import {render} from 'react-dom';
import VisualFilter from '../../src';

const FIELDS = [
  {name: 'name', type: 'text', label: 'Nome', operators: ['eq', 'ne', 'ct', 'nct', 'sw', 'fw', 'in', 'nn']},
  {name: 'age', type: 'number', label: 'Age', operators: ['eq', 'ne',  'gt', 'lt']},
  {name: 'birth_date', type: 'date', label: 'Birth date', operators: ['eq', 'ne', 'gt', 'lt', 'in', 'nn']},
  {name: 'email', type: 'text', label: 'Email', operators: ['eq', 'ne', 'ct', 'nct', 'sw', 'fw', 'in', 'nn']},
  {name: 'preference', type: 'list',  label: 'Language', operators: ['eq', 'ne'], list: [
    {name: 'python', label: 'Python'},
    {name: 'javascript', label: 'JavaScript'},
    {name: 'go', label: 'Go'},
    {name: 'dotnet', label: '.NET'}
  ]}
];

const SAVED_CONDITIONS = [
  {id: 'cond-1', field: 'name', operator: 'eq', value: 'Elliot'},
  {id: 'cond-2', field: 'preference', operator: 'eq', value: 'javascript'},
  {id: 'cond-3', field: 'birth_date', operator: 'lt', value: '1984-11-25'}
]

class App extends React.Component {
  handleChange(data) {
    console.log(data);
  }

  render() {
    return(
      <VisualFilter 
        fields={FIELDS} 
        conditions={SAVED_CONDITIONS} 
        dateFormat="Y-M-D"
        locale="en"
        handlerTitle="+ add filter"
        keepAddHandler={true}
        onChange={this.handleChange} />
    )
  }
}

render(<App />, document.getElementById("root"));
