import React from 'react';

import { auth } from '../helpers/auth';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import Toggle from 'material-ui/Toggle';


class SignUpPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      open: false,
      progress: false,
      user: {
        email: '',
        name: '',
        password: ''
      },
      toggled:false,
    };
    this.toggleData = this.toggleData.bind(this);
    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }
  changePro = () =>{
    this.setState({progress: false});
    this.setState({open: true});
    console.log('reached','here');
  };

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    this.setState({progress: true})
    console.log('name:', this.state.user.name);
    console.log('email:', this.state.user.email);
    console.log('password:', this.state.user.password);


    if(auth(this.state.user.email,this.state.user.password,this.state.toggled)){
        var delayMillis = 2000;

        setTimeout(function(){this.setState({progress: false});
        this.setState({open: true});}.bind(this),delayMillis);

      console.log('stop','asd');
    }
  }
  toggleData(event,input){
    console.log("input",input);
    this.setState({toggled:input});
  }

  /**
   * Render the component.
   */
  render() {
    return (

    <div>

      <Card className="container">
        <form action="/" onSubmit={this.processForm}>
          <h2 className="card-heading">Sign Up</h2>

          {this.state.errors.summary && <p className="error-message">{this.state.errors.summary}</p>}

          <div className="field-line">
            <TextField
              floatingLabelText="Name"
              name="name"
              errorText={this.state.errors.name}
              onChange={this.changeUser}
              value={this.state.user.name}
            />
          </div>

          <div className="field-line">
            <TextField
              floatingLabelText="Email"
              name="email"
              errorText={this.state.errors.email}
              onChange={this.changeUser}
              value={this.state.user.email}
            />
          </div>

          <div className="field-line">
            <TextField
              floatingLabelText="Password"
              type="password"
              name="password"
              onChange={this.changeUser}
              errorText={this.state.errors.password}
              value={this.state.user.password}
            />

          </div>

          <div className="field-line">
            <Toggle label="Enable Seller Profile" defaultToggled={this.state.toggled}
                onToggle={this.toggleData} style={{maxWidth:300,marginLeft:60}} labelStyle={{fontWeight:'bold'}}/>

          </div>
          <div  >
            {this.state.progress?<CircularProgress   />:
              <div><Snackbar
              open={this.state.open}
              message="User Created"
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose} />
              </div>}
          </div>
          <div className="button-line">
            <RaisedButton type="submit" label="Create New Account" primary />
          </div>

          <CardText >Already have an account? <Link to={'/login'} style={{color:"#259b24"}}>Log in</Link></CardText>
        </form>
      </Card>

    </div>
    );
  }

}

export default SignUpPage;
