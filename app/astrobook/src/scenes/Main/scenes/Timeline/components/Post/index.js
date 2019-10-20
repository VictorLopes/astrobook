import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    Platform
} from 'react-native'

import {
    NavigationActions,
    withNavigation
} from 'react-navigation'

import { Icon as IconE } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'

import { connect } from 'react-redux'

import FitImage from 'react-native-fit-image'
import Swiper from 'react-native-swiper';

import PostHeader from './components/PostHeader'
import PostContent from './components/PostContent'

import IMAGES from '@constants/images'

const { height, width } = Dimensions.get('screen');

class Post extends Component {
    state = {
        loading: false,
        isLike: false,
        image: IMAGES.IMAGE_DEFAULT
    }

    componentDidMount() {
        let { item } = this.props
        let likes = item.users_uid_that_liked
        if (likes && likes.includes(this.props.user.user_uid)) {
            this.setState({ isLiked: true })
        } else {
            this.setState({ isLiked: false })
        }
    }

    _like = () => {
        if (this.state.isLiked) {
            let payload = {
                user_uid: this.props.user.user_uid,
                post_id: this.props.item.id
            }
            this.props.unLike(payload)
            this.setState({ isLiked: false })

        } else {
            let payload = {
                user_uid: this.props.user.user_uid,
                post_id: this.props.item.id
            }
            this.props.like(payload)
            this.setState({ isLiked: true })
        }
    }

    renderImage = (source) => {
        console.log('SOURCE ON renderImage >>>>> ', source);
        console.log('IMAGES DEFAULT >>>>> ', IMAGES.IMAGE_DEFAULT);

        if (source)
            this.setState({
                image: { uri: source }
            })
    }

    render() {

        const { name, time, message, profilePhoto, photos, check_in } = this.props
        return (
            <View style={{
                flex: 1,
                paddingHorizontal: 16,
                marginHorizontal: 16,
                marginRight: 16,
                backgroundColor: '#fff',
                marginBottom: 24,
                shadowColor: '#455B63',
                shadowRadius: 2,
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 2 },
                elevation: 2,
                paddingBottom: 16
            }}>
                <PostHeader
                    name={name}
                    profilePhoto={profilePhoto}
                />

                <PostContent
                    photos={photos}
                    check_in={check_in}
                    message={message}
                />

                <View style={{
                    flexDirection: 'row',
                    flex: 1,
                    paddingTop: 12
                }}>
                    <TouchableOpacity
                        onPress={() => this._like()}
                        style={{
                            flex: 1,

                            width: 64,
                            height: 28,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}
                    >
                        <IconE
                            type='material-community'
                            name={(this.state.isLiked) ? 'heart' : 'heart-outline'}
                            size={20}
                            color={(this.state.isLiked) ? '#000' : '#A2A2A2'}

                        />
                        <Text style={{
                            fontSize: 12,
                            fontWeight: '500',
                            color: (this.state.isLiked) ? '#000' : '#A2A2A2',
                            marginLeft: 5
                        }}>
                            {(this.state.isLiked) ? 'Curtido' : 'Curtir'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.onCommentPress()}
                        style={{
                            flex: 1,
                            width: 64,
                            height: 28,
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center'
                        }}
                    >
                        <Icon
                            name='comment-alt'
                            size={18}
                            color='#A2A2A2'
                        />
                        <Text style={{
                            fontSize: 12,
                            fontWeight: '500',
                            color: '#A2A2A2',
                            marginLeft: 5
                        }}>
                            {`Comentários (${this.props.commentsNumber})`}
                        </Text>
                    </TouchableOpacity>
                </View>


            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data,

});
const mapDispatchToProps = dispatch => ({
    like(payload) {
        dispatch({
            type: 'USER_LIKE_POST_TRIGGER',
            payload
        })

    },
    unLike(payload) {
        dispatch({
            type: 'USER_UNLIKE_POST_TRIGGER',
            payload
        })

    }
})

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Post))
