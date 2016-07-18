'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Testobject Schema
 */
var TestTemplateSchema = new Schema(
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
   
   testObject: String,
   indicators: {type:Array, default:[]}

});
mongoose.model('TestTemplate', TestTemplateSchema);