const mongoose = require('mongoose');

const downloadLinkSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    enum: ['windows', 'macos', 'linux', 'android', 'ios']
  },
  version: {
    type: String,
    required: true
  },
  downloadUrl: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  description: String,
  fileSize: String,
  requirements: String
});

module.exports = mongoose.model('DownloadLink', downloadLinkSchema); 