const Hue = require('./Hue');
const admin = require('firebase-admin');

const hue = new Hue();

// TODO replace param to database value
hue.changeAllLightsState(true);