import { connectToDB } from '@/db/dbConfig';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';
import { getDataFromToken } from '@/helpers/getDataFromToken';

// connting to db
connectToDB();

export async function POST(request: NextRequest) {
  // extract data from token
  try {
    const userid = await getDataFromToken(request);
    const user = await User.findOne({ _id: userid }).select('-password');

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'User found',
      data: user,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
}
