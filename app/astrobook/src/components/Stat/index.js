import React, { Component } from 'react'
import { Text, View } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class Stat extends Component {
    render() {
        return (
            <View style={[{
                width: 84,
                height: 76,
                backgroundColor: '#383A3C',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 0.4,
                borderColor: '#383A3C'
            }, this.props.containerStyle]}>

                <Icon
                    style={{
                        marginBottom: 4
                    }}
                    size={23}
                    color={this.props.iconColor}
                    name={this.props.iconName}
                    accessibilityIgnoresInvertColors
                />
                <Text style={{
                    fontWeight: 'bold',
                    color: '#fff',
                    fontSize: 12,

                }} >
                    {this.props.value}
                </Text>
                <Text style={{
                    fontSize: 10,
                    color: '#fff',
                    marginTop: -2
                }}>
                    {this.props.label}
                </Text>
            </View>
        )
    }
}
