import {Card,CardTitle} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {firebaseAuth,ref} from '../helpers/constants';
import Toggle from 'material-ui/Toggle';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';

export default class Profile extends React.Component{
  constructor(props){
    super(props);
    this.styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        marginLeft: 10,
        display: 'flex',
        flexWrap: 'wrap',
      },
      flexRow:{
        display: 'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
      },
    };
    this.state = {
        user:{
          name:'',
          email:'',
          address:'',
          phone:'',
          lat:'',
          lng:'',
          veggies:[]
        },
        uid:'',
        open:false,
        chipData:[],
        searchText: '',
    }
    this.ontextChange = this.ontextChange.bind(this);
    this.onDataUpdate = this.onDataUpdate.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.searchUpdate = this.searchUpdate.bind(this);
    this.onDivUpdate = this.onDivUpdate.bind(this);
  }

  handleUpdateInput = (searchText) => {
    this.setState({
      searchText: searchText,
    });
  };

  handleRequestDelete = (key) => {

    this.chipData = this.state.chipData;
    const chipToDelete = this.chipData.map((chip) => chip.key).indexOf(key);
    this.chipData.splice(chipToDelete, 1);
    this.setState({chipData: this.chipData});
  };

  searchUpdate(obj,id){
    this.setState({chipData: this.state.chipData.concat(obj),searchText: "",});

  }
  ontextChange(event){
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({user});
  }
  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({uid:user.uid})

      }
    })
  }

  renderChip(data) {
    return (
      <Chip
        key={data}
        onRequestDelete={() => this.handleRequestDelete(data.indexOf())}
        style={this.styles.chip}>
        {data}
      </Chip>
    );
  }


  getLocation(){
    var self= this;
    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            const user = self.state.user;
            user['lat'] = pos.lat;
            user['lng']= pos.lng
            self.setState({user});
            console.log("pos",pos);

          }, function() {
          });
        }
        else {

        }
  }

  onDataUpdate(){
    const user = this.state.user;
    user['veggies'] = this.state.chipData;
    this.setState({user});
    ref.child('profiles/'+this.state.uid).set(this.state.user);
    for(let i=0; i<this.state.chipData.length;i++){
      ref.child('veggies/'+this.state.chipData[i]+'/'+this.state.uid)
        .set(this.state.user);
    }


  }

  onDivUpdate(){
    this.setState({open:true});
  }


  render(){
    const veggies=[
      "Uralakizhangu – Potato",
      "Thakkali – Tomato",
      "Vendakka – Okra (Ladies Finger)",
      "Vazhuthananga – Eggplant",
      "Pavakka (Kaipakka) – Bitter Gourd",
      "Muringakka – Drumstick",
      "Payru – Beans",
      "Cheera – Spinach",
      "Muttakoos – Cabbage",
      "Mathanga – Pumpkin",
      "Kumbalanga – Ash Gourd",
      "Peechinga – Ridge Gourd",
      "Kovakka – Ivy Gourd",
      "Velarikka – Cucumber",
      "Padavalanga – Snake Gourd",
      "Koorka – Chinese Potato",
      "Kappa – Tapioca"
    ]
    return(
      <div style={this.styles.flexRow}>
        <Card className="container">
          <CardTitle title="Profile" />
            <TextField name="name" floatingLabelText="Name:" value={this.state.user.name} onChange={this.ontextChange} floatingLabelFixed/>
            <TextField name="email" floatingLabelText="E-mail:" value={this.state.user.email} onChange={this.ontextChange} floatingLabelFixed/>
            <TextField name="phone" floatingLabelText="Mobile:" value={this.state.user.phone} onChange={this.ontextChange} floatingLabelFixed/>
            <TextField name="address" floatingLabelText="Address:" value={this.state.user.address} onChange={this.ontextChange} floatingLabelFixed/>


            <div className="field-line">
              <Toggle label="Fetch My Location" defaultToggled={false}
                  onToggle={this.getLocation.bind(this)} style={{maxWidth:300,marginLeft:60}} />

            </div>

              <div className="button-line">
                {!this.state.open?<RaisedButton  label="Done" primary onTouchTap={this.onDivUpdate}/>:<div></div>}
              </div>
        </Card>
        {this.state.open?
          <Card className="container" style={{minHeight:250,position:'realtive'}}>
            <CardTitle title="Add Veggies to Sell:" />
            <AutoComplete
              onUpdateInput={this.handleUpdateInput}
              onNewRequest={this.searchUpdate}
              searchText={this.state.searchText}
              floatingLabelText="Example: 'Thakkali' or 'Tomato' "
              filter={AutoComplete.fuzzyFilter}
              dataSource={veggies}
              maxSearchResults={7}
            />

            <div style={this.styles.wrapper}>
              {this.state.chipData.map(this.renderChip, this)}
            </div>
            <br /> <br />
            <RaisedButton label="Done" primary onTouchTap={this.onDataUpdate.bind(this)}/>
            <br/>
        </Card>
        :
        <div></div>
      }



      </div>
    );
  }
}
