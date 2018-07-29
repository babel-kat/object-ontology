import React from 'react'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { filter, hoverFilter } from './actions/ActionCreators'
import Filter from './Filter.js'
import ClearFilters from './ClearFilters.js'

class Filters extends React.Component {
  constructor () {
    super()
    this.filterItems = this.filterItems.bind(this)
    this.state = {
      'title': 'Το Αρχείο',
      'subtitle': '// Υπόθεση Ομοιότητας'
    }
  }

  filterItems (filter) {
    this.props.actions.filter(filter)
  }

  hoverFilter (filter) {
    this.props.actions.hoverFilter(filter)
  }

  buildFilters () {
    return (
      Array.from(this.props.filters, filter => {
        let depth = -1
        return this.walkOnFilter(filter, depth)
      }
      )
    )
  }

  walkOnFilter (crumb, depth) {
    depth += 1
    return (
      <ul className='filter-menu'>
        {
          Object.keys(crumb).reduce((items, key) => {
            const node = crumb[key]

            items.push(<Filter {...node} depth={depth} id={key} key={key} filter={(filter) => this.filterItems(filter)} hoverFilter={(filter) => this.hoverFilter(filter)} />)

            Array.from(node['children'], obj => {
              if (!_.isEmpty(obj)) {
                items.push(this.walkOnFilter(obj))
              }

              return obj
            })

            return items
          }, [])
      }
      </ul>
    )
  }

  render () {
    let filters = this.buildFilters()

    return (
      <section id='filters'>
        <ClearFilters title={this.state.title} subtitle={this.state.subtitle} classes='filter-header' close={() => this.filterItems({})} />
        <nav id='nav' className='nav'>
          {filters}
        </nav>
      </section>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ filter, hoverFilter }, dispatch)
})

export default connect(null, mapDispatchToProps)(Filters)
