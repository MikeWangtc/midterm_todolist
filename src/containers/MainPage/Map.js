import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
const API_KEY = 'AIzaSyBG3z7B46XHSLNDKTmxHPCioAlwE934Xt4';
const style_wrapper = {
	display:"flex",
	flexDirection:"column",
	justifyContent:"center",
	alignItem:"center",
	width:"80vw", // DashBoard accounts for 20vw
	height: '60vh',
}

const MyMapComponent = compose(
	withProps({
		//googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
		googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: <div id='contEle'style={style_wrapper} />,
		mapElement: <div id='mapEle' style={{ 
			height: `100%`,
			margin: '0 20px 20px 20px',
		}} />,
	}),
	withScriptjs,
	withGoogleMap
)((props) => {
	const { position, markers } = props;
	return(
		<GoogleMap
			defaultZoom={13}
			defaultCenter={{ lat: position.lat, lng: position.lng }}>

			{props.isMarkerShown && <Marker position={{ lat: props.position.lat, lng: props.position.lng }} onClick={props.onMarkerClick} />}
			{markers.map(marker => (
				<Marker position={{
					lat: parseFloat(marker.location.lat),
					lng: parseFloat(marker.location.lng),
				}} 
				/>
			)) }
		</GoogleMap>
	)
}
	
);


class MyFancyComponent extends Component {
  state = {
    isMarkerShown: false,
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
	const { position, displayList } = this.props;
	return (
		<MyMapComponent
			isMarkerShown={this.state.isMarkerShown}
			onMarkerClick={this.handleMarkerClick}
			position={position}
			markers={displayList}
		/>
    )
  }
}
MyFancyComponent.propTypes = {
	position: PropTypes.object.isRequired,
	displayList: PropTypes.array.isRequired,
}
export default MyFancyComponent;
