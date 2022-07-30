const mongoose = require('mongoose');

const { waterSchema } = require('./water');

const logSchema = new mongoose.Schema({
  "log_created_by": {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  "date": {
    type: Date,
    required: true
  },
  "address": {
    type: String,
    required: true
  },
  "Team": {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Team',
    required: true
  },
  "training_type": {
    type: String,
    required: false
  },
  "traing_hours": {
    type: Number, 
    required: true
  },
  "travel_hours": {
    type: Number,
    required: true
  },
  "aggregate_hours": {
    type: Number,
    required: true
  },
  "mileage": {
    type: Number,
    required: true
  },
  "tolls": {
    type: Number,
    required: true
  },
  "time_of_day": {
    type: String,
    required: true
  },
  "weather": {
    type: String,
    required: true
  },
  "temperature": {
    type: String,
    required: true
  },
  "wind_speed": {
    type: String,
    required: true
  },
  "humidity": {
    type: Number,
    required: true
  },
  "placement_descpription": {
    type: String,
    required: true
  },
  "placed_by": {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  "scent_source": {
    type: String,
    required: true
  },
  "source_container": {
    type: String,
    required: true
  },
  "time": {
    type: Date,
    required: true
  },
  "water": {
    type: Boolean,
    required: true
  },
  "water_data": {
    child: waterSchema,
    required: false
  }
})



  //water schema
  //individual member schema
    //member
    //blind?
    //k9

  
  
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