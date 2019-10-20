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
    Image
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


// Components

// import Header from './components/Header'

// Constants
import COLORS from '@constants/colors'

import FitImage from 'react-native-fit-image';
import PostInfo from './components/PostInfo';
import Comment from './components/Comment';



class Comments extends Component {

    constructor(props) {
        super(props)

        this.state = {
            currentPost: {},
            commentAdding: '',
            commentSubmited: {},
            user: {
                full_name: '',
                profile_photo: ''
            }
        }

    }

    static getDerivedStateFromProps(props, state) {
        let item = props.navigation.getParam('item')
        console.log('ITEM >>>', item)
        if (item.user)
            state.user = {
                full_name: item.user_name,
                profile_photo: item.user_photo
            }
        if (item)
            // console.log('ITEM', props.navigation.getParam('item'))
            state.currentPost = item
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
    _sendComment = (message) => {

        let comment = {
            message,
            created_at: '',
            name: this.state.user.full_name,
            profile_photo: this.state.user.profile_photo,
        }
        this.props.addCommentInPost(comment)

        this.setState({ commentAdding: '' })


    }

    render() {
        return (
            <KeyboardAvoidingView
                style={{
                    flex: 1
                }}
                behavior="padding"
                enabled
            >
                <MainHeader
                    title='Comentários'
                    backButton
                />
                <ScrollView
                    ref={ref => this.scrollView = ref}

                    onContentSizeChange={(contentWidth, contentHeight) => {
                        if (this.props.commentLoader) {
                            this.scrollView.scrollToEnd({ animated: true });
                        }
                    }}
                >
                    <PostInfo
                        name={this.state.currentPost.user_name}
                        profilePhoto={this.state.currentPost.user_photo}
                        time={this.state.currentPost.created_at_formated}
                        message={this.state.currentPost.comment}
                        isLiked={false}
                        check_in={(this.state.currentPost.check_in) ? this.state.currentPost.check_in.name : ''}
                        photos={this.state.currentPost.photos}
                    />
                    {
                        (this.state.currentPost.comments) ?
                            this.state.currentPost.comments.map((item, i) => (

                                <Comment
                                    key={`comment-${i}`}
                                    {...item}
                                />
                            )) : (
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',

                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: '500',
                                            color: 'rgba(0,0,0,0.3)'
                                        }}
                                    >
                                        {`Ainda não há comentários nessa postagem`}
                                    </Text>
                                </View>
                            )
                    }

                </ScrollView>
                <View
                    style={{
                        minHeight: 55,
                        width: '100%',
                        borderTopColor: 'rgba(0,0,0,0.2)',
                        borderTopWidth: 0.4,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        backgroundColor: '#fff'
                    }}
                >
                    <View
                        style={{
                            paddingLeft: 12,
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                borderColor: 'rgba(0,0,0,0.5)',
                                borderWidth: 0.5
                            }}
                            source={{ uri: this.props.user.profilePhoto }}
                            resizeMode='contain'
                        />
                    </View>
                    <View
                        style={{
                            flex: 6,
                            justifyContent: 'center'
                        }}
                    >
                        <Input
                            autoCapitalize='none'
                            inputStyle={{
                                color: '#383A3C',
                                fontWeight: '500',
                                fontSize: 16,
                                paddingTop: 10,
                                paddingBottom: 10,
                            }}
                            inputContainerStyle={{
                                justifyContent: 'center',
                                flex: 1,
                                maxHeight: 100,
                                minHeight: 55,
                                borderBottomColor: 'rgba(0,0,0,0)',
                            }}
                            containerStyle={{
                                justifyContent: 'center',
                                flex: 1,
                                backgroundColor: '#fff',
                                paddingLeft: 20,
                                // marginVertical: 6,
                                marginTop: 0,
                                width: '100%',
                            }}
                            autoCompleteType='off'
                            onChangeText={commentAdding => this.setState({ commentAdding })}
                            value={this.state.commentAdding}
                            autoCorrect={true}
                            multiline={true}
                            maxLength={2100}
                            placeholder='Adicione um comentário'
                            placeholderTextColor='rgba(162, 162, 162, 1)'
                            underlineColorAndroid='rgba(0,0,0,0)'
                        />
                    </View>
                    <View
                        style={{
                            flex: 2,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingRight: 4
                        }}
                    >
                        <TouchableOpacity
                            disabled={(this.state.commentAdding === '') ? true : false}
                            onPress={() => this._sendComment(this.state.commentAdding)}
                        >
                            {
                                (this.props.commentLoader) ? (
                                    <View
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',

                                        }}
                                    >
                                        <ActivityIndicator
                                            size='small'
                                            color='#000'
                                        />

                                    </View>
                                ) : (
                                        <Text
                                            style={{
                                                color: '#383A3C',
                                                fontWeight: '500',
                                                fontSize: 18,
                                            }}
                                        >
                                            {`Publicar`}
                                        </Text>

                                    )
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Comments));
