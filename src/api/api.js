import axios from 'axios'

let api = {
  addReservation: (user, reservation)=>{
    let promise  = axios({
      data: {
        user: user,
        reservation: reservation
      },
      method: 'post',
      url: '/api/reservations/'
    });
    return promise;
  },
  checkAvailability: (resId, user, isNewReservation, start, end, spaceId, people, beds)=>{
    let promise  = axios({
      data: {
        res_id: resId,
        user: user,
        is_new_res: isNewReservation,
        start: start,
        end: end,
        space_id: spaceId,
        people: people,
        beds: beds
      },
      method: 'post',
      url: '/api/checkAvailability/'
    });
    return promise;
  },
  checkAvailabilityByDates: ( start, end, resId ) => {
    if(!resId){
      resId = null;
    }
    let promise  = axios({
      method: 'get',
      url: '/api/checkAvailabilityByDates/' + start + '/' + end 
    });
    return promise;    
  },
  createCustomer: ( user, customer ) => {
    let promise  = axios({
      data: {
        user: user,
        customer: customer
      },
      method: 'post',
      url: '/api/customers/'
    });
    return promise;    
  },
  getInitialData: () => {
    
  },
  getReservation: (id)=>{
    let request = axios({
      method: 'get',
      url: '/api/reservations/' + id,
      });
     return request    
  },
  getReservations: ()=>{
    let request = axios({
      method: 'get',
      url: '/api/reservations/',
      //data: user
      });
     return request
  },
  getSpaces: ()=>{
    return axios({
      method: 'get',
      url: '/api/spaces/',
      //data: user
    });
  },
  getSpaceData: ()=>{
    return axios.all([ axios.get('/api/spaces/'), axios.get('api/types/') ])
      .then(axios.spread(function (spaces, types) {
        return {
           spaces: spaces,
           types: types
        }
      }));
  },
  getSelectGroups: ()=>{
    return axios({
      method: 'get',
      url: '/api/selectGroups/',
      //data: user
    });    
  },
  getSpaceTypes: ()=>{
    return axios({
      method: 'get',
      url: '/api/types/',
      //data: user
    });
  },
  login: (username, password) => {
    console.log("firing login @ api");
    const request = axios({
      method: 'post',
      data: {
        username: username,
        password: password
      },
      url: '/api/login/'
    });
    return request;    
  },
  logoff: (userId, key) => {
    let request = axios({
      url: '/api/logoff/',
      data:{
        userId: userId,
        key: key
      },
      method: 'post'
    });
    return request;
  },
  openShift: ( userId, key, startDate)=>{

    const request = axios({
      method: 'post',
      data: {
        userId: userId,
        key: key,
        startDate: startDate        
      },
      url: '/api/openShift/'
    });
    return request;
  },
  searchCustomers: (lastName, firstName ) => {
    const request = axios({
      method: 'post',
      data: {
        lastName: lastName,
        firstName: firstName
      },
      url: '/api/customerSearch/'
    });
    return request;
  },
  updateCustomer: ( args ) => {
    let request = axios({
      url: '/api/customers/' + args.id,
      data: args,
      method: 'post'
    });
    return request;
  },
  updateReservation: ( user, reservation ) => {
    let request = axios({
      url: '/api/reservations/' + reservation.id,
      data: {
        user: user,
        reservation: reservation
      },
      method: 'put'
    });
    return request;
  }
};
export default api;


