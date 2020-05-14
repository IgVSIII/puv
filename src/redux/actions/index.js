import { GETUSER, GETPHOTOS, GETUNLIKE, GETLIKE } from '../constants';

export const setToken = (token) => {
    return {
        type: GETUSER,
        token: token
    }
}

export const setPhoto = (newPhoto) => {
    return {
        type: GETPHOTOS ,
        newPhoto: newPhoto
    }
}

export const setLike = (photoID) => {
    return {
        type: GETLIKE ,
        photoID: photoID
    }
}

export const setUnlike = (photoID) => {
    return {
        type: GETUNLIKE ,
        photoID: photoID
    }
}