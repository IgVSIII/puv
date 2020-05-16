import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { connect } from 'react-redux';
import { listPhoto, likePhotoLib, unlikePhotoLib } from '../../lib';
import { setPhoto, setUnlike, setLike } from '../../redux/actions';
import { Link } from 'react-router-dom';
import { UPDATESIZE } from '../../redux/constants';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarsOutlinedIcon from '@material-ui/icons/StarsOutlined';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    paddingTop: 20
  },
  gridList: {
    width: 500,
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
}));


function Photos( {user, photos, size, setPhoto, setLike, setUnlike} ) {

  const classes = useStyles();
  let stopUpdate = size;

  if (size === 0) {
    listPhoto(1 ,UPDATESIZE ,user).then(result => setPhoto(result))
  }



  window.addEventListener('scroll', () => {
    if ((document.documentElement.scrollHeight - 10 < 
       document.documentElement.clientHeight + document.documentElement.scrollTop) && (stopUpdate === size) && (size !== 0) )  
    {
      listPhoto(size + 1, size + UPDATESIZE ,user).then(result => setPhoto(result) )
      stopUpdate++;
    }  
  });

  const onLike = (id) => {   
    
    if (user) {
      likePhotoLib(id, user)
      setLike(id) 
      }
  }

  const onUnlike = (id) => {
    
    if (user) {
      unlikePhotoLib(id, user)
      setUnlike(id)
      }
  }


  return (
    <div className={classes.root} >

      <GridList  className={classes.gridList} cols={3} >
        {photos.map((tile, index) => (
          <GridListTile key={tile.id+index} cols={1}>
            <Link to={"/puv/photo/" + index}>
              <img src={tile.urls.small} alt={tile.alt_description} />
            </Link>
            <GridListTileBar
              title={tile.likes}
              titlePosition="top"
              onClick = { tile.liked_by_user? ev => {onUnlike (tile.id)}: ev => {onLike(tile.id)} }
              actionIcon={
                <IconButton aria-label={`star ${tile.title}`} className={classes.icon}  >
                  {tile.liked_by_user? <StarsOutlinedIcon  /> : <StarBorderIcon  />}
                </IconButton>
              }
              actionPosition="left"
              className={classes.titleBar}
            />
          </GridListTile>
        ))}
      </GridList>      
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user.token,
  photos: state.photos.elem,
  size: state.photos.size
});

const mapDispatchToProps = (dispatch) => ({
  setPhoto: (new_photo) => dispatch(setPhoto(new_photo)),
  setLike: (id) => dispatch(setLike(id)),
  setUnlike: (id) => dispatch(setUnlike(id))
});




export default connect(mapStateToProps, mapDispatchToProps)(Photos);
