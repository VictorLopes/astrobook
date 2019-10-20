import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import {
    StatusBar,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Platform
} from 'react-native'

import {
    Icon,
    Slider,
    SearchBar
} from 'react-native-elements';

import AvatarProfile from './components/AvatarProfile'


// Constants
import COLORS from '@constants/colors'
import IMAGES from '@constants/images'

class FinderProfiles extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            usersFinderList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            usersFinderLoader: true,
            filter: ''
        };

        this._timeout = null;
    }

    componentDidMount() {
        // Create subscription
        this._sub = this.props.navigation.addListener('didFocus', this.didFocusFunctions);

        // Set on focus function
        this.didFocusFunctions();
    }

    didFocusFunctions = () => {
        this.searchProfiles();
    }

    static getDerivedStateFromProps(props, state) {
        if (props.user)
            state.user = props.user

        if (props.usersFinderList)
            state.usersFinderList = props.usersFinderList

        state.usersFinderLoader = props.usersFinderLoader

        return state;
    }

    searchProfiles = () => {
        if (this._timeout !== null)
            clearTimeout(this._timeout);

        this._timeout = setTimeout(() => {
            this.props.getFinderUsers(this.state.filter)
        }, 500);
    }

    navigateToProfileView = (uid) => {
        this.props.getProfileView(uid)
        this.props.getClubsOfProfileView(uid)
        this.props.getIdOfRelationship(uid, this.props.user.user_uid)

        // Navigate to profile view
        this.props.navigation.navigate('ProfileView');
    }

    render() {
        return (
            <View
                style={{
                    backgroundColor: '#F2F3F4',
                    flex: 1
                }}
            >

                <SearchBar
                    platform={Platform.OS}
                    placeholder="nome do usuário"
                    onChangeText={(value) => this.setState({ filter: value }, this.searchProfiles)}
                    onClear={() => this.setState({ filter: '' }, this.searchProfiles)}
                    value={this.state.filter}
                    searchIcon={(
                        <TouchableOpacity
                            onPress={() => this.searchProfiles()}>

                            <Icon
                                type='material'
                                name='search'
                                color={COLORS.DEEP_GRAY_TEXT}
                                size={40}
                            />

                        </TouchableOpacity>
                    )}
                    lightTheme={true}
                />

                <View>
                    <ScrollView
                        contentContainerStyle={{
                            backgroundColor: '#F2F3F4',
                            paddingBottom: 20
                        }}>

                        {
                            this.state.usersFinderList.map((user, i) => {
                                return (
                                    <AvatarProfile
                                        key={`userItem-${i}`}
                                        name={(user.name && user.surname) ? `${user.name} ${user.surname}` : (user.name ? user.name : '')}
                                        subtitle={user.profession ? user.profession : ''}
                                        source={user.photo ? { uri: user.photo } : IMAGES.AVATAR}
                                        grayBackground={true}
                                        onPress={() => this.navigateToProfileView(user.user_uid)}
                                    />
                                )
                            })
                        }

                    </ScrollView>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.data,
        usersFinderList: state.user.usersFinderList,
        usersFinderLoader: state.user.usersFinderLoader,
    }
}

const mapDispatchToProps = dispatch => ({
    getUserData() {
        dispatch({ type: 'USER_STORAGE_GET_DATA_TRIGGER' })
    },
    getFinderUsers(filter) {
        dispatch({
            type: 'USER_FINDER_GET_USERS_TRIGGER',
            filter
        })
    },
    getProfileView(uid) {
        dispatch({
            type: 'USER_GET_PROFILE_VIEW_TRIGGER',
            payload: {
                id: uid
            }
        })
    },
    getClubsOfProfileView(user_uid) {
        dispatch({
            type: 'GET_CLUBS_Of_PROFILE_VIEW_TRIGGER',
            user_uid
        })
    },
    getIdOfRelationship(user_followed_uid, user_following_uid) {
        dispatch({
            type: 'USER_GET_ID_RELATIONSHIP_TRIGGER',
            payload: {
                user_followed_uid,
                user_following_uid
            }
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(FinderProfiles));
