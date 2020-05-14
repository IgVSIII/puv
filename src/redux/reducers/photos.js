import { GETPHOTOS, GETLIKE, GETUNLIKE } from '../constants';
  
  
  
  export default (state = {size: 0 , elem: []}, action) => {
    const { type, newPhoto, photoID } = action;
  
    switch (type) {
      case GETPHOTOS: 
        return {  size: state.size + 12,
                  elem: state.elem.concat(newPhoto)};  
      case GETLIKE: 
        return {  size: state.size,
                  elem: state.elem.map((item) => (item.id === photoID? {...item, likes: ++item.likes, liked_by_user: true} : item))};  
      case GETUNLIKE: 
        return {  size: state.size,
                  elem: state.elem.map((item) => (item.id === photoID? {...item, likes: --item.likes , liked_by_user: false} : item))};   
      default:
        return state;
    }
  };
  