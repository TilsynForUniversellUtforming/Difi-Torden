'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Activity Schema
 */
var ActivitySchema = new Schema(
{
    created:
    {
        type: Date,
        default: Date.now
    },
    user: String,
    title: String,
    inputs: [
    {}],
    description: String,
    images: [
    {}]
});

mongoose.model('Activity', ActivitySchema);