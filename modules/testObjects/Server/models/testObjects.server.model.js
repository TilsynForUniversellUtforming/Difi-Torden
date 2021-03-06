'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Testobject Schema
 */
var TestObjectSchema = new Schema(
{
    title: String,
    description: String,
    created_by: [
    {
        type: String,
        default: "Unknown"
    }],
    created_at:
    {
        type: Date,
        default: Date.now
    },
    activities: [
    {}]
});
mongoose.model('TestObject', TestObjectSchema);