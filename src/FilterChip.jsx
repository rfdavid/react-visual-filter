import React from 'react';
import {i18n} from './utils/i18n';

class FilterChip extends React.Component {
  constructor(props) {
    super(props);

    this.removeCondition = this.removeCondition.bind(this);
    this.editCondition = this.editCondition.bind(this);
  }

  editCondition() {
    this.props.onEdit(this.props.id);
  }

  removeCondition() {
    this.props.onRemove(this.props.id);
  }

  render() {
    return(
      <div className="chip">
        <span onClick={this.editCondition}>
          <b>{this.props.label} </b> 
          {i18n(this.props.operator)}
          <b> {this.props.value} </b>
        </span>
        <span onClick={this.removeCondition}>&times;</span>
      </div>
    )
  }
}

export default FilterChip;
