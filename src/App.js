import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import 'normalize-css/normalize.css'
import 'html5-boilerplate/dist/css/main.css'
import './App.css'
import ImageLoader from './ImageLoader.js'
import Main from './Main.js'
import ChairDetails from './ChairDetails.js'
import Filters from './Filters.js'
import Header from './Header.js'
import chairs from './api/chairs.json'

const imgLoader = new ImageLoader()
imgLoader.loadImages()

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      filters: [],
      chairs: [],
      modal: {open: false, chair: null},
      title: 'Ο Μετασχηματισμός του Είδους της Σημαίνουσας Μορφής',
      subtitle: '// Εργαλεία Διαχείρισης του Αρχείου'
    }
    this.setTitle()
  }

  componentDidMount () {
    chairs['chairs'].sort((a, b) => a.year - b.year)
    this.setState(chairs)
  }

  setTitle () {
    document.title = this.state.title + ' ' + this.state.subtitle
  }

  render () {
    return (
      <main className='App'>
        <Header title={this.state.title} subtitle={this.state.subtitle} id='main-header' classes='main-header' />
        <ChairDetails open={this.props.modal.open} {...this.props.modal.chair} />
        <Filters filters={this.state.filters} />
        <Switch>
          <Route exact path='/'
            render={(props) => <Main chairs={this.state.chairs} filters={this.props.filters} images={imgLoader.getImages()} title={this.state.title} subtitle={this.state.subtitle} />}
          />
        </Switch>
      </main>
    )
  }
}

const mapStateToProps = state => ({
  modal: state.chairs,
  filters: state.filters
})

export default connect(mapStateToProps)(App)
