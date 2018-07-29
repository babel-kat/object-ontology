import React from 'react'
import classNames from 'classnames'

export default class CloseBtn extends React.Component {
  getClassNames () {
    return classNames('close-button an-op', {
      'active': this.props.active
    })
  }

  render () {
    return (
      <span id='clear-filters' className={this.getClassNames()} onClick={this.props.close} />
    )
  }
}
