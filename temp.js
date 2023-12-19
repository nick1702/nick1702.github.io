const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Configure AWS credentials
AWS.config.update({
    accessKeyId: 'YOUR_AWS_ACCESS_KEY_ID',
    secretAccessKey: 'YOUR_AWS_SECRET_ACCESS_KEY',
    region: 'YOUR_AWS_REGION'
});

// Create file storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Parse incoming form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Save form submission on form submission
app.post('/send-email', upload.array('file'), (req, res) => {
    const name = req.body.last_name;
    const email = req.body.email;
    const files = req.files;

    // Create directory for form submission
    const submissionId = uuidv4();
    const submissionDir = path.join(__dirname, 'submissions', submissionId);
    fs.mkdirSync(submissionDir);

    // Save form data to file
    const formData = {
        name: name,
        email: email,
        files: files.map(file => ({
            filename: file.originalname,
            size: file.size,
            path: path.join(submissionId, file.originalname)
        }))
    };
    const formDataString = JSON.stringify(formData);
    fs.writeFile(path.join(submissionDir, 'form-data.json'), formDataString, err => {
        if (err) {
            console.error(err);
        }
    });

    // Save uploaded files to directory
    files.forEach(file => {
        fs.writeFile(path.join(submissionDir, file.originalname), file.buffer, err => {
            if (err) {
                console.error(err);
            }
        });
    });

    res.redirect('thank-you.html');
});

// Start server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
