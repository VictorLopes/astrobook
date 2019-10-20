import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import {
    StatusBar,
    View,
    ScrollView,
    Text,
    Dimensions,
    TouchableOpacity
} from 'react-native'
const { width, height } = Dimensions.get("screen");

import MainHeader from '@components/MainHeader'
import ButtonPrimary from '@components/ButtonPrimary'
import Picker from 'react-native-image-picker';


import AvatarProfile from '@components/AvatarProfile'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Icon as IconE, Input } from 'react-native-elements'
import Toast from 'react-native-root-toast';
import IMAGES from '@constants/images'

// import RNGooglePlaces from 'react-native-google-places';


// Components

// import Header from './components/Header'

// Constants
import COLORS from '@constants/colors'

import FitImage from 'react-native-fit-image';


class Publish extends Component {

    constructor(props) {
        super(props)

        this.state = {
            comment: '',
            photos: [],
            checkin: null
        }

    }

    static getDerivedStateFromProps(props, state) {
        if (props.user)
            state.user = props.user

        return state;
    }

    componentDidMount() {
        setTimeout(() => {
            this.subs = [
                this.props.navigation.addListener('didFocus', () => this.didFocusFunctions()),
            ];
        }, 3000)

        this.didFocusFunctions();
    }

    didFocusFunctions() {
    }

    _removeImage(index) {
        let photos = this.state.photos
        photos = photos.filter((item, i) => i !== index)
        this.setState({ photos })
    }
    _sendPost() {
        let payload = {
            check_in: this.state.checkin,
            comment: this.state.comment,
            photos: this.state.photos
        }

        this.props.sendPost(payload)
    }
    _selectPicker() {
        Picker.showImagePicker({
            fixOrientatios: true,
            skipProcessing: true,
            title: 'Enviar uma foto',
            takePhotoButtonTitle: 'Tirar Foto',
            chooseFromLibraryButtonTitle: 'Escolher da galeria',
        }, (response) => {
            if (response.didCancel) {
                console.log('Usuario cancelou');
            } else if (response.error) {
                console.log('Erro: ', response.error);

            } else {
                /**************** Changed to allow only one image ****************/
                // let photos = this.state.photos
                let photos = []
                photos.push(response);

                this.setState({ photos })
            }
        })
    }
    openSearchModal() {
        // RNGooglePlaces.openAutocompleteModal()
        //     .then((place) => {
        //         console.log(place);
        //         this.setState({ checkin: place })
        //         // place represents user's selection from the
        //         // suggestions and it is a simplified Google Place object.
        //     })
        //     .catch(error => console.log(error.message));  // error is a Javascript Error object
    }

    render() {
        return (
            <React.Fragment>
                <MainHeader
                    title='Publicar'

                />
                <ScrollView
                    style={{
                        backgroundColor: COLORS.MENU_BACKGROUND
                    }}
                    contentContainerStyle={{
                        paddingTop: 32
                    }}
                >
                    {/* <AvatarProfile
                        containerStyle={{
                            margin: 0,
                            padding: 12
                        }}
                        name={this.state.user.full_name ? this.state.user.full_name : 'usuário'}
                        source={this.state.user.photo ? { uri: this.state.user.photo } : false}
                        onPress={() => null}
                        showRightIcon={false}
                    /> */}
                    {
                        (this.state.checkin) && (
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: 'rgba(0, 0, 0, 0.8)',
                                    paddingLeft: 12,
                                    paddingBottom: 12,
                                    fontWeight: '500'
                                }}
                            >
                                {`Fez check-in em ${this.state.checkin.name}`}
                            </Text>

                        )
                    }
                    <View
                        style={{
                            paddingHorizontal: 12
                        }}
                    >
                        <Input
                            autoCapitalize='none'
                            inputStyle={{
                                color: '#383A3C',
                                fontWeight: '500',
                                fontSize: 16,
                                paddingTop: 10,
                                paddingBottom: 10
                            }}
                            inputContainerStyle={{
                                justifyContent: 'center',
                                flex: 1,
                                borderColor: 'rgba(255,255,255,0)',
                                maxHeight: 180,
                            }}
                            value={this.state.comment}
                            containerStyle={{
                                shadowColor: '#455B63',
                                shadowRadius: 3,
                                shadowOpacity: 0.2,
                                shadowOffset: { width: 0, height: 2 },
                                elevation: 2,
                                flex: 1,
                                backgroundColor: '#fff',
                                marginVertical: 6,
                                marginTop: 0,
                            }}
                            onChangeText={comment => this.setState({ comment })}
                            autoCorrect={true}
                            multiline={true}
                            maxLength={2200}
                            placeholder='Título da publicação'
                            placeholderTextColor='rgba(162, 162, 162, 1)'
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                        <Input
                            autoCapitalize='none'
                            inputStyle={{
                                color: '#383A3C',
                                fontWeight: '500',
                                fontSize: 16,
                                paddingTop: 10,
                                paddingBottom: 10
                            }}
                            inputContainerStyle={{
                                justifyContent: 'center',
                                flex: 1,
                                borderColor: 'rgba(255,255,255,0)',
                                maxHeight: 180,
                            }}
                            value={this.state.history}
                            containerStyle={{
                                shadowColor: '#455B63',
                                shadowRadius: 3,

                                shadowOpacity: 0.2,
                                shadowOffset: { width: 0, height: 2 },
                                elevation: 2,
                                flex: 1,
                                backgroundColor: '#fff',
                                marginVertical: 6,
                                marginTop: 12,
                            }}
                            onChangeText={history => this.setState({ history })}
                            autoCorrect={true}
                            multiline={true}
                            maxLength={2200}
                            placeholder='Descrição/História'
                            placeholderTextColor='rgba(162, 162, 162, 1)'
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />

