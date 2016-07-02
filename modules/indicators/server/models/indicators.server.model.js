'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Indicator Schema
 */
var IndicatorSchema = new Schema({
    name: String,
    max_score: Number,
    description:String,
    created_by: [
    {
        type: String,
        default: "Roger"
    }],
    created_at:
    {
        type: Date,
        default: Date.now
    },
    comment: String,
    activities: [{}]
});
mongoose.model('Indicator', IndicatorSchema);
