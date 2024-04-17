
const jwt = require('jsonwebtoken')
// const secret = "tech4dev"
const secret = "techdev";
// const users ={
//     userid : 1,
//     userName :"user",
    
// }
const dashBoard = async(req,res)=>{
res.status(200).json({message:"Welcome to AppName"})
}

const blog = async(req,res)=>{
    res.status(200).json({message: req.text})
    }

const settings = async(req,res)=>{
    res.status(200).json({message: req.text})
    }
    
const support = async(req,res)=>{
    res.status(200).json({message: req.text})
    }  
// const forgotPassword = async(req,res)=>{
//     res.status(200).json({message: req.text})
//     }

// const resetPassword = async(req,res)=>{
//     res.status(200).json({message: req.text})
//     }

// Function to verify user credentials against the database
const verifyUserCredentials = async (email, password) => {
    // logic to verify user credentials from the database
    // For example, using a User model:
    const user = await User.findOne({ email });
    
    if (user && user.comparePassword(password)) {
        // If the user exists and the password is correct
        return user;
    }
    return null;
};``

const login = async (req, res) => {
    try {
        // Extract email and password from the request body
        const { email, password } = req.body;

        // Verify user credentials
        const user = await verifyUserCredentials(email, password);

        if (!user) {
            // If credentials are invalid, send an error response
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token with the user's data as the payload
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
            },
            secret,
            {
                expiresIn: '1h', // Token expiration time
            }
        );

        // Send a response back to the client with the token and user information
        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                email: user.email,
            },
        });
    } catch (error) {
        // Handle unexpected errors
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const details = async(req,res)=>{
    res.status(200).json({message:"message"})  
console.log("details")
}

const logout = async (req, res) => {
    req.session.destroy();
    res.json({ message: 'Logout successful' });
};

module.exports = {
    dashBoard,
    blog,
    settings,
    logout,
    support,
    login,
    details
};