import mongoose from 'mongoose';

export async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('Connected to db');
    });

    connection.on('error', (error) => {
      console.log('Error while connecting to db', error);
      process.exit(1);
    });
  } catch (error) {
    console.log('Error while connecting to db', error);
  }
}
