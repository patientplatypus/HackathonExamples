var express = require('express');
var router = express.Router();
var axios = require('axios');


// initialize the Fitbit API client
const FitbitApiClient = require("fitbit-node");
const client = new FitbitApiClient({
	clientId: "22CR3Y",
	clientSecret: "06879499ccdb7efcb833592eda20bd60",
	apiVersion: '1.2' // 1.2 is the default
});

// redirect the user to the Fitbit authorization page
router.get("/authorize", (req, res) => {
	// request access to the user's activity, heartrate, location, nutrion, profile, settings, sleep, social, and weight scopes
	// res.redirect(client.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight', 'http://localhost:5000/callback'));

  res.send({"authorizeurl": client.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight', 'http://localhost:5000/callback')})
});

router.post("/request", (req,res)=>{
  console.log('inside request, and req.body ', req.body.data.token);
  axios.defaults.headers.common['Authorization'] = "Bearer " + req.body.data.token;
  var url = 'https://api.fitbit.com/1/user/6DXRDL/activities/heart/date/today/7d.json'
  axios.get(url)
    .then((response)=>{
      console.log('inside response from getIOT : ', response.data);
      // dispatch(AXIOSRETURNGETIOT(response))
      res.send({"HR": response.data})
    })
    .catch(error => {
      console.log('inside error from login auth and response : ', error);
      // dispatch(AXIOSERRORRGETIOT(error))
      res.send({"HRERROR": response.data})
    })

})

// handle the callback from the Fitbit authorization flow
router.post("/callback", (req, res) => {
	// exchange the authorization code we just received for an access token
  // console.log('value of req.data: ', req.data);
  console.log('value of req.body.data.passedurl', req.body.data.passedurl);
  // console.log('value of req.body.passedurl', req.body.passedurl);
  axios.get(req.body.data.passedurl)
  .then(response=>{
    console.log('value of response: ', response);
  })
  .catch(error=>{
    console.log('value of error: ', error);
  })
  // client.getAccessToken(req.url).then(result => {
	// // client.getAccessToken(req.query.code, 'http://localhost:5000/callback').then(result => {
	// 	// use the access token to fetch the user's profile information
  //   // https://api.fitbit.com/1/user/-/activities/heart/date/today/1d.json
	// 	// client.get("/profile.json", result.access_token).then(results => {
  //   //   console.log(results[0]);
	// 	// 	res.send(results[0]);
	// 	// });
  //
  //   // /activities/heart/date/today/1d.json
  //
  //   client.get("/activities/heart/date/today/1d.json", result.access_token).then(results => {
  //     console.log(results[0]);
  //   	// res.send(results[0]);
  //     res.send({"results":results[0]})
  //   });
	// }).catch(res.send);
});


module.exports = router;
