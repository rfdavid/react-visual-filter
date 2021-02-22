import React from 'react';
import FilterSelect from './FilterSelect';
import DatePicker from "react-datepicker";
import moment from 'moment';
import NumberFormat from 'react-number-format';

import "react-datepicker/dist/react-datepicker.css";

class FilterValue extends React.Component {
  constructor(props) {
    super(props);

    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleListSelect = this.handleListSelect.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.state = {
      startDate: moment(),
      endDate: moment()
    }
  }

  componentDidMount() {
    if (this.valueInput) {
      this.valueInput.focus();
    }

    if ((this.props.type == 'date') && (this.props.value)) {
      this.setState({
        startDate: moment(this.props.value, this.props.dateFormat),
         endDate: moment(this.props.value, this.props.dateFormat)
      });
    }
  }

  handleValueChange(e) {
    this.props.onValueChange(e.target.value);
  }

  handleNumberChange(values) {
    const {formattedValue, value} = values;
    this.props.onValueChange(value);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit();
  }

  handleListSelect(value) {
    this.props.onValueChange(value, true);
  }

  handleDateChange(dates) {
    const [start, end] = dates;
    this.setSate({
      startDate: start,
      endDate:end})
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
              selected={this.state.startDate}
              onChange={this.handleDateChange}
              dateFormat={this.props.dateFormat}
              locale={this.props.locale}
              disabledKeyboardNavigation={true}
              startOpen={true}
              selectsRange={true}
              inline={true}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
            />
              <input type="submit" value="ok" />
            </form>
          </div>
          : this.props.type == 'number' ?
            <form onSubmit={this.handleSubmit}>
              <NumberFormat
              getInputRef={(input) => {this.valueInput = input}}
              className={this.props.type}
              value={this.props.value} 
              thousandSeparator={this.props.thousandSeparator}
              decimalSeparator={this.props.decimalSeparator} 
              prefix={this.props.numberPrefix} 
              onValueChange={this.handleNumberChange}
              />
              <input type="submit" value="ok" />
            </form>
          :
          <form onSubmit={this.handleSubmit}>
            <input 
              ref={(input) => {this.valueInput = input}}
              type="text" 
              className={this.props.type}
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