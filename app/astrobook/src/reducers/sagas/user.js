import { Alert, Platform } from 'react-native'
import { call, put, takeEvery, select } from 'redux-saga/effects'
import { StackActions, NavigationActions } from 'react-navigation'



import { decode as atob, encode as btoa } from 'base-64'

import _ from 'lodash'

// import AsyncStorage from '@react-native-community/async-storage';

// Services


// Aux
import Toast from 'react-native-root-toast';
const moment = require('moment');


// function* getPostsLimit({ payload, limit }) {
//     try {
//         yield put({
//             type: 'USER_SET_PROFILE_POSTS_LOADER',
//             payload: true
//         });
//         //Get all people that the user that is logged in is following
//         let firePayload = {
//             collection: 'followers',
//             where: [
//                 ['user_following_uid', '==', payload],
//             ]
//         }
//         let res = yield firebaseGet(firePayload)

//         if (res) {
//             let usersFollowing = yield res.map((item) => item.user_followed_uid);
//             yield usersFollowing.push(payload)

//             let posts = [];
//             //iterates all user_uids of people that is following and get all posts of each them
//             for (let i = 0; i < usersFollowing.length; i++) {
//                 let item = usersFollowing[i];

//                 let firePayload = {
//                     collection: 'posts',
//                     where: [
//                         ['user_uid', '==', item],
//                     ],
//                     orderBy: 'created_at',
//                     orderDirection: 'desc',
//                 }
//                 let postsOfUser = yield firebaseGet(firePayload)
//                 //get each post of each user and push to general array
//                 if (postsOfUser && postsOfUser.length > 0) {
//                     postsOfUser.map(post => {
//                         let a = moment(post.created_at.toDate())
//                         post.created_at_formated = a.fromNow().replace('há ', '')
//                         posts.push(post)
//                     })
//                 }
//             }
//             posts.sort((a, b) => moment(a.created_at.toDate()).isBefore(moment(b.created_at.toDate())) ? 1 : -1)
//             // console.log('[POSTS] ', posts)
//             yield put({
//                 type: 'USER_SET_PROFILE_POSTS',
//                 payload: posts
//             });
//             yield put({
//                 type: 'USER_SET_PROFILE_POSTS_LOADER',
//                 payload: false
//             });
//         }
//     } catch ({ message, error }) {
//         yield put({
//             type: 'USER_SET_PROFILE_POSTS_LOADER',
//             payload: false
//         });
//         console.warn('[USER USER_GET_POSTS_TRIGGER ERROR]', message, error)
//     }
// }

export default function* rootUser() {
    // yield takeEvery('USER_LOGIN_TRIGGER', login)

}
