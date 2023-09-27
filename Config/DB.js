const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect( 'mongodb+srv://deploydata720:EFV8AxcsXrW3dZM2@cluster0.hi7pxnf.mongodb.net/Data', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
