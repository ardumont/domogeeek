/**
 * DomoGeeek v0.1
 * https://github.com/ltoinel/domogeeek
 *
 * Copyright 2014 DomoGeeek
 * Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Configuration file for the ZwaveBus
 * @author: ltoinel@free.fr
 */

var config = {}

// Zwavebus
config.version = '0.1';
config.database = 'mongodb://localhost/zwavebus';
config.debug = false;
config.modpath = '/home/pi/domogeeek/deps/node-openzwave/lib';
config.saveconfig = false;
config.logging =  false; 
config.consoleoutput = true;
config.suppressrefresh = false;
config.device = '/dev/ttyUSB0';
config.phones = ['ether-1c:1a:c0:1f:c0:b1','ether-60:fa:cd:84:7d:d8'];

module.exports = config;

