import React, { Component } from 'react'
import { Text, View } from 'react-native'

import OutlineInput from '@components/OutlineInput'
export default class Form extends Component {
    render() {
        return (
            <View style={{
                flex: 1,
                marginHorizontal: 15,
                backgroundColor: '#fff',
                shadowColor: '#455B63',
                shadowRadius: 3,
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 2 },
                elevation: 2,
                paddingHorizontal: 8,
                marginBottom: 24,
                paddingBottom: 20,
            }}>
                <Text style={{
                    color: '#383A3C',
                    fontSize: 25,
                    marginTop: 20,
                    marginBottom: 24
                }}>
                    Dados Pessoais
                </Text>
                <View style={{
                    alignItems: 'center'
                }}>
                    <OutlineInput
                        placeholder='Nome Completo'
                        maxLength={50}
                        autoCapitalize='words'
                        onChangeText={(text) => this.props.setState({ name: text })}
                        value={this.props.state.name}
                        keyboardType='default'
                    />

                    <OutlineInput
                        placeholder='E-mail'
                        maxLength={50}
                        onChangeText={(text) => this.props.setState({ email: text })}
                        value={this.props.state.email}
                        keyboardType='email-address'
                    />
                    <OutlineInput
                        placeholder='Celular DDD - Número'
                        onChangeText={this.props.onPhoneChange}
                        value={this.props.state.phone}
                        keyboardType='number-pad'
                    />

                </View>
            </View>
        )
    }
}
