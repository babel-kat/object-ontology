import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

class Filter extends React.Component {
  constructor () {
    super()
    this.filter = this.filter.bind(this)
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
    this.state = {
      active: false
    }
  }

  getClassNames () {
    return classNames('filter-item an-cl', {
      'active': this.state.active,
      'first-level': this.props.depth === 0
    })
  }

  filter () {
    this.props.filter({...this.props})
    this.setState({active: true})
  }

  onMouseEnter () {
    this.props.hoverFilter({...this.props})
  }

  onMouseLeave () {
    this.props.hoverFilter({})
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.curFilter !== '' && this.props.id !== nextProps.curFilter.id) {
      this.setState({active: false})
    }
  }

  render () {
    if (!this.props) {
      return null
    }

    return (
      <li className={this.getClassNames()} onClick={this.filter} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        {this.props.title}
      </li>
    )
  }
}

const mapStateToProps = state => ({
  curFilter: state.filters
})

export default connect(mapStateToProps)(Filter)
