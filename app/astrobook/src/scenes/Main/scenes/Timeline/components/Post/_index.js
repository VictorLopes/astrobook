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

const { height, width } = Dimensions.get('screen');
import IMAGES from '@constants/images'

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
                marginHorizontal: 16,
                marginRight: 16,
                backgroundColor: '#fff',
                paddingHorizontal: 20,
                marginBottom: 24,
                shadowColor: '#455B63',
                shadowRadius: 2,
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 2 },
                elevation: 2,
                paddingBottom: 20
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 16
                }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',

                    }}>
                        <View
                            style={{
                                width: 41,
                                height: 41,
                                borderRadius: 20.5,
                            }}
                        >
                            {/* <FastImage
                                style={{
                                    width: 41,
                                    height: 41,
                                    borderRadius: 20.5,
                                }}
                                source={{
                                    uri: profilePhoto,
                                    headers: { Authorization: 'someAuthToken' },
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.contain}
                            /> */}
                            <FitImage
                                style={{
                                    width: 41,
                                    height: 41,
                                    borderRadius: 20.5,
                                }}
                                borderRadius={20.5}
                                source={{ uri: profilePhoto }}
                            />
                        </View>

                        <Text style={{
                            paddingLeft: 8,
                            color: '#383A3C',
                            fontSize: 14,
                            fontWeight: '500',
                            paddingRight: 40
                        }}>
                            {name}
                        </Text>
                    </View>
                    <View style={{

                    }}>
                        <Text style={{
                            color: '#B9B9B9',
                            fontSize: 12
                        }}>
                            {time}
                        </Text>
                    </View>

                </View>
                <View style={{
                    flex: 1,
                    alignItems: 'flex-start',
                    paddingTop: 10,
                    paddingBottom: 12

                }} >
                    {
                        (check_in != '') && (

                            <Text>

                                <Text style={{
                                    flex: 1,
                                    color: 'rgba(0,0,0,0.7)',
                                    fontSize: 13,
                                    fontWeight: '500',
                                    textAlign: 'left'
                                }}>
                                    {`Fez check-in em `}
                                </Text>
                                <Text style={{
                                    flex: 1,
                                    color: 'rgba(0,0,0,0.7)',
                                    fontSize: 13,
                                    fontWeight: '700',
                                    textAlign: 'left'
                                }}>
                                    {`${check_in}`}
                                </Text>

                            </Text>
                        )
                    }
                    <Text style={{
                        marginTop: 8,
                        flex: 1,
                        color: '#B9B9B9',
                        fontSize: 12,
                        fontWeight: '400',
                        textAlign: 'left'
                    }}>
                        {message}
                    </Text>
                </View>

                {
                    (photos) && (
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: 200
                        }}>
                            <Swiper
                                style={{

                                }}
                                horizontal={true}
                                automaticallyAdjustContentInsets={true}
                                showsPagination={true}
                                activeDotColor='#fff'
                                dotColor='rgba(255, 255, 255, 0.1)'
                                dotStyle={{
                                    borderWidth: 1,
                                    borderColor: '#fff',
                                    marginRight: 10,
                                    marginBottom: -10
                                }}
                                activeDotStyle={{
                                    marginRight: 10,
                                    marginBottom: -10
                                }}
                            >
                                {
                                    photos.map((photo, i) => {
                                        return (
                                            <View
                                                key={`photoPost-${i}`}
                                            >
                                                {
                                                    (Platform == 'ios') && (
                                                        <FitImage
                                                            style={{
                                                                width: '100%',
                                                                height: 200
                                                            }}
                                                            source={{ uri: photo }}
                                                            resizeMode='cover'
                                                        />
                                                    )
                                                }
                                                {
                                                    (Platform == 'android') && (
                                                        <FitImage
                                                            style={{
                                                                width: '100%',
                                                                height: 200
                                                            }}
                                                            source={{
                                                                uri: photo,
                                                            }}
                                                            resizeMode='cover'
                                                        />
                                                    )
                                                }
                                            </View>
                                        )
                                    })
                                }
                            </Swiper>

                        </View>

                    )
                }

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
