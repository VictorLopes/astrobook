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
                        placeholder='CPF'
                        maxLength={14}
                        onChangeText={this.props.onCpfChange}
                        value={this.props.state.cpf}
                        keyboardType='number-pad'
                    />
                    {/* <OutlineInput
                        placeholder='E-mail'
                        maxLength={50}
                        onChangeText={(text) => this.props.setState({ email: text })}
                        value={this.props.state.email}
                        keyboardType='email-address'
                    /> */}
                    <OutlineInput
                        placeholder='Celular DDD - Número'
                        onChangeText={this.props.onPhoneChange}
                        value={this.props.state.phone}
                        keyboardType='number-pad'
                    />
                    <OutlineInput
                        placeholder='CEP'
                        maxLength={9}
                        onChangeText={this.props.onZipCodeChange}
                        value={this.props.state.zipcode}
                        keyboardType='number-pad'
                    />
                    <OutlineInput
                        placeholder='Endereço'
                        maxLength={50}
                        autoCapitalize='words'
                        onChangeText={(text) => this.props.setState({ address: text })}
                        value={this.props.state.address}
                        keyboardType='default'
                    />
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <OutlineInput
                            containerStyle={{ marginHorizontal: 0, marginRight: 4, flex: 3 }}
                            placeholder='Complemento'
                            maxLength={18}
                            autoCapitalize='words'
                            onChangeText={(text) => this.props.setState({ complement: text })}
                            value={this.props.state.complement}
                            keyboardType='default'
                        />
                        <OutlineInput
                            containerStyle={{ marginHorizontal: 0, marginLeft: 4, flex: 2.5 }}
                            placeholder='Bairro'
                            maxLength={13}
                            autoCapitalize='words'
                            onChangeText={(text) => this.props.setState({ district: text })}
                            value={this.props.state.district}
                            keyboardType='default'
                        />
                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <OutlineInput
                            containerStyle={{ marginHorizontal: 0, marginRight: 4, flex: 7 }}
                            placeholder='Cidade'
                            maxLength={30}
                            autoCapitalize='words'
                            onChangeText={(text) => this.props.setState({ city: text })}
                            value={this.props.state.city}
                            keyboardType='default'
                        />
                        <OutlineInput
                            containerStyle={{ marginHorizontal: 0, marginLeft: 4, flex: 4 }}
                            placeholder='Estado'
                            maxLength={15}
                            autoCapitalize='words'
                            onChangeText={(text) => this.props.setState({ state: text })}
                            value={this.props.state.state}
                            keyboardType='default'
                        />
                    </View>
                    
                </View>
            </View>
        )
    }
}
