import {db} from './constants';

export function getData(query,coords){
  var data=[];
  const dbRef =db.ref('veggies/'+query);

    return dbRef.once('value')
      .then(function(snapshot){
        snapshot.forEach(function(child){
          var user={
            name:'',
            email:'',
            address:'',
            phone:'',
            lat:'',
            lng:'',
            veggies:[]
          };
          user.name = child.val().name;
          user.email= child.val().email;
          user.address = child.val().address;
          user.phone = child.val().phone;
          user.lat = child.val().lat;
          user.lng = child.val().lng;
          user.veggies = child.val().veggies;
          getDist(coords,user.lat,user.lng);
          data.push(user);
        })
        return data;
      })

};

export function getDist(coords,lat,lng){

  var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?index=&origins='+coords.lat+','+coords.lng+'&destinations='+lat+','+lng+'&mode=driving&units=metric&language=en&avoid=&sensor=false&key=AIzaSyCRJ6jaWYmPWQZGjWlzWRKP72rJqc0IcfA';

  return fetch(url,{method: 'GET',dataType: 'jsonp', cache: false,})
    .then(function(data){return data.json()})
    .then(function(distData){console.log("dist",distData)})

}
