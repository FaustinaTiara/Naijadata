const { getConnection, runQueryValues } = require('../model/dbPool');
const nodemailer = require('nodemailer');

// Function to generate a random verification code
function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
}

// Function to send the verification code to the user's email
async function sendVerificationEmail(email, code) {
    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Email options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your Verification Code',
        text: `Your verification code is: ${code}`,
    };

    // Send the email and handle errors
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Failed to send verification email.');
    }
}

// Signup function
async function signup(req, res) {
    const {
        email,
        password,
        firstName,
        lastName,
        maidenName,
        day,
        month,
        year,
        address,
        state,
        lga,
        nin,
        document,
        biometrics,
    } = req.body;

    // Generate a verification code
    const verificationCode = generateVerificationCode();

    let connection;

    try {
        connection = await getConnection();

        // SQL query to insert user data along with the verification code
        const sqlQuery = `
            INSERT INTO DataForms
            (email, password, first_name, last_name, maiden_name, day, month, year, address, state, lga, nin, document, biometrics, verification_code)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        // Values for the query
        const values = [email, password, firstName, lastName, maidenName, day, month, year, address, state, lga, nin, document, biometrics, verificationCode];

        // Run the query and insert data
        await runQueryValues(connection, sqlQuery, values);

        // Release the connection
        connection.release();

        // Send verification email
        await sendVerificationEmail(email, verificationCode);

        res.status(200).json({ message: 'User signed up successfully! Please check your email for the verification code.' });
    } catch (error) {
        if (connection) {
            connection.release();
        }
        console.error('Signup error:', error);
        res.status(500).json({ error: 'An error occurred during signup.' });
    }
}

// Function to verify the provided code
async function verifyCode(req, res) {
    const { email, code } = req.body;

    let connection;

    try {
        connection = await getConnection();

        // SQL query to verify the code and update the email_verified flag
        const sqlQuery = `
            UPDATE DataForms
            SET email_verified = TRUE
            WHERE email = ? AND verification_code = ?
        `;

        // Execute the query
        const result = await runQueryValues(connection, sqlQuery, [email, code]);

        // Release the connection
        connection.release();

        if (result.affectedRows > 0) {
            // If the code was verified and updated, return success response
            res.status(200).json({ message: 'Email verified successfully!' });
        } else {
            // If no rows were updated, the code is invalid
            res.status(400).json({ error: 'Invalid verification code.' });
        }
    } catch (error) {
        if (connection) {
            connection.release();
        }
        console.error('Verification error:', error);
        res.status(500).json({ error: 'An error occurred during verification.' });
    }
}

// Function to process face image
const processFaceImage = async (userId, faceImage) => {
    // Use a facial recognition library to process the face image
    const faceData = await facialRecognitionLibrary.processImage(faceImage);

    let connection;

    try {
        // Storing the face recognition data in the database
        connection = await getConnection();
        const sqlQuery = 'UPDATE DataForms SET face_recognition_data = ? WHERE id = ?';
        await runQueryValues(connection, sqlQuery, [faceData, userId]);
    } catch (error) {
        console.error('Error processing face image:', error);
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = { signup, verifyCode, processFaceImage };
