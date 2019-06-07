import axios from 'axios'

let api = {
  addReservation: (customer, start, end, space_id, people, beds)=>{
    let promise  = axios({
      data: {
        customer: customer,
        start: start,
        end: end,
        space_id: space_id,
        people: people,
        beds: beds
      },
      method: 'post',
      url: '/api/reservations/'
    });
    return promise;
  },
  checkAvailability: (start, end, space_code, people, beds)=>{
    let promise  = axios({
      params: {
        start: start,
        end: end,
        spaceCode: space_code,
        people: people,
        beds: beds
      },
      method: 'get',
      url: '/api/checkAvailability/'
    });
    return promise;
  },
  checkAvailabilityByDates: ( start, end ) => {
    let promise  = axios({
      method: 'get',
      url: '/api/checkAvailabilityByDates/' + start + '/' + end 
    });
    return promise;    
  },
  checkUpdateAvailability: (start, end, space_code, people, beds, resId)=>{
    let promise  = axios({
      params: {
        start: start,
        end: end,
        spaceCode: space_code,
        people: people,
        beds: beds,
        resId
      },
      method: 'get',
      url: '/api/checkUpdateAvailability/'
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
      url: 'api/customerSearch/'
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
  }
};
export default api;


