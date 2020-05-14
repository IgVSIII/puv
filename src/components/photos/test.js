import React from 'react';
import { connect } from 'react-redux';


function Test({user}) {

  return (
    <div >
        <h1>{user}</h1>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user.token
});



export default connect(mapStateToProps)(Test);
