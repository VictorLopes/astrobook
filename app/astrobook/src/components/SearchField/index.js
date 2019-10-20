import React, { Component } from 'react'
import { Text, View } from 'react-native'

import { Input } from 'react-native-elements'

export default class SearchField extends Component {
  render() {
    return (
      <Input
        {...this.props}
        inputStyle={{
          color: '#383A3C',
          fontWeight: '500',
          fontSize: 16,
        }}
        inputContainerStyle={{
          justifyContent: 'center',
          borderColor: 'rgba(255,255,255,0)',
          alignItems: 'center'
        }}
        onChangeText={(text) => this.props.onChangeText(text)}
        containerStyle={[{
          shadowColor: '#455B63',
          shadowRadius: 3,
          shadowOpacity: 0.2,
          shadowOffset: { width: 0, height: 2 },
          elevation: 2,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          paddingLeft: 20,
          marginVertical: 6,
          width: '100%',
          height: 48

        }, this.props.containerStyle]}
        autoCorrect={true}
        maxLength={255}
        placeholder={this.props.placeholder}
        placeholderTextColor='#B9B9B9'
        underlineColorAndroid='rgba(0,0,0,0)'
        rightIcon={this.props.rightIcon}
      />
    )
  }
}
