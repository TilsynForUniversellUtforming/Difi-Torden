'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var RequirementSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  user: String,
  nr_v9:String,
  req_in_standard:String,
  level_no:String,
  level_org:String,
  standard: String,
  doc_type: String,
  nr_chapter:String,
  chapter_title: String,
  grading:String,
  category:String,
  duplicates:String,
  giude_comments:String,
  guide_translated:String,
  added:String,
  name:String
});

mongoose.model('Requirement', RequirementSchema);

  // nr_v9:String,
  // req_in_standard:String,
  // level_no:String,
  // level_org:String,
  // standard: String,
  // doc_type: String,
  // nr_chapter:String,
  // chapter_title: String,
  // grading:String,
  // category:String,
  // duplicates:String,
  // giude_comments:String,
  // guide_translated:String,
  // added:String,
  // name:String