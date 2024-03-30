import { connectToDB } from '@/db/dbConfig';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

// connting to db
connectToDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    // getting required detaild from user request
    const { email, password } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: 'user does not exists!' },
        { status: 400 }
      );
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    // returns true or false
    if (!validPassword) {
      return NextResponse.json({ error: 'Invalid password!' }, { status: 400 });
    }

    // create and assign a token
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    // sending response back to user
    const response = NextResponse.json({
      message: 'Logged in successfully',
      success: true,
    });

    // setting cookie
    response.cookies.set('token', token, {
      httpOnly: true, // it means that user can see the cookie but cant modify it
    });

    return response;

    console.log('user exists');
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
