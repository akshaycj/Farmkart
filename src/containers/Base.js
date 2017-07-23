import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { firebaseAuth, ref} from '../helpers/constants'
import { logout } from '../helpers/auth';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardTitle } from 'material-ui/Card';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem'


class Base extends React.Component{
  static muiName = 'FlatButton';
  constructor(props) {
    super(props);
  this.state = {
    logged: false,
    open: false,
    seller:false,
  };
  this.style={

    labelText:{
      color:'white',
      fontWeight: 'bold',
    },

  };
  this.onDrawerClick = this.onDrawerClick.bind(this);
  this.setSeller = this.setSeller.bind(this);
  }

  onLogout(){
    logout()
    this.setState({
    logged: false,

    })
  }

  onDrawerClick(){
    this.setState({open: !this.state.open});
  }


  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setSeller(user);
        this.setState({
        logged: true,

        })
      }
    })
  }

  setSeller(user){
    var self = this;
    if(user){

      ref.child('users/'+user.uid).once('value',function(snapshot){
        var data ={
          email:'',
          seller:false,
        };

        data = snapshot.val();
        self.setState({seller:data.seller});

      })
    }

  }

  render(){
    const pr= this.props;
    return(<div>
      <div >
          <AppBar
          title="FarmKart"
          onLeftIconButtonTouchTap={this.onDrawerClick}
          iconElementRight={this.state.logged?<Link to="/login" onClick={this.onLogout}>
          <FlatButton label="Log Out" labelStyle={this.style.labelText} style={{marginTop:5}}/></Link>:<div style={{marginTop:5}}>
            <Link to="/login" ><FlatButton label="Log in" labelStyle={this.style.labelText}/></Link>
            <Link to="/signup"><FlatButton label="Sign Up" labelStyle={this.style.labelText}/></Link>
          </div>}
          />
      </div>
        <Drawer open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
            containerStyle={{'position': 'absolute', 'top': '64px'}}
           >

          {this.state.seller?<MenuItem onTouchTap={this.onDrawerClick}><Link to="/profile"><FlatButton label="Profile" /></Link></MenuItem>:<div></div>}

         </Drawer>

        {pr.children}


    </div>);
  }
}


export default Base;
