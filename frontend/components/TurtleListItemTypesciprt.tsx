import React from 'react'
import { View, Text } from 'react-native'
import { ListItem } from 'react-native-elements'

/*
  Component used for displaying one element on the turtle list.
  TODO: Remove all any's
*/
const TurtleListItem = (props: any) => {
  return (
    <ListItem
      leftAvatar={{ source: { uri: props.item.avatar } }}
      title={
        <View>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            {props.item.mark}
          </Text>
        </View>
      }
      subtitle={
        <View>
          <Text style={{ paddingLeft: 2, fontSize: 14 }}>{props.item.sex}</Text>
        </View>
      }
      chevron
      bottomDivider
      onPress={() => {
        props.navigation.navigate(props.onPressPage, {
          turtleId: props.item.id,
        })
      }}
    />
  )
}

export default TurtleListItem
