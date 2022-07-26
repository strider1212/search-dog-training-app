const usersKeyArray = ['username', 'password', 'firstName', 'lastName', 'email', 'phoneNumber', 'k9s'];

const teamsKeyArray = ['team_name', 'created_by', 'date_created', 'members', 'admin_members'];

const logsKeyArray = ['log_created_by', 'date', 'address', 'team', 'training_type', 'training_hours', 'travel_hours', 'aggregate_hours', 'mileage', 'tolls', 'time_of_day', 'weather', 'temperature', 'wind_speed', 'humidity', 'placement_description', 'placed_by', 'scent_source', 'source_container', 'time', 'water', 'water_data', 'individual_runs'];

const waterKeyArray = ['open', 'submerged', 'depth', 'salt_water', 'water_type', 'temperature', 'associated_log'];

const individual_runsKeyArray = ['user', 'time', 'blind', 'k9', 'distractions', 'notes', 'associated_log'];

module.exports = { usersKeyArray, teamsKeyArray, logsKeyArray, waterKeyArray, individual_runsKeyArray }
