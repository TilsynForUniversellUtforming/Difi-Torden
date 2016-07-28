'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Indicator Schema
 */
var InputSchema = new Schema(
{
    text: String,
    type: String,
    created_by:
    {
        type: String,
        default: "Unknown"
    },
    created_at:
    {
        type: Date,
        default: Date.now
    },
    mandytory: {type:Boolean, default:true},
    requirements:
    {
        type: Array,
        default: []
    },
    routes:
    {
        type: Array,
        default: []
    },
    solution:[{}],
    options: [
    {}],
    alternatives: [
    {}]
});
mongoose.model('Input', InputSchema);