import { Component, Prop, h, Watch } from '@stencil/core';
import * as L from 'leaflet'

@Component({
  tag: 'chicago-divvy-map',
  styleUrl: '../../../node_modules/leaflet/dist/leaflet.css',
  shadow: false,
})
export class MyComponent {
  /**
   * An array of locations
   */
  @Prop() stations

  @Watch('stations')
  handleChange() {
    this.setMarkers();
  }
  map
  private setMap = () => {
    this.map = L.default.map('map', {
      center: [41.8781, -87.6298],
      zoom: 13
    })
    const mapLink =
      '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.default.tileLayer(
      'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors',
        maxZoom: 18,
      }).addTo(this.map);
  }
  private setMarkers = () => {
      if (this.stations) {
        for (var i = 0; i < this.stations.length; i++) {
          L.default.marker([this.stations[i].lat, this.stations[i].lon])
            .bindPopup(this.stations[i].name)
            .addTo(this.map);
      }
    
    }
  }
  componentDidLoad() {
    this.setMap();
  }
  style = {
    height: '100vh',
    width: '100vw'
  }
  render() {
    console.log('render called')
    return <div id="map" style={this.style}></div>
  }
}
