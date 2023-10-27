const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect( 'mongodb://127.0.0.1:27017/Facebook', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
