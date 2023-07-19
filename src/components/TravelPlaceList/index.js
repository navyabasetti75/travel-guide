import './index.css'

const TravelPlaceList = props => {
  const {eachPlace} = props

  const {name, imageUrl, description} = eachPlace
  return (
    <li className="place-container">
      <img src={imageUrl} alt={name} className="place-image" />
      <h1 className="heading">{name}</h1>
      <p className="description">{description}</p>
    </li>
  )
}
export default TravelPlaceList
