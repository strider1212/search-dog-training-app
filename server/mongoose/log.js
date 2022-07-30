const mongoose = require('mongoose');

const { waterSchema } = require('./water');

const logSchema = new mongoose.Schema({
  "created_by": {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  "date": Date,
  "address": String,
  "Team": {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
  "training_type": String,
  "member_name": {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  "k9_name": {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  "general_hours": Number,
  "traing_hours": Number,
  "travel_hours": Number,
  "aggregate_hours": Number,
  "mileage": Number,
  "tolls": Number,
  "time_of_day": String,
  "weather": String,
  "temperature": String,
  "wind_speed": String,
  "humidity": Number,
  "placement": String,
  "scent_source": String,
  "source_container": String,
  "time": Number,
  "placed_by": {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  "water": Boolean,
  "water_data": waterSchema
})



  //water schema
  //individual member schema
    //blind?

  
  
//   {
//     "building - closed": {
//       "water": false,
//       "placement": {
//         "Elivated": {
//           "scent_source": "tissue",
//           "source_container": "glass",
//           "time": 360000
//         },
//         "Surface": {
//           "scent_source": "blood",
//           "source_container": "fabric",
//           "time": 360000
//         },
//         "Surface": {
//           "scent_source": "bone",
//           "source_container": "N/A",
//           "time": 360000
//         }
//       },
//       "placed_by": {
//         "person": "Susan Cushing",
//         "order_placer_worked": 1
//       },
//       "blind": true,
//       "distractions": ["N/A"]
//     },
//     "vehicle": {
//       "water": false,
//       "placement": {
//         "Surface": {
//           "scent_source": "tissue",
//           "source_container": "metal",
//           "time": 300000
//         }
//       },
//       "placed_by": {
//         "person": "Cheryl Burke",
//         "order_placer_worked": 3
//       },
//       "blind": false,
//       "distractions": ["N/A"]
//     },
//     "building-outside": {
//       "water": false,
//       "placement": {
//         "Surface": {
//           "scent_source": "tissue",
//           "source_container": "glass",
//           "time": 300000
//         }
//       },
//       "placed_by": {
//         "person": "Tracey Horner",
//         "order_placer_worked": 3
//       },
//       "blind": false,
//       "distractions": ["dog food"]
//     },
//     "woods - thin": {
//       "water": false,
//       "placement": {
//         "Surface": {
//           "scent_source": "body - parial",
//           "source_container": "fabric",
//           "time": 600000
//         }
//       },
//       "placed_by": {
//         "person": "Cheryl Burke",
//         "order_placer_worked": 2
//       },
//       "blind": true,
//       "distractions": ["deer"]
//     },
//     "building - open": {
//       "water": false,
//       "placement": {
//         "Surface": {
//           "scent_source": "tissue",
//           "source_container": "metal",
//           "time": 300000
//         },
//         "Surface": {
//           "scent_source": "blood",
//           "source_container": "fabric",
//           "time": 300000
//         }
//       },
//       "placed_by": {
//         "person": "Tracey Horner",
//         "order_placer_worked": 2
//       },
//       "blind": false,
//       "distractions": ["scat"]
//     },
//     "water - open": {
//       "water": true,
//       "placement": {
//         "submerged": {
//           "scent_source": "tissue",
//           "source_container": "metal"
//         }
//       },
//       "placed_by": {
//         "person": "Susan Cushing",
//         "order_placer_worked": 1
//       },
//       "blind": true,
//       "distractions": ["N/A"],
//       "depth": "50ft",
//       "water_type": "tidal (high tide)",
//       "salinity": "sea (salt)",
//       "temperature": 45
//     },
//     "shoreline": {
//       "water": true,
//       "placement": {
//         "submerged": {
//           "scent_source": "tissue",
//           "source_container": "fabric"
//         }
//       },
//       "placed_by": {
//         "person": "Susan Cushing",
//         "order_placer_worked": 1
//       },
//       "blind": true,
//       "distractions": ["N/A"],
//       "depth": "25ft",
//       "water_type": "creek",
//       "salinity": "fresh",
//       "temperature": 35
//     }
//   }
// })

const Log = mongoose.model('Log', logSchema);

module.exports = {logSchema, Log}