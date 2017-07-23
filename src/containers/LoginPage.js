import React from 'react';
import { Link } from 'react-router';
import { Card, CardText, CardHeader } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { login } from '../helpers/auth'
import logo from '../images/onion.png';



class LoginPage extends React.Component {

  constructor(props) {
    super(props);


    this.state = {
      errors: {},
      user: {
        email: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }


  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    console.log('email:', this.state.user.email);
    console.log('password:', this.state.user.password);

    login(this.state.user.email,this.state.user.password);
  }

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


  render() {
    return (
      <Card className="container">
        <form action="/" onSubmit={this.processForm}>
          <h2 className="card-heading"><img src={logo} width="100" height="100"/></h2>

          {this.state.errors.summary && <p className="error-message">{this.state.errors.summary}</p>}

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

          <div className="button-line">
            <RaisedButton type="submit" label="Log in" primary />
          </div>

          <CardText>Dont have an account? <Link className="link-text" to={'/signup'}>Create one</Link></CardText>

        </form>

      </Card>
    );
  }

}

export default LoginPage;
