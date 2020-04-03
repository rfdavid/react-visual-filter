import React from 'react';
import FilterSelect from './FilterSelect';

class FilterSearch extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.state = {
      filterValue: null,
      filteredOptions: [],
      showForm: null,
      expanded: (this.props.selected == null) ? true : false,
      selected: this.props.selected,
      inputValue: '',
      cursor: 0
    }
  }

  handleClick() {
    if (this.state.showForm == false) {
      this.setState({
        showForm: true,
        expanded: true
      })
    }
  }

  handleOptionClick(name) {
    this.props.onSelect(name);
    this.setState({
      expanded: false,
      selected: name
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ showForm: nextProps.showForm });  
  }

  componentWillMount() {
    this.setState({
      filteredOptions: this.props.options,
      showForm: this.props.showForm
    })
  }

  handleSubmit(e) {
    e.preventDefault()
  }

  handleValueChange(e) {
    const filteredOptions =  this.props.options.filter(function(option) {
      return option.label.toLowerCase().startsWith(e.target.value.toLowerCase())
    })

    this.setState({
      filteredOptions: filteredOptions,
      inputValue: e.target.value
    })
  }

  render() {
    const { cursor } = this.state

    return(
      <div className="filter-search" onClick={this.handleClick}>
        <div className={'visual-selector ' + 
          (this.state.expanded ? 'expanded' : '') + ' fields'
        }>
          {this.state.showForm &&
            <form onSubmit={this.handleSubmit}>
              <input 
                ref={(input) => {this.valueInput = input}}
                type="text" 
                className={this.props.type}
                value={this.state.inputValue} 
                onChange={this.handleValueChange} 
                onKeyDown={ this.handleKeyDown }
                autoFocus
              />
            </form>
          }

          {this.state.selected && !this.state.showForm &&
            <div onClick={this.handleSelectClick} className="visual-label">
              {
                this.state.filteredOptions.find(o => o.name === this.state.selected).label
              }
            </div>
          }
          {this.state.expanded &&
            <ul className="visual-options">
              {this.state.filteredOptions.map(
                (item, i) => <li key={item.name}
                                 className={cursor === i ? 'active' : null} 
                                 onClick={() => this.handleOptionClick(item.name)}>
                                 {item.label}</li>
              )}
              {this.state.filteredOptions && this.state.filteredOptions.length == 0 &&
                `Nada encontrado contendo "${this.state.inputValue}".`
              }
            </ul>
          }
        </div>
      </div>
    );
  }
}

export default FilterSearch;

// https://stackoverflow.com/questions/42036865/react-how-to-navigate-through-list-by-arrow-keys

// TODO: Keyboard navigation
