import React, { Component } from 'react';
import {View, Text} from 'react-native';
import { ListItem } from 'react-native-elements';

/*
  Component used for displaying one element on the turtle list.
*/
export default class TurtleListItem extends Component {
  render() {
      return (
        <ListItem
          leftAvatar={{source: {uri: this.props.item.avatar}} }
          title={
            <View>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>{this.props.item.mark}</Text>
            </View>
          }
          subtitle={
            <View>
              <Text style={{paddingLeft: 2, fontSize: 14}}>{this.props.item.sex[0].toUpperCase() + this.props.item.sex.slice(1)}</Text>
            </View>
          }
          chevron
          bottomDivider
          onPress={() => {this.props.navigation.navigate(this.props.onPressPage, {turtleId: this.props.item.id})}}
        />
      );
  }
}