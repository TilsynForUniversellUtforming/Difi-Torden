'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Indicator Schema
 */
var RouteSchema = new Schema(
{
    condition:{},
    targetType:{type: String, default:'NEXT_INPUT'},
    targetDetails:{}

});
mongoose.model('Route', RouteSchema);