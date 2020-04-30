import React from 'react';

class FilterSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: (this.props.selected == null) ? true : false,
      selected: this.props.selected,
      cursor: 0,
    }

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleOptionClick = this.handleOptionClick.bind(this);
    this.handleSelectClick = this.handleSelectClick.bind(this);
  }

  handleKeyDown(e) {
    const { cursor } = this.state

    e.preventDefault()

    if (e.keyCode === 38 && cursor > 0) {
      this.setState( prevState => ({
        cursor: prevState.cursor - 1
      }))
    } else if (e.keyCode === 40 && cursor < this.props.options.length - 1) {
      this.setState( prevState => ({
        cursor: prevState.cursor + 1
      }))
    } else if (e.keyCode === 13 ) {
      this.handleOptionEnter(cursor)
    }
  }

  handleSelectClick() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  handleOptionEnter(cursor) {
    name = this.props.options[cursor].name
    
    this.handleOptionClick(name)
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
      <div className={'visual-selector ' + 
        (this.state.expanded ? 'expanded' : '') +
        ' ' + this.props.className
      }>
        {this.state.selected &&
          <div onClick={this.handleSelectClick} className="visual-label">
            {this.props.options.find(o => o.name === this.state.selected).label}
          </div>
        }
        {this.state.expanded &&
          <div onKeyDown={this.handleKeyDown}
               tabIndex="0">
            <ul className="visual-options">
              {this.props.options.map(
                (item, i) => <li key={item.name}
                                 className={this.state.cursor === i ? 'active' : null}  
                                 onClick={() => this.handleOptionClick(item.name)}>
                              {item.label}
                            </li>
              )}
            </ul>
          </div>
        }
      </div>
    );
  }
}

export default FilterSelect;
