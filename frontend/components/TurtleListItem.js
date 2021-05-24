import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';

/*
  Component used for displaying one element on the turtle list.
*/
export default class TurtleListItem extends Component {
  render() {
    const { item, onPressPage, navigation, refresh } = this.props;

    return (
      <ListItem
        leftAvatar={{ source: { uri: item.avatar } }}
        title={
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              {item.mark}
            </Text>
          </View>
        }
        subtitle={
          <View>
            <Text style={{ paddingLeft: 2, fontSize: 14 }}>
              {item.sex && item.sex[0].toUpperCase() + item.sex.slice(1)}
            </Text>
          </View>
        }
        chevron
        bottomDivider
        onPress={() => {
          navigation.navigate(onPressPage, {
            turtleId: item.id,
            refreshTurtleList: refresh,
          });
        }}
      />
    );
  }
}
