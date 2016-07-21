'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Testobject Schema
 */
var pictureSchema = new Schema(
{
    
    alt: String,
    description: String,
    uploaded_by: [
    {
        type: String,
        default: "Unknown"
    }],
    uploaded_at:
    {
        type: Date,
        default: Date.now
    },
   
});
mongoose.model('Picture', pictureSchema);