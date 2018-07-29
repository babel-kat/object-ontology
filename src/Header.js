import React from 'react'
import classNames from 'classnames'

export default class Header extends React.Component {
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

  getClassNames () {
    return classNames('header', this.props.classes)
  }

  render () {
    return (
      <section id={this.props.id} className={this.getClassNames()}>
        <h1 className='an-cl'>{this.props.title}</h1>
        <h2 className='an-cl'>{this.props.subtitle}</h2>
      </section>
    )
  }
}
