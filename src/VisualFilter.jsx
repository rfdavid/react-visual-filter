import React from 'react';
import FilterChip from './FilterChip';
import FilterSelect from './FilterSelect';
import FilterValue from './FilterValue';
import FilterSearch from './FilterSearch';
import {uniqueId,setIdCounter} from './utils/uniqueid';
import {i18n,setLang} from './utils/i18n';
import './styles.css';

class VisualFilter extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showCondition: false,
      currentConditionId: null,
      conditions: this.props.conditions || [],
      field: null,
      operator: null,
      value: null,
      showForm: true
    };

    this.addFilter = this.addFilter.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleOperatorChange = this.handleOperatorChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.saveCondition = this.saveCondition.bind(this);
    this.removeCondition = this.removeCondition.bind(this);
    this.editCondition = this.editCondition.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  addFilter() {
    this.setState({
      currentConditionId: null,
      field: null,
      operator: null,
      value: null,
      type: null,
      showCondition: true,
      showForm: true
    })
  }

  handleFieldChange(field) {
    var fieldType = this.props.fields.find(o => o.name === field).type;

    this.setState({
      field: field,
      type: fieldType,
      operator: null,
      showForm: false
    })
  }

  handleOperatorChange(operator) {
    if ((operator == 'in') || (operator == 'nn')) {
      this.setState({
          operator: operator,
          value: null
      }, () => this.saveCondition())
    } else {
      this.setState({
        operator: operator
      })
    }
  }

  saveCondition() {
    let conditions = this.state.conditions;
    
    if (this.state.currentConditionId) {
      conditions = this.state.conditions.filter(el => el.id != this.state.currentConditionId)
    } 

    this.setState({
      conditions: [...conditions, {
        id: this.state.currentConditionId || uniqueId('cond-'),
        field: this.state.field,
        type: this.state.type,
        operator: this.state.operator,
        value: this.state.value
        }
      ],
      field: null,
      operator: null,
      value: null,
      type: null,
      currentConditionId: null,
      showCondition: false
    }, () => this.props.onChange(this.state.conditions))
  }

  editCondition(id) {
    let condition = this.state.conditions.find(o => o.id === id)

    this.setState({
      currentConditionId: id,
      field: condition.field,
      operator: condition.operator,
      type: condition.type,
      value: condition.value,
      showCondition: true
    }, () => this.props.onChange(this.state.conditions))
  }

  removeCondition(id) {
    this.setState({
      conditions: this.state.conditions.filter(el => el.id != id)
    }, () => this.props.onChange(this.state.conditions))
  }

  handleValueChange(value, save = false) {
    this.setState({
      value: value
    }, save ? () => this.saveCondition() : null) 
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);

    if (this.props.locale) {
      setLang(this.props.locale);
    }

    if (this.props.conditions) {
      setIdCounter(this.props.conditions.length + 1);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick(e) {
    if (this.node.contains(e.target)) {
      return;
    }
    
    this.setState({
      field: null,
      operator: null,
      value: null,
      currentConditionId: null,
      showCondition: false
    })
  }

  render() {
    const fields = this.props.fields;
    const getFieldByName = (name) => fields.find(o => o.name === name);

    return(
      <div className="visual-filter" ref={node => this.node = node}>
        {this.state.conditions.map((c) => 
          (c.id != this.state.currentConditionId) &&
            <FilterChip 
              label={getFieldByName(c.field).label} 
              type={getFieldByName(c.field).type} 
              operator={c.operator}
              value={getFieldByName(c.field).type == 'list' ? 
                getFieldByName(c.field).list.find(x => x.name === c.value).label 
                : c.value}
              key={c.id}
              id={c.id}
              numberPrefix={this.props.numberPrefix}
              thousandSeparator={this.props.thousandSeparator}
              decimalSeparator={this.props.decimalSeparator} 
              onRemove={this.removeCondition}
              onEdit={this.editCondition}
          />
        )}

        {this.state.showCondition &&
          <div className="visual-conditions">
            <FilterSearch
              key={'f-'+this.state.currentConditionId}
              options={fields}
              onSelect={this.handleFieldChange}
              selected={this.state.field}
              showForm={this.state.showForm}
            />
            {this.state.field &&
              <FilterSelect
                key={'c-'+this.state.field}
                options={operators(
                  getFieldByName(this.state.field).operators
                )}
                className="operators"
                onSelect={this.handleOperatorChange}
                selected={this.state.operator}
              />
            }
            {this.state.operator &&
              <FilterValue 
                type={getFieldByName(this.state.field).type}
                list={getFieldByName(this.state.field).list}
                dateFormat={this.props.dateFormat || 'Y-M-D'}
                locale={this.props.locale}
                thousandSeparator={this.props.thousandSeparator}
                decimalSeparator={this.props.decimalSeparator} 
                numberPrefix={this.props.numberPrefix}
                value={this.state.value || ''}
                onSubmit={this.saveCondition}
                onValueChange={this.handleValueChange}
              />
            }
          </div>
        }
        {(this.props.keepAddHandler || !this.state.showCondition) &&
          <div onClick={this.addFilter} className="add-filter">
            {this.props.addFilterText || '+ add filter'}
          </div>
        }
      </div>
    );
  }
}

function operators(ops) {
  let conditionOperators = [];

  ops.forEach((o) => {
    conditionOperators.push({name: o, label: i18n(o)});
  });

  return conditionOperators;
}

export default VisualFilter;
