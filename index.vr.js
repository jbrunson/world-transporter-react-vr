import React, { Component } from 'react';
import { View, Text, Pano, AppRegistry, asset, StyleSheet } from 'react-vr';

const places = [
  { title: 'Island Paradise', image: 'island-garden.jpg'},
  { title: 'Museum', image: 'museum.jpg'},
  { title: 'Winter Outdoors', image: 'winter-outdoor.jpg'},
  { title: 'Starry Night', image: 'starry-sky.jpg'}
];

class WorldTour extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
      place: 'starry-sky.jpg'
    };
  }

  toggleMenu() {
    this.setState((prevState) => {
      return {showMenu: !prevState.showMenu};
    });
  }

  handleItemEnter = (place) => {
    this.setState({place: place.image});
  }

  renderMenuItems = () => {
    return (
      <View style={styles.menu}>
        {places.map((place, i) => {
          return (
            <View
              onEnter={() => this.handleItemEnter(place)}
              style={styles.menuItem}
              key={i}>
              <Text style={styles.menuItemText}>{place.title}</Text>
            </View>
          )
        })}
      </View>
    );
  }

  render() {
    return (
      <View>
        <Pano source={asset(this.state.place)}></Pano>
        <View
          onEnter={() => this.toggleMenu()}
          style={styles.menuButton}>
          <Text style={styles.menuButtonText}>
            {this.state.showMenu ? 'Close Menu' : 'Open Menu'}
          </Text>
        </View>
        {
          this.state.showMenu
            ? this.renderMenuItems()
            : <View />
        }
      </View>
    );
  }
};

const styles = StyleSheet.create({
  menuButton: {
    backgroundColor: '#fff',
    borderRadius: 0.25,
    width: 0.5,
    height: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.01,
    transform: [
      {translate: [-2, 0, -5]}
    ]
  },
  menuButtonText: {
    textAlign: 'center',
    fontSize: 0.15,
    color: '#000'
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 1,
    height: 1,
    borderRadius: 0.5,
    borderWidth: 0.02,
    backgroundColor: '#fff'
  },
  menuItemText: {
    fontSize: 0.2,
    textAlign: 'center',
    color: '#000'
  },
  menu: {
    width: 5,
    height: 1.25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    transform: [
      {translate: [-2, 0, -7.5]}
    ]
  }
})

AppRegistry.registerComponent('WorldTour', () => WorldTour);