                    </View>
                    <View style={{
                        flex: 1,
                        paddingTop: 12,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        paddingLeft: 12,
                        marginHorizontal: 12,
                        marginBottom: 16
                    }}>
                        <TouchableOpacity
                            onPress={() => this._selectPicker()}
                            style={{
                                flexDirection: 'row',
                            }}
                        >
                            <IconE
                                type='material-community'
                                name='camera'
                                color='rgba(0, 0, 0, 0.7)'
                                size={20}
                            />
                            <Text style={{
                                fontSize: 14,
                                color: 'rgba(0, 0, 0, 0.7)',
                                paddingLeft: 8
                            }}>
                                Foto
                        </Text>
                        </TouchableOpacity>

                    </View>
                    <View
                        style={{
                            flex: 1,
                            marginHorizontal: 12,
                            alignItems: 'center',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            marginBottom: 70
                        }}
                    >
                        {
                            (this.state.photos) && (
                                this.state.photos.map((item, i) => (
                                    <View
                                        key={`photoShare-${i}`}
                                        style={{
                                            width: width * 0.46,
                                            height: width * 0.46,
                                            marginBottom: 6,
                                            shadowColor: '#455B63',
                                            shadowRadius: 5,
                                            shadowOpacity: 0.3,
                                            shadowOffset: { width: 1, height: 2 },
                                            elevation: 3,
                                        }}
                                    >
                                        <TouchableOpacity
                                            onPress={() => this._removeImage(i)}
                                            style={{
                                                position: 'absolute',
                                                top: 8,
                                                right: 8,
                                                height: 30,
                                                width: 30,
                                                borderRadius: 15,
                                                backgroundColor: 'rgba(0,0,0,0.2)',
                                                zIndex: 10,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <IconE
                                                type='material-community'
                                                name='close'
                                                color='#fff'
                                                size={25}
                                            />

                                        </TouchableOpacity>
                                        <FitImage
                                            style={{
                                                width: width * 0.46,
                                                height: width * 0.46,
                                            }}
                                            resizeMode='cover'
                                            source={{ uri: item.uri }}
                                        />
                                    </View>
                                ))
                            )
                        }

                    </View>


                </ScrollView>
                <View
                    style={{
                        position: 'absolute',
                        bottom: 12,
                        width: width
                    }}
                >
                    <View
                        style={{
                            marginHorizontal: 12,
                            borderRadius: 12,
                            backgroundColor: '#000'
                        }}
                    >
                        <ButtonPrimary
                            loading={this.props.postLoading}
                            buttonStyle={{ borderRadius: 12, }}
                            onPress={() => this._sendPost()}
                            buttonBackgroundColor={COLORS.PRIMARY}
                            title='Compartilhar'
                        />
                    </View>
                </View>
            </React.Fragment>

        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.data,
        postLoading: state.user.postLoading,
    }
}
const mapDispatchToProps = dispatch => ({
    getUserData() {
        dispatch({ type: 'USER_STORAGE_GET_DATA_TRIGGER' })
    },
    sendPost(payload) {
        dispatch({
            type: 'USER_SEND_POST_TRIGGER',
            payload
        })
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Publish));
