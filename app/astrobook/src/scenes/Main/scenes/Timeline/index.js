import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import {
  StatusBar,
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  TouchableOpacity

} from 'react-native'


import NextFields from './components/NextFields'

import { Icon } from 'react-native-elements'

import IMAGES from '@constants/images'

// Components
import Header from '@components/Header'
import Post from './components/Post';
import ShareMomment from './components/ShareMomment';

// Constants
import COLORS from '@constants/colors'


class Timeline extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      initiated: false,
      user: {},
      clubs: [
        // {
        //   id: 1,
        //   icon: IMAGES.FIELD_LOGO,
        //   name: 'Damha Golf Club ',
        //   location: 'São Carlos, SP',
        //   distance: '65 km',
        //   rating: '4.9'
        // },
        // {
        //   id: 2,
        //   icon: IMAGES.FIELD_LOGO,
        //   name: 'Damha Golf Club ',
        //   location: 'São Carlos, SP',
        //   distance: '65 km',
        //   rating: '4.9'
        // },
      ],
      posts: []
    }

  }

  static getDerivedStateFromProps(props, state) {
    if (props.user)
      state.user = props.user

    // Retry get posts
    if ((props.user && props.user.user_uid) && !state.initiated) {
      props.getPosts(props.user_uid)
      state.initiated = true
    }

    if (props.posts)
      state.posts = props.posts

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
    setTimeout(() => {
      this.props.getPosts(this.props.user.user_uid)
    }, 500);
  }

  render() {
    return (
      <ScrollView
        style={{
          backgroundColor: 'rgba(242, 243, 244, 1)',
        }}
        horizontal={false}
      >

        <StatusBar
          translucent={true}
          barStyle='dark-content'
          backgroundColor={COLORS.PRIMARY_HEADER_BACKGROUND}
          hidden={false}
        />

        <Header
          title='Timeline'

          rightComponent={() => (
            <TouchableOpacity
              style={{
                marginTop: -52
              }}
              activeOpacity={0.8}
              onPress={() => this.props.navigation.navigate('TimelineFinder')}
            >
              <Icon
                type='material-icon'
                name='search'
                color={COLORS.PRIMARY_HEADER_TEXT_COLOR}
                size={26}
              />
            </TouchableOpacity>
          )}
        />

        <View style={{
          marginHorizontal: 16,
          paddingVertical: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',

        }}>
          <View >
            <Text style={{
              fontSize: 19,
              paddingBottom: 4,
              fontWeight: 'bold',
              color: 'rgba(56, 58, 60, 1)'
            }}>
              {this.state.user.full_name ? this.state.user.full_name : this.state.user.name}
            </Text>
            <Text style={{
              fontSize: 14,
              color: 'rgba(162, 162, 162, 1)'
            }}>
              {this.state.user.profession ? this.state.user.profession : ''}
            </Text>
          </View>
        </View>
        <ShareMomment
          navigate={() => this.props.navigation.navigate('Share')}
          user={this.props.user}
        />
        <NextFields clubs={this.state.clubs} />
        {
          (this.props.timelinePostLoading) && (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 20
              }}
            >
              <ActivityIndicator
                size='large'
                color='#000'
              />

            </View>
          )
        }
        {
          (!this.props.timelinePostLoading) &&
          this.state.posts.map((item, i) => (
            <Post
              key={`post-${i}`}
              name={item.user_name}
              profilePhoto={(item.user_photo) ? item.user_photo : 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'}
              time={item.created_at_formated}
              message={item.comment}
              item={item}
              photos={item.photos}
              onCommentPress={() => {
                this.props.setCurrentPost(item)
                this.props.navigation.navigate('Comments')
              }}
              check_in={(item.check_in) ? item.check_in.name : ''}
              commentsNumber={(item.comments) ? item.comments.length : 0}
            />

          ))
        }


      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.data,
    clubsProfileLoading: state.user.clubsProfileLoading,
    timelinePostLoading: state.user.timelinePostLoading,
    posts: state.user.posts,

  }
}

const mapDispatchToProps = dispatch => ({
  getUserData() {
    dispatch({ type: 'USER_STORAGE_GET_DATA_TRIGGER' })
  },
  getPosts(payload) {
    dispatch({
      type: 'USER_GET_POSTS_TRIGGER',
      payload
    })
  },
  setCurrentPost(payload) {
    dispatch({
      type: 'USER_SET_CURRENT_POST_TRIGGER',
      payload
    })
  },

})

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Timeline));
