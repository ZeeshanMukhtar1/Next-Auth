import { connectToDB } from '@/db/dbConfig';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';

// connting to db
connectToDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    // we will token from the user request
    const { token } = reqBody;
    console.log(token);
    // find ing the token in my db with its expiry date
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    // validation if the token is not found
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 400 }
      );
    }
    // console.log(user);
    // updating the user status in db and removing the token and expiry date
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    // most important step to save the user with "Await" keyword
    await user.save();

    return NextResponse.json({
      message: 'Email verified successfully',
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
