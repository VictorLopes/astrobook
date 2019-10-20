import React, { Component } from 'react'
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux'
import {
    View,
    ScrollView,
    ActivityIndicator
} from 'react-native'

// Components
import OutlineButton from '@components/OutlineButton'
import AvatarProfile from '@components/AvatarProfile'

import Album from './components/Album'
import MyClubs from './components/MyClubs'
import FollowInfo from './components/FollowInfo'
import Header from '@components/MainHeader'
import ProfileInfo from './components/ProfileInfo'

import COLORS from '@constants/colors'
import IMAGES from '@constants/images'

class ProfileView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                full_name: null,
                profession: null,
                photo: null,
                phone: null,
                email: null,
                birthdate: null,
                address: null,
                lastGame: null,
                instagramId: null,
                facebookId: null,
            },
            clubs: [],
            followers: [],
            following: [],
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.user) {
            state.user = {
                ...state.user,
                ...props.user
            }
        }
        if (props.clubs) {
            state.clubs = props.clubs
        }
        if (props.followers) {
            state.followers = props.followers
        }
        if (props.following) {
            state.following = props.following
        }
        return state;
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => this.didFocusFunctions());
    }

    didFocusFunctions() {
        //usuario que esta sendo visto
        this.props.getFollowersById(this.props.user.user_uid)
        this.props.getFollowingById(this.props.user.user_uid)
    }

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }

    _loadMoreData() {
        console.log("Carregando mais clubs")
        //Fazer Paginacao
    }
    _follow(user_following_uid, user_uid) {
        if (this.props.userIsFollowed) {
            this.props.unfollow(this.props.usersRelationshipUid, user_following_uid, user_uid)
        } else {
            this.props.follow(user_following_uid, user_uid)
        }
    }

    render() {
        if (this.props.clubsProfileLoading) {
            return (
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1
                }}>
                    <ActivityIndicator color='#000' size='large' />
                </View>
            )
        } else {
            return (
                <ScrollView
                    style={{
                        flex: 1,
                        backgroundColor: COLORS.MENU_BACKGROUND
                    }}
                >

                    <Header

                        clear={() => this.props.clear()}
                        backButton
                    />
                    <AvatarProfile
                        name={this.state.user.full_name ? this.state.user.full_name : 'usuário'}
                        subtitle={this.state.user.profession ? this.state.user.profession : ''}
                        source={this.state.user.photo ? { uri: this.state.user.photo } : IMAGES.AVATAR}
                        onPress={() => null}
                        grayBackground={true}
                    />

                    {this.state.user && (
                        <ProfileInfo
                            user={this.state.user}
                        />
                    )}

                    <FollowInfo
                        followingLoading={this.props.followingLoading}
                        loading={this.props.followLoading}
                        followers={this.state.followers}
                        following={this.state.following}
                    />
                    <View style={{
                        alignItems: 'center',
                        marginHorizontal: 16,
                    }}>

                        <OutlineButton
                            onPress={() => this._follow(this.props.user_following_uid, this.props.user.user_uid)}
                            loading={this.props.actionFollowLoading}
                            style={{
                                flex: 1,
                                width: '100%',
                                marginBottom: 24
                            }}
                            title={(this.props.userIsFollowed) ? 'Deixar de Seguir' : 'Seguir'}
                        />
                    </View>

                    <Album />

                    <MyClubs
                        loadMoreData={() => this._loadMoreData()}
                        clubs={this.state.clubs}
                    />



                </ScrollView>
            )
        }
    }

}

const mapStateToProps = state => {
    return {
        user_following_uid: state.user.data.user_uid,
        user: state.user.userProfileView,
        clubs: state.user.clubsProfileView,
        clubsProfileLoading: state.user.clubsProfileLoading,
        usersRelationshipUid: state.user.usersRelationshipUid,
        userIsFollowed: state.user.userIsFollowed,
        followers: state.user.followers,
        following: state.user.following,
        followLoading: state.user.followLoading,
        followingLoading: state.user.followingLoading,
        actionFollowLoading: state.user.actionFollowLoading
    }
}

const mapDispatchToProps = dispatch => ({
    follow(user_following_uid, user_followed_uid) {
        dispatch({
            type: 'USER_FOLLOW_TRIGGER',
            payload: {
                user_following_uid,
                user_followed_uid
            }
        })
    },
    getClubsOfProfileView(user_uid) {
        dispatch({
            type: 'GET_CLUBS_Of_PROFILE_VIEW_TRIGGER',
            user_uid
        })
    },
    unfollow(uid, user_following_uid, user_followed_uid) {
        dispatch({
            type: 'USER_UNFOLLOW_TRIGGER',
            uid,
            payload: {
                user_following_uid,
                user_followed_uid
            }
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
    },
    getFollowersById(id) {
        dispatch({
            type: 'GET_FOLLOWERS_BY_ID_TRIGGER',
            payload: id
        })
    },
    getFollowingById(id) {
        dispatch({
            type: 'GET_FOLLOWING_BY_ID_TRIGGER',
            payload: id
        })
    },
    clear() {
        dispatch({
            type: 'USER_CLEAR_PROFILES_TRIGGER'
        })
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ProfileView))
