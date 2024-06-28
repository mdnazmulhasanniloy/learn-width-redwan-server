import httpStatus from 'http-status';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import moment from 'moment';
import config from '../../../config';
import ApiError from '../../../errors/api.error';
import { User } from '../user/user.models';
import { generateOtp } from '../../util/otpGenerator';
import { sendEmail } from '../../util/mailSender';
import { generateRandomNumber } from '../auth/auth.utils';

const verifyOtp = async (token: string, otp: string | number) => {
  console.log(otp, 'otp');
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'you are not authorized!');
  }
  let decode;
  try {
    decode = jwt.verify(token, config.access_token as string) as JwtPayload;
  } catch (err) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'session has expired.please try to submit otp withing 1 minute',
    );
  }
  const user = await User.findById(decode?.id).select('verification status');
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'user not found');
  }
  if (new Date() > user?.verification?.expiresAt) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'otp has expired. Please resend it',
    );
  }
  if (Number(otp) !== Number(user?.verification?.otp)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'otp did not match');
  }
  const deviceIdentifier = generateRandomNumber();

  const updateUser = await User.findByIdAndUpdate(
    user?._id,
    {
      $set: {
        isVerified: true,
        loggedInDevice: deviceIdentifier,
        // status: user?.isVerified === true ? user?.isVerified : true,
        verification: {
          otp: 0,
          expiresAt: moment().add(2, 'minute'),
          status: true,
        },
      },
    },
    { new: true },
  );
  const jwtPayload = {
    email: user?.email,
    id: user?._id,
  };
  const jwtToken = jwt.sign(jwtPayload, config.access_token as Secret, {
    expiresIn: config?.access_token_expires as string,
  });
  return {
    deviceIdentifier: updateUser?.loggedInDevice,
    accessToken: jwtToken,
  };
};

const resendOtp = async (email: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'user not found');
  }
  const otp = generateOtp();
  const expiresAt = moment().add(2, 'minute');
  const updateOtp = await User.findByIdAndUpdate(user?._id, {
    $set: {
      verification: {
        otp,
        expiresAt,
        status: false,
      },
    },
  });
  if (!updateOtp) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'failed to resend otp. please try again later',
    );
  }
  const jwtPayload = {
    email: user?.email,
    id: user?._id,
  };
  const token = jwt.sign(jwtPayload, config.access_token as Secret, {
    expiresIn: '2m',
  });
  await sendEmail(
    user?.email,
    'Your One Time Otp',
    `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #4CAF50;">Your One Time OTP</h2>
    <div style="background-color: #f2f2f2; padding: 20px; border-radius: 5px;">
      <p style="font-size: 16px;">Your OTP Is: <strong>${otp}</strong></p>
      <p style="font-size: 14px; color: #666;">This OTP is valid until: ${expiresAt.toLocaleString()}</p>
    </div>
  </div>`,
  );
  return { token };
};

export const otpServices = {
  verifyOtp,
  resendOtp,
};
