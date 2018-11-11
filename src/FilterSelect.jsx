import React from 'react';

class FilterSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: (this.props.selected == null) ? true : false,
      selected: this.props.selected,
    }

    this.handleSelectClick = this.handleSelectClick.bind(this);
    this.handleOptionClick = this.handleOptionClick.bind(this);
  }

  handleSelectClick() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  handleOptionClick(name) {
    this.props.onSelect(name);
    this.setState({
      expanded: false,
      selected: name
    });
  }

  render() {
    return(
      <div className={'visual-selector ' + (this.state.expanded ? 'expanded' : '') }>
        {this.state.selected &&
          <div onClick={this.handleSelectClick} className="visual-label">
            {this.props.options.find(o => o.name === this.state.selected).label}
          </div>
        }
        {this.state.expanded &&
          <ul className="visual-options">
            {this.props.options.map(
              item => <li key={item.name} 
                          onClick={() => this.handleOptionClick(item.name)}>
                        {item.label}
                      </li>
            )}
          </ul>
        }
      </div>
    );
  }
}

export default FilterSelect;
