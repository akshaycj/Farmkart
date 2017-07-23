import { ref, firebaseAuth } from './constants';

var seller;


export function getSeller(){
  return seller;
}

export async function auth (email, pw,toggled) {
  var er=true;
    await firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then(function(user){saveUser(user,toggled)})
    .catch(function(ror){console.log('oops',ror);
    er = false;
    return er;
  console.log('inside',er); });

  return er;
}

export function logout () {
  console.log('LOGOUT','DONE');
  return firebaseAuth().signOut()
}

export async function login (email, pw) {
  await firebaseAuth().signInWithEmailAndPassword(email, pw)
  .then(function(user){setSeller(user);})

}

export function setSeller(user){
  if(user){

    ref.child('users/'+user.uid).once('value',function(snapshot){
      var data ={
        email:'',
        seller,
      };

      data = snapshot.val();

      seller= data.seller;
      console.log("seller",seller);
    })
  }

}

export function saveUser (user,toggled) {
  return ref.child(`users/${user.uid}`)
    .set({
      email: user.email,
      seller:toggled,
    })
    .then(() => user)
}
