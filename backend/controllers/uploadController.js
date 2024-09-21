const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Directory to store uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`); // Unique filename
  }
});

// File filter to allow only certain file types (optional)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error('Incorrect file type');
    error.status = 400;
    return cb(error, false);
  }
  cb(null, true);
};

// Initialize Multer with storage and file filter options
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file limit
  fileFilter: fileFilter
});

// Upload single file handler
exports.uploadFile = upload.single('file'); // 'file' is the field name from the form

// Upload route handler
exports.handleFileUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  res.json({ 
    message: 'File uploaded successfully', 
    filePath: req.file.path // Return the file path for frontend use
  });
};
