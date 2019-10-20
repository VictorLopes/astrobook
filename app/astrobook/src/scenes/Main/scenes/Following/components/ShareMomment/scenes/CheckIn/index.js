import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import {
    StatusBar,
    View,
    ScrollView,
    Text,
    Dimensions,
    TouchableOpacity,
    KeyboardAvoidingView,
    ActivityIndicator,
    Platform
} from 'react-native'
const { width, height } = Dimensions.get("screen");

import MainHeader from '@components/MainHeader'
import ButtonPrimary from '@components/ButtonPrimary'
import Picker from 'react-native-image-picker';


import AvatarProfile from '@components/AvatarProfile'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Icon as IconE, Input, SearchBar } from 'react-native-elements'
import Toast from 'react-native-root-toast';
import IMAGES from '@constants/images'

// import RNGooglePlaces from 'react-native-google-places';

// Components

// import Header from './components/Header'

// Constants
import COLORS from '@constants/colors'

import FitImage from 'react-native-fit-image';



class CheckIn extends Component {

    constructor(props) {
        super(props)

        this.state = {
            location: ''
        }

    }

    static getDerivedStateFromProps(props, state) {
        if (props.user)
            state.user = props.user
        if (props.currentPost)
            state.currentPost = props.currentPost
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

    // openSearchModal() {
    //     RNGooglePlaces.openAutocompleteModal()
    //         .then((place) => {
    //             console.log(place);
    //             // place represents user's selection from the
    //             // suggestions and it is a simplified Google Place object.
    //         })
    //         .catch(error => console.log(error.message));  // error is a Javascript Error object
    // }

    render() {
        return (
            <KeyboardAvoidingView
                style={{
                    flex: 1
                }}
                behavior="padding"
                enabled
            >
                <ScrollView>
                    <MainHeader
                        title='Check-In'
                        backButton
                    />
                    {/* <SearchBar
                        platform={Platform.OS}
                        placeholder="Pesquise por sua localização"
                        onChangeText={(location) => this.setState({ location })}
                        onClear={() => this.setState({ location: '' })}
                        value={this.state.location}
                        searchIcon={(
                            <TouchableOpacity
                                onPress={() => this.openSearchModal()}
                            >
                                <IconE
                                    type='material'
                                    name='search'
                                    color={COLORS.DEEP_GRAY_TEXT}
                                    size={40}
                                />
                            </TouchableOpacity>
                        )}
                        lightTheme={true}
                    /> */}

                </ScrollView>

            </KeyboardAvoidingView>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.data,
        currentPost: state.user.currentPost,
        commentSuccess: state.user.commentSuccess,
        commentLoader: state.user.commentLoader,
    }
}
const mapDispatchToProps = dispatch => ({
    getUserData() {
        dispatch({ type: 'USER_STORAGE_GET_DATA_TRIGGER' })
    },
    addCommentInPost(payload) {
        dispatch({
            type: 'POST_ADD_COMMENT_IN_POST_TRIGGER',
            payload
        })
    },

})

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(CheckIn));
