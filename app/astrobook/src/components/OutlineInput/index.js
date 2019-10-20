import React, { Component } from 'react'
import { Input } from 'react-native-elements';


export default class OutlineInput extends Component {
    render() {
        let { ...props } = this.props;

        if (props.keyboardType == 'number-pad') {
            props.returnKeyType = 'done';
        }

        return (
            <Input
                {...props}
                inputStyle={{
                    color: props.fontColor ? props.fontColor : '#383A3C',
                    fontWeight: '500',
                    fontSize: 16,
                    textAlign:'center',
                }}
                inputContainerStyle={{
                    flex: 1,
                    borderColor: 'rgba(255,255,255,0)',
                    alignItems: 'center',
                    justifyContent:'center'
                }}
                containerStyle={[{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: '#383A3C',
                    marginHorizontal: 8,
                    borderRadius: 13,
                    height: 44,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // paddingLeft: 20,
                    marginVertical: 6
                }, props.containerStyle]}
                autoCorrect={false}
                maxLength={(props.maxLength) ? props.maxLength : 15}
                numberOfLines={1}
                placeholder={(props.placeholder) ? props.placeholder : 'Default'}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholderTextColor={(props.placeholderTextColor) ? props.placeholderTextColor : 'rgba(0,0,0,0.4)'}
            />
        )
    }
}
