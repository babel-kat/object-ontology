import React from 'react'
import classNames from 'classnames'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { closeChair } from './actions/ActionCreators'

class ChairDetails extends React.Component {
  constructor () {
    super()
    this.cloneModal = this.cloneModal.bind(this)
    this.getClassNames = this.getClassNames.bind(this)
  }

  getClassNames () {
    return classNames('chair-details modal-wrapper', {
      'open': this.props.open || false
    })
  }

  cloneModal () {
    let {open, ...chair} = this.props
    this.props.actions.closeChair(chair)
  }

  render () {
    if (!this.props.image) {
      return null
    }
    const style = {
      maxHeight: window.innerHeight
    }
    return (
      <section className={this.getClassNames()} onClick={this.cloneModal} >
        <div className='modal-container modal-image-holder'>
          <div className='modal-content'>
            <div className='model-figure'>
              <figure>
                <img src={this.props.image} alt={this.props.title} className='model-img' style={style} />
                <figcaption>
                  <div className='model-bottom-bar'>
                    <div className='model-title'>{this.props.title}</div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ closeChair }, dispatch)
})

export default connect(null, mapDispatchToProps)(ChairDetails)
