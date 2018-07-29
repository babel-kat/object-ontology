import React from 'react'
import _ from 'lodash'
import Chair from './Chair.js'

export default class Chairs extends React.Component {
  render () {
    const chairs = this.props.chairs
    .filter((item) => {
      if (_.isEmpty(this.props.filters)) {
        return true
      }
      return item.tags.includes(this.props.filters.id)
    })
    .map((chair, index) => {
      return <Chair {...chair} key={index} image={this.props.images[chair.file]} />
    })

    return (
      <div id='chairs'>
        {chairs}
      </div>
    )
  }
}
