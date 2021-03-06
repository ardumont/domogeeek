/**
 * DomoGeeek v0.1
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Energy module for the Aenon Lab HEM2.
 * @author: ltoinel@free.fr
 */
 
// Local require
var bus = require( '../bus' );
var config = require('../config');
var openkarotz = require('../../../libs/openkarotz');

//Model
var Event = require('../models/event');

// The command to listen
const COMMAND_CLASS_METER = 50;

// RGB to Hex
function rgbToHex(r, g, b) {
    return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/**
 * We listen for a COMMAND_CLASS_METER event.
 * This event is sent by the Aeon HEM2 power energy meter.
 */
bus.on(COMMAND_CLASS_METER, function(nodeid, value){

	// Global Energy
	if (nodeid == 7 && value['label'] == "Energy"){
		var energy = value['value'];
		global.data['energy'] = energy;
	}
	
	// Current power consumed
	else if (nodeid == 7 && value['label'] == "Power"){
		var power = value['value'];
		global.data['power'] = power;
		
		// Max possible consume is 12000 Wh
		var n = power / config.power.max * 100;
		var red = (255 * n) / 100;
		var green = (255 * (100 - n)) / 100;
		var blue = 0;
		
		var color =  rgbToHex(red,green,blue);
		console.log("Color :  " + color);
		
		// Change the OpenKarotz led
		openkarotz.led(config.openkarotz, color);
		
		// Make the OpenKarotz talking
		if (power > config.power.voice){
			openkarotz.talk(config.openkarotz, "La maison consomme "+ power + " Watt");
		}
		
		// Saving the event
		new Event({ nodeid: nodeid,
		    comclass: comclass,
		    type: value['type'],
		    label: value['label'],
		    value: value['value']}).save();
		
	} 
});
