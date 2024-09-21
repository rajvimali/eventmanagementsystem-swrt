const express = require('express');
const { uploadFile, handleFileUpload } = require('../controllers/uploadController');
const router = express.Router();

// Route to handle file upload
router.post('/upload', uploadFile, handleFileUpload);

module.exports = router;
