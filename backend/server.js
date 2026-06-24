require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');

const path=require('path');

const eventRoutes=require('./routes/events');
const sessionRoutes=require('./routes/sessions');


const app= express();
app.use(cors({
  origin: true
}));
app.use(express.json());

app.use(express.static(
    path.join(__dirname, 'build')
));

app.use(express.static('public'));

app.use('/api/events',eventRoutes);
app.use('/api/sessions',sessionRoutes);

app.use((req, res) => {
  res.sendFile(
    path.join(__dirname, 'build', 'index.html')
  );
});

mongoose.connect(process.env.MONGODB_URI).then(()=>
console.log('MongoDb is connected'))
.catch(err=> console.error(err));

const PORT= process.env.PORT || 5000;

app.listen(PORT, ()=>console.log(`Backend running on port ${PORT}`));
