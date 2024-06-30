import { Schema, model } from 'mongoose';
import { IUser, IUserModel } from './user.interface';
import { gender } from './user.constants';
import bcrypt from 'bcrypt';
// import ApiError from '../../../errors/api.error';
// import httpStatus from 'http-status';

const userSchema = new Schema<IUser>(
  {
    studentId: {
      type: String,
      unique: true,
      validate: {
        validator: async function (studentId: string) {
          const user = await User.findOne({ studentId });
          return !user;
        },
        message: 'student Id must be unique', // Custom error message
      },
    },
    role: {
      type: String,
      enum: ['admin', 'student'],
      default: 'student',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: async function (email: string) {
          const user = await User.findOne({ email });
          return !user; // Return true if user doesn't exist (i.e., email is unique)
        },
        message: 'Email address must be unique', // Custom error message
      },
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    gender: {
      type: String,
      enum: gender,
    },
    presentAddress: {
      type: {
        country: {
          type: String,
          required: true,
        },
        district: {
          type: String,
          required: true,
        },
        street: {
          type: String,
          required: true,
        },
      },
    },
    permanentAddress: {
      type: {
        country: {
          type: String,
          required: true,
        },
        district: {
          type: String,
          required: true,
        },
        street: {
          type: String,
          required: true,
        },
      },
    },
    education: {
      type: {
        educationLevel: {
          type: String,
          required: true,
        },
        degreeTitle: {
          type: String,
          required: true,
        },
        institute: {
          type: String,
          required: true,
        },
        startDate: {
          type: String,
          required: true,
        },
        endDate: { type: String },
        currentlyStudying: {
          type: Boolean,
          required: true,
        },
      },
    },
    skills: { type: String },
    experience: {
      type: {
        designation: {
          type: String,
          required: true,
        },
        company: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        startDate: {
          type: String,
          required: true,
        },
        endDate: { type: String },
        currentlyWorking: {
          type: Boolean,
          required: true,
        },
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
    userStatus: {
      type: String,
      enum: ['active', 'blocked', 'deleted'],
      default: 'active',
    },
    loggedInDevice: {
      type: String,
      default: null, // Initially no device is logged in
    },
    photoUrl: {
      type: String,
    },
    verification: {
      otp: {
        type: String,
        select: 0,
      },
      expiresAt: {
        type: Date,
        select: 0,
      },
      status: {
        type: Boolean,
        default: false,
        select: 0,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

// user password hashing
userSchema.pre<IUser>('save', async function (next) {
  if (this.password) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    } catch (error) {
      next(error as Error);
    }
  } else {
    next();
  }
});

// set '' after saving password
userSchema.post(
  'save',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function (error: Error, doc: any, next: (error?: Error) => void): void {
    doc.password = '';
    next();
  },
);
// filter out deleted documents
userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

userSchema.statics.isUserExist = async function (email: string) {
  return await User.findOne({ email: email }).select('+password');
};
userSchema.statics.IsUserExistById = async function (id: string) {
  return await User.findById(id).select('+password');
};
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<IUser, IUserModel>('User', userSchema) as IUserModel;
