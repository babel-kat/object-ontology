import React from 'react'
import { connect } from 'react-redux'
import Chairs from './Chairs.js'
import Header from './Header.js'

class Main extends React.Component {
  render () {
    return (
      <section id='main-wrapper'>
        <Header title={this.props.curFilter.big_title} subtitle={this.props.curFilter.desc} classes='sub-header' />
        <Chairs chairs={this.props.chairs} filters={this.props.filters} images={this.props.images} />
      </section>
    )
  }
}

const mapStateToProps = state => ({
  curFilter: state.filters
})

export default connect(mapStateToProps)(Main)
