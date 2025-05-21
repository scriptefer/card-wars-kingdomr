const mongoose = require('mongoose');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cardwars', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('Connected to MongoDB');
    
    try {
        // Check if admin user already exists
        const existingAdmin = await User.findOne({ username: 'admin' });
        
        if (existingAdmin) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        // Create new admin user
        const adminUser = new User({
            username: 'admin',
            password: '123', // This will be hashed automatically by the User model
            isAdmin: true
        });

        await adminUser.save();
        console.log('Admin user created successfully');
        console.log('Username: admin');
        console.log('Password: 123');
    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        process.exit(0);
    }
}).catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
}); 