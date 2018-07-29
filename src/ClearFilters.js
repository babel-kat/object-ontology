import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import CloseBtn from './CloseBtn.js'

class ClearFilters extends React.Component {
  constructor () {
    super()
    this.state = {
      active: false
    }

    this.close = this.close.bind(this)
  }

  close () {
    this.props.close()
  }

  render () {
    return (
      <div className='clear-filters an-cl'>
        <div className='header filter-header'>
          <h1 className='an-cl' onClick={this.close}>{this.props.title}</h1>
          <h2 className='an-cl'>{this.props.subtitle}</h2>
        </div>
        <CloseBtn close={this.close} active={!_.isEmpty(this.props.curFilter)} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  curFilter: state.filters
})

export default connect(mapStateToProps)(ClearFilters)
