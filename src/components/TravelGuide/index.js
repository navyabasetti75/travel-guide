import {Component} from 'react'

import Loader from 'react-loader-spinner'
import TravelPlaceList from '../TravelPlaceList'
import './index.css'

const apiStatusCon = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TravelGuide extends Component {
  state = {placesList: [], apiStatus: apiStatusCon.initial}

  componentDidMount() {
    this.getTravelPlaces()
  }

  renderFormattedData = data => ({
    id: data.id,
    name: data.name,
    imageUrl: data.image_url,
    description: data.description,
  })

  getTravelPlaces = async () => {
    this.setState({apiStatus: apiStatusCon.inProgress})
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedList = fetchedData.packages.map(eachPackage =>
        this.renderFormattedData(eachPackage),
      )
      this.setState({apiStatus: apiStatusCon.success, placesList: updatedList})
    }
  }

  renderLoader = () => (
    <div data-testid="loader" className="position">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderPlacesView = () => {
    const {placesList} = this.state
    return (
      <ul className="places-list-container">
        {placesList.map(eachPlace => (
          <TravelPlaceList eachPlace={eachPlace} key={eachPlace.id} />
        ))}
      </ul>
    )
  }

  renderViewBasedOnApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusCon.success:
        return this.renderPlacesView()
      case apiStatusCon.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="travel-guide-container">
        <h1 className="main-heading">Travel Guide</h1>
        <hr className="separator" />
        {this.renderViewBasedOnApiStatus()}
      </div>
    )
  }
}

export default TravelGuide
