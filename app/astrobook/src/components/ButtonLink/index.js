import React, { Component } from 'react'

import {
    Text,
    TouchableOpacity
} from 'react-native'

import COLORS from '@constants/colors'

export default ButtonLink = props => {
    return(
        <TouchableOpacity
            activeOpacity={0.8}
            style={props.containerStyle}
            onPress={() => props.onPress()}
        >
            <Text style={{
                fontSize: 15,
                color: props.buttonTextColor,
                textAlign: 'center',
                ...props.textStyle
            }}>
                {props.title}
            </Text>
        </TouchableOpacity>
    )
}
