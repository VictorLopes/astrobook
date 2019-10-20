import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert
} from 'react-native'

import { MaskService } from 'react-native-masked-text';
import { withNavigation } from 'react-navigation'

import OutlineButton from '@components/OutlineButton'
import Header from '@components/Header'
import { searchCep } from '@helpers/viacep'

import Form from './components/Form'

const PROFILE_IMAGE = { uri: 'https://static.poder360.com.br/2019/03/Captura-de-Tela-2019-03-04-a%CC%80s-12.04.18-868x644.png' };

import Picker from 'react-native-image-picker';
import { connect } from 'react-redux';
const moment = require('moment');
import Toast from 'react-native-root-toast'

import FitImage from 'react-native-fit-image'

const OPTIONS = {
    title: 'Enviar uma foto',
    takePhotoButtonTitle: 'Tirar Foto',
    chooseFromLibraryButtonTitle: 'Escolher da galeria',
};

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: { uri: props.user.profilePhoto },
            name: (props.user.name) ? props.user.name : '',
            email: (props.user.email) ? props.user.email : '',
            phone: '(75) 99251-1349'
        }
    }

    componentDidMount() {

    }

    static getDerivedStateFromProps(props, state) {
        if (props.user) {
            state.avatarSource = { uri: props.user.profilePhoto }
        }

        return state;
    }
    _onCpfChange = (cpf) => {
        this.setState({
            cpf: MaskService.toMask('cpf', cpf)
        });
    }
    _onPhoneChange = (phone) => {
        this.setState({
            phone: MaskService.toMask('cel-phone', phone)
        });
    }
    _onZipCodeChange = async (zipcode) => {
        this.setState({
            zipcode: MaskService.toMask('zip-code', zipcode)
        });

        let zipcodeInfo = await searchCep(zipcode);

        this.setState({
            city: zipcodeInfo.localidade,
            state: zipcodeInfo.uf
        });

        if (zipcodeInfo.bairro != '') {
            this.setState({
                district: zipcodeInfo.bairro
            });
        }

        if (zipcodeInfo.logradouro != '') {
            this.setState({
                address: zipcodeInfo.logradouro
            });
        }
    }


    _sendPhoto = (photo) => {
        if (photo) {
            // Set URI path
            let uri = Platform.OS == 'android' ? `file://${photo.path}` : photo.uri;

            // Send photo
            this.props.sendPhoto(uri, photo.type);
        }
    }

    _selectPicker() {
        Picker.showImagePicker(OPTIONS, (response) => {
            if (response.didCancel) {
                console.log('Usuário cancelou');
            } else if (response.error) {
                console.log('Erro: ', response.error);
            } else {
                this._sendPhoto(response);
            }
        })
    }

    _edit = () => {
        this.props.navigation.goBack()
        Alert.alert('Perfil atualizado com sucesso!')
        // const { name, phone, cpf } = this.state

        // if (!name)
        //     return Toast.show('Preencha o seu nome');

        // if (!cpf)
        //     return Toast.show('Preencha o seu cpf');

        // if (!phone)
        //     return Toast.show('Preencha o seu número de telefone');

        // let arrayFullName = this.state.name.split(' ')
        // let firstName = arrayFullName[0]
        // let surname;

        // arrayFullName.map((item, i) => {
        //     if (i !== 0) {
        //         if (i === 1) {
        //             surname = `${item} `
        //         } else {
        //             surname = surname + `${item} `
        //         }
        //     }
        // })

        // const payload = {
        //     surname,
        //     name: firstName,
        //     address: `${this.state.address}, ${this.state.city}, ${this.state.state}`,
        //     // email: this.state.email,
        //     cpf: this.state.cpf,
        //     phone: this.state.phone,
        //     zipcode: this.state.zipcode,
        //     complement: this.state.complement,
        //     district: this.state.district,
        //     city: this.state.city,
        //     state: this.state.state,
        //     street: this.state.address
        // };

        // this.props.editProfile(payload);
    }

    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
                <MainHeader
                    navigation={this.props.navigation}
                    title='Editar Perfil'
                    backButton
                />

                <ScrollView style={{
                    flex: 1,
                    backgroundColor: 'rgb(248, 248, 248)',

                }}>

                    <View style={{
                        backgroundColor: 'rgb(242, 243, 244)',
                        flex: 1
                    }}>
                        <View style={{
                            paddingLeft: 28,
                            paddingTop: 28,

                        }}>
                            <Text style={{
                                fontSize: 23,
                                fontWeight: 'bold',
                                color: '#383A3C',
                                paddingBottom: 4
                            }}>
                                {(this.props.user) ? this.props.user.name : 'usuario'}
                            </Text>

                        </View>
                        <View style={{
                            paddingTop: 24,
                            paddingBottom: 28,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <View style={{
                                shadowColor: '#455B63',
                                shadowRadius: 6,
                                shadowOpacity: 0.5,
                                shadowOffset: { width: 0, height: 2 },
                                elevation: 5,
                                width: 160,
                                height: 160,
                                borderRadius: 80,
                                backgroundColor: 'white'
                            }}>

                                <FitImage
                                    source={this.state.avatarSource}
                                    style={{
                                        width: 160,
                                        height: 160,
                                        borderRadius: 80,
                                        borderColor: '#fff',
                                        borderWidth: 2,
                                    }}
                                    borderRadius={80}
                                />

                            </View>
                        </View>
                        <View style={{
                            alignItems: 'center',
                            paddingBottom: 28
                        }} >
                            <OutlineButton
                                loading={this.props.profilePhotoLoading}
                                style={{
                                    width: 216,
                                    marginHorizontal: 80
                                }}
                                title='ENVIAR FOTO'
                                onPress={() => this._selectPicker()}
                            />
                        </View>
                        <Form
                            onZipCodeChange={this._onZipCodeChange}
                            onPhoneChange={this._onPhoneChange}
                            onCpfChange={this._onCpfChange}
                            state={this.state}
                            setState={query => this.setState(query)}
                        />
                        <View style={{
                            alignItems: 'center',
                        }} >
                            <OutlineButton
                                loading={this.props.editProfileLoading}
                                onPress={() => this._edit()}
                                style={{
                                    width: 318,
                                    marginHorizontal: 28,
                                    marginBottom: 20
                                }}
                                title='FINALIZAR'
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
        profilePhotoLoading: state.user.profilePhotoLoading,
        editProfileLoading: state.user.editProfileLoading
    }
};

const mapDispatchToProps = dispatch => ({
    editProfile(payload) {
        dispatch({
            type: 'USER_EDIT_PROFILE_TRIGGER',
            payload
        })
    },
    sendPhoto(payload, extension) {
        dispatch({
            type: 'USER_SET_PHOTO_URL_TRIGGER',
            payload: payload,
            extension
        })
    }
})



export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(EditProfile))
