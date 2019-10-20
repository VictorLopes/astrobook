const USER_SET = 'USER_SET'
const USER_SET_LOADING = 'USER_SET_LOADING'
const USER_LOGOUT = 'USER_LOGOUT'
const USER_SET_CLUBS = 'USER_SET_CLUBS'
const USER_SET_FAVORITE_COURSE = 'USER_SET_FAVORITE_COURSE'
const USER_SET_FAVORITE_COURSE_LOADDER = 'USER_SET_FAVORITE_COURSE_LOADDER'
const USER_CLEAR_FAVORITE_COURSE = 'USER_CLEAR_FAVORITE_COURSE'
const USER_SET_PROFILE_PHOTO_LOADING = 'USER_SET_PROFILE_PHOTO_LOADING'
const USER_SET_EDIT_PROFILE_LOADING = 'USER_SET_EDIT_PROFILE_LOADING'
const USER_FINDER_SET_LOADER = 'USER_FINDER_SET_LOADER'
const USER_FINDER_SET_USERS = 'USER_FINDER_SET_USERS'
const USER_FINDER_CLEAR_USERS = 'USER_FINDER_CLEAR_USERS'
const USER_SET_PROFILE_VIEW = 'USER_SET_PROFILE_VIEW'
const USER_SET_CLUBS_PROFILE_VIEW = 'USER_SET_CLUBS_PROFILE_VIEW'
const USER_CLUBS_PROFILE_LOADING = 'USER_CLUBS_PROFILE_LOADING'
const USER_SET_IS_FOLLOWED = 'USER_SET_IS_FOLLOWED'
const USER_SET_RELATIONSHIP_UID = 'USER_SET_RELATIONSHIP_UID'
const USER_SET_FOLLOWING = 'USER_SET_FOLLOWING'
const USER_SET_FOLLOWERS = 'USER_SET_FOLLOWERS'
const USER_SET_FOLLOW_LOADING = 'USER_SET_FOLLOW_LOADING'
const USER_SET_FOLLOWING_LOADING = 'USER_SET_FOLLOWING_LOADING'
const USER_CLEAR_PROFILES = 'USER_CLEAR_PROFILES'
const USER_SET_POST_LOADING = 'USER_SET_POST_LOADING'
const USER_SET_POSTS = 'USER_SET_POSTS'
const USER_SET_CURRENT_POST = 'USER_SET_CURRENT_POST'
const USER_SET_TIMELINE_POSTS_LOADING = 'USER_SET_TIMELINE_POSTS_LOADING'
const USER_SET_COMMENT_LOADER = 'USER_SET_COMMENT_LOADER'
const USER_SET_COMMENT_SUCCESS = 'USER_SET_COMMENT_SUCCESS'
const USER_SET_RESET_PASSWORD_LOADER = 'USER_SET_RESET_PASSWORD_LOADER'
const USER_SET_ACTION_FOLLOW_LOADING = 'USER_SET_ACTION_FOLLOW_LOADING'

const initialState = {
    loading: false,
    userFavoriteCourseLoader: true,
    data: {},
    clubs: [],
    userFavoriteCourse: [],
    usersFinderList: [],
    profilePhotoLoading: false,
    editProfileLoading: false,
    usersFinderLoader: false,
    profilePhotoLoading: false,
    editProfileLoading: false,
    // Esse é o estado responsavel por guardar os dados do usuario amigo do usuario logado
    userProfileView: {},
    // Esse é o estado responsavel por guardar os clubs do usuario amigo do usuario logado
    clubsProfileView: [],
    clubsProfileLoading: true,
    userIsFollowed: false,
    usersRelationshipUid: '',
    followers: [],
    following: [],
    followLoading: true,
    followingLoading: true,
    postLoading: false,
    posts: [],
    currentPost: '',
    timelinePostLoading: false,
    commentLoader: false,
    commentSuccess: false,
    resetPasswordLoader: false,
    actionFollowLoading: false
}

export default function user(state = initialState, action = {}) {
    switch (action.type) {
        case USER_SET:
            return { ...state, data: action.payload };
        case USER_SET_ACTION_FOLLOW_LOADING:
            return { ...state, actionFollowLoading: action.payload };
        case USER_SET_RESET_PASSWORD_LOADER:
            return { ...state, resetPasswordLoader: action.payload };
        case USER_SET_POST_LOADING:
            return { ...state, postLoading: action.payload };
        case USER_SET_COMMENT_LOADER:
            return { ...state, commentLoader: action.payload };
        case USER_SET_COMMENT_SUCCESS:
            return { ...state, commentSuccess: action.payload };
        case USER_SET_TIMELINE_POSTS_LOADING:
            return { ...state, timelinePostLoading: action.payload };
        case USER_SET_POSTS:
            return { ...state, posts: action.payload };
        case USER_SET_PROFILE_VIEW:
            return { ...state, userProfileView: action.payload };
        case USER_SET_RELATIONSHIP_UID:
            return { ...state, usersRelationshipUid: action.payload };
        case USER_SET_FOLLOWERS:
            return { ...state, followers: action.payload };
        case USER_SET_FOLLOWING:
            return { ...state, following: action.payload };
        case USER_SET_CURRENT_POST:
            return { ...state, currentPost: action.payload };
        case USER_SET_IS_FOLLOWED:
            return {
                ...state,
                userIsFollowed: action.payload
            };
        case USER_SET_LOADING:
            return { ...state, loading: action.payload };
        case USER_SET_FOLLOW_LOADING:
            return { ...state, followLoading: action.payload };
        case USER_SET_FOLLOWING_LOADING:
            return { ...state, followingLoading: action.payload };
        case USER_FINDER_SET_LOADER:
            return { ...state, usersFinderLoader: action.usersFinderLoader };
        case USER_CLUBS_PROFILE_LOADING:
            return { ...state, clubsProfileLoading: action.payload };
        case USER_SET_PROFILE_PHOTO_LOADING:
            return { ...state, profilePhotoLoading: action.payload };
        case USER_SET_EDIT_PROFILE_LOADING:
            return { ...state, editProfileLoading: action.payload };
        case USER_SET_FAVORITE_COURSE_LOADDER:
            return { ...state, userFavoriteCourseLoader: action.userFavoriteCourseLoader };
        case USER_LOGOUT:
            return initialState;
        case USER_SET_CLUBS:
            return { ...state, clubs: action.payload };
        case USER_FINDER_SET_USERS:
            return { ...state, usersFinderList: action.usersFinderList };
        case USER_FINDER_CLEAR_USERS:
            return { ...state, usersFinderList: [] };
        case USER_SET_CLUBS_PROFILE_VIEW:
            return { ...state, clubsProfileView: action.payload };
        case USER_SET_FAVORITE_COURSE:
            return { ...state, userFavoriteCourse: action.userFavoriteCourse };
        case USER_CLEAR_FAVORITE_COURSE:
            return {
                ...state,
                userFavoriteCourse: {
                    status: false
                },
                userFavoriteCourseLoader: true
            };

        case USER_CLEAR_PROFILES:
            return {
                ...state,
                clubsProfileView: [],
                clubsProfileLoading: true,
                userIsFollowed: false,
                usersRelationshipUid: '',
                followers: [],
                following: [],
                followLoading: true,
                followingLoading: true,
                userProfileView: {},
            };
        default:
            return state
    }
}
