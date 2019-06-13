    
import {
    SET_USER,
    SET_NEW_SURVEY,
    SET_USER_PHOTO,
    SET_VOTING,
    SET_RATING,
    SET_BRAIN,
    SET_SIDEMENU
} from "./actionTypes";

export const setUser = (user) => ({
    type : SET_USER,
    user : user
});

export const setNewSurvey = (survey) => ({
    type:SET_NEW_SURVEY,
    survey: survey
});

export const setUserPhoto = (user) => ({
    type: SET_USER_PHOTO,
    user: user
});

export const setVoting = (voting) => ({
    type: SET_VOTING,
    voting: voting
})

export const setRating = (rating) => ({
    type: SET_RATING,
    rating: rating
})

export const setBrain = (brain) => ({
    type: SET_BRAIN,
    brain: brain
})

export const setSide = (side) => ({
    type: SET_SIDEMENU,
    side: side
})