import React from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { openChair } from './actions/ActionCreators'

class Chair extends React.Component {
  constructor () {
    super()
    this.openChair = this.openChair.bind(this)
  }

  openChair () {
    this.props.actions.openChair(this.props)
  }

  hasTag () {
    return this.props.tags.includes(this.props.hoverFilters.id)
  }

  getClassNames () {
    return classNames('chair-item an-op', this.props.tags, {
      filtered: !_.isEmpty(this.props.hoverFilters) && !this.hasTag()
    })
  }

  render () {
    if (!this.props.image) {
      return null
    }
    const styles = {
      backgroundImage: 'url(' + this.props.image + ')'
    }

    return (
      <article className={this.getClassNames()} style={styles} onClick={this.openChair} />
    )
  }
}

const mapStateToProps = state => ({
  hoverFilters: state.hoverFilters
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ openChair }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Chair)
