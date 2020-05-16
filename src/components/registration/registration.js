import React, {useEffect} from 'react';
import './registration.css';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import { lightGreen } from '@material-ui/core/colors';
import { authenticationUrl, setAccessTokenUnplash } from '../../lib';
import { connect } from 'react-redux';
import { setToken } from '../../redux/actions';
import { useHistory } from 'react-router-dom';

function Registration({ user, setToken }) {

  const history = useHistory();
  let code = window.location.search.split('code=')[1];

  const theme = createMuiTheme({
      palette: {
        primary: lightGreen,
      },
  });

  const unsplashConnect = () => {
    document.location.assign(authenticationUrl);
  }

  useEffect(()=> {
    if (code !== undefined) {
      setAccessTokenUnplash(code, setToken);
      //history.push("/main");
    }
  },[code])

  useEffect(()=> {
    if (user) {
      //setAccessTokenUnplash(code, setToken);
      history.push("/puv/main/");
    }
  },[user])


  return (
    <div>
      <Container className="backImg">
        <div className="wrap">     
          <ThemeProvider theme={theme}> 
            <Button variant="contained"  color="primary" size="large" onClick = {unsplashConnect}>
               {(code === undefined)? "Авторизоваться" : "..." }
            </Button>   
          </ThemeProvider>    
        </div> 
      </Container>     
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user.token
});

const mapDispatchToProps = (dispatch) => ({
  setToken: (new_token) => dispatch(setToken(new_token))
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);

