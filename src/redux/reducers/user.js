import { GETUSER } from '../constants';
  
export default (state = {token: ""}, action) => {
    const { type, token } = action;
    switch (type) {
      case GETUSER: 
        return {token: token}; 
    default:
        return state;
    }
  };
  