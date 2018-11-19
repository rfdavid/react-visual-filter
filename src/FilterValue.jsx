import React from 'react';
import FilterSelect from './FilterSelect';
import DatePicker from "react-datepicker";
import moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";

class FilterValue extends React.Component {
  constructor(props) {
    super(props);

    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleListSelect = this.handleListSelect.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.state = {
      date: moment()
    }
  }

  componentDidMount() {
    if (this.valueInput) {
      this.valueInput.focus();
    }

    if ((this.props.type == 'date') && (this.props.value)) {
      this.setState({
        date: moment(this.props.value, this.props.dateFormat)
      });
    }
  }

  handleValueChange(e) {
    this.props.onValueChange(e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit();
  }

  handleListSelect(value) {
    this.props.onValueChange(value, true);
  }

  handleDateChange(date) {
    this.setState({date});
    this.props.onValueChange(
      moment(date).format(this.props.dateFormat).toString()
    );
  }

  render() {
    return(
      <div className="visual-value">
        {this.props.type == 'list' ? 
          <FilterSelect
            options={this.props.list}
            onSelect={this.handleListSelect}
          />
          : this.props.type == 'date' ?
          <div>
            <form onSubmit={this.handleSubmit}>
            <DatePicker
              selected={this.state.date}
              onSelect={this.handleDateChange}
              dateFormat={this.props.dateFormat}
              locale={this.props.locale}
              disabledKeyboardNavigation={true}
              startOpen={true}
            />
              <input type="submit" value="ok" />
            </form>
          </div>
          :
          <form onSubmit={this.handleSubmit}>
            <input 
              ref={(input) => {this.valueInput = input}}
              type="text" 
              value={this.props.value} 
              onChange={this.handleValueChange} 
            />
            <input type="submit" value="ok" />
          </form>
        }
      </div>
    )
  }
}

export default FilterValue;
