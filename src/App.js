import React, { Component } from 'react';
import './App.css';
import {Card,CardTitle,CardHeader,CardText} from 'material-ui/Card';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import AutoComplete from 'material-ui/AutoComplete';
import {getData} from './helpers/data';
import Person from 'material-ui/svg-icons/maps/person-pin';
import Call  from 'material-ui/svg-icons/communication/call';
import Bag from 'material-ui/svg-icons/action/shopping-basket'
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

 var coords = {
  lat: 10.04428654,
  lng: 76.32461384
};

const params = {v: '3.exp', key: 'AIzaSyAXarlLzOVJK5VIp3F9P5--Jw3SnoTgjIY'};

const items= [];
const mark = [];
const info = [];
const userid='';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      searchText: '',
      data: [],
    }
    this.onDataUpdate = this.onDataUpdate.bind(this);
  }


  componentDidMount () {
    this.getLocation();

  }

  getLocation(){

    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            coords['lat']= pos.lat;
            coords['lng']= pos.lng;
            console.log('pos',pos);

          }, function() {
          });
        } else {
          // Browser doesn't support Geolocation

        }
  }

  onDataUpdate(obj,id){
    var self =this;

    getData(obj,coords).then(function(data){self.setState({data}); console.log("data",self.state.data);})

  }

  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true
    });
  }

  onUpdateInput = (val,obj)=>{
    this.setState({searchText:val})
  }
  onDragEnd(e) {
    console.log('onDragEnd', e);
  }

  onCloseClick() {
    console.log('onCloseClick');
  }

  onClick(e) {
    console.log('onClick', e);
  }
  /*
  vegRender(data){
    const d =[];
    for(let i= 0; i<data.length; i++){
      d.push(
        <ListItem
          primaryText={data.i}
        />
    );
    }
    return d;
  } */
  render() {
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
    ];

    const data= this.state.data;

    for(let i=0; i<data.length; i++){
     
      mark.push(
          <Marker
            lat={data[i].lat}
            lng={data[i].lng}
            draggable={true}
            onDragEnd={this.onDragEnd} />
      )
      info.push(
        <InfoWindow
          lat={data[i].lat}
          lng={data[i].lng}
          content={data[i].name}
          onCloseClick={this.onCloseClick} />
      )
    }

    return (
      <div style={{
      margin:10,
      display: 'flex',
      flexDirection:'row',
      justifyContent:'space-around',


    }}>
        <Gmaps
        width={'800px'}
        height={'600px'}
        lat={coords.lat}
        lng={coords.lng}
        zoom={15}
        loadingMessage={'Wait for it..'}
        params={params}
        onMapCreated={this.onMapCreated}>
        <Marker
          lat={coords.lat}
          lng={coords.lng}
          draggable={true}
          onDragEnd={this.onDragEnd} />
        <InfoWindow
          lat={coords.lat}
          lng={coords.lng}
          content={'You are here!'}
          onCloseClick={this.onCloseClick} />
        {mark}
        {info}
      </Gmaps>

      <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-start'}}>

        <AutoComplete
        onUpdateInput={this.onUpdateInput}
          onNewRequest={this.onDataUpdate}
          searchText={this.state.searchText}
          floatingLabelText="Example: 'Thakkali' or 'Tomato' "
          filter={AutoComplete.fuzzyFilter}
          dataSource={veggies}
          maxSearchResults={7}
          />
        <br />
        {this.state.data.map(data=>(
          <Card >
          <CardHeader
            avatar={<Person color="#0a7e07"/>}
            title={data.name}
            subtitle={data.address}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <div >
  
              <List>
  
                <ListItem
                  leftIcon={<Call color="#0a7e07" />}
                  primaryText={data.phone}
                  secondaryText="Mobile"
                />
                
              </List>
              <Card>
              <CardHeader
            avatar={<Bag color="#0a7e07"/>}
            title="Veggies"
            
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
                {data.veggies.map((item,index)=>(
                  <ListItem
                  primaryText={item}
                />
                ))}
                </CardText>
              </Card>
              
            </div>
        </CardText>
      </Card>
        ))}
      </div>
      </div>
    );
  }
}

export default App;
