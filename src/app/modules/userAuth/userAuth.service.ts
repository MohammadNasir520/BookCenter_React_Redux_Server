import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { ILoginUser } from './UserAuth.interface';
import { jwtHelpers } from '../../helpers/jwtHelpers';

const createUser = async (userData: IUser): Promise<Partial<IUser>> => {
  const isExist = await User.findOne({ email: userData.email });

  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'user already exist');
  }
  if (userData.password.length < 6) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'password should be at least 6 character'
    );
  }
  const createUser = await User.create(userData);
  // eslint-disable-next-line no-unused-vars
  const { password, ...others } = createUser.toObject();
  return others;
};

const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;
  const isUserExist = await User.findOne(
    { email },
    { email: 1, password: 1, role: 1 }
  ).lean();
  console.log(isUserExist);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const isPassWordMatched = await bcrypt.compare(
    password,
    isUserExist.password
  );

  if (!isPassWordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'invalid password');
  }

  // creating accessToken
  const { _id, role } = isUserExist;

  const accessToken = jwt.sign({ _id, role }, config.jwt.secret as Secret, {
    expiresIn: config.jwt.expires_in as string,
  });
  const refreshToken = jwt.sign(
    { _id, role },
    config.jwt.refresh_secret as Secret,
    { expiresIn: config.jwt.refresh_expires_in as string }
  );
  const userData = await User.findOne({ email: email });
  console.log(userData);
  return {
    accessToken,
    refreshToken,
    userData,
  };
};

const refreshToken = async (token: string) => {
  let verifyToken = null;

  try {
    verifyToken = await jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'invalid token');
  }

  const { _id, role } = verifyToken;

  const isUserExist = await User.isUserExist(_id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.FORBIDDEN, 'user does not exist');
  }

  const accessToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return { accessToken };
};

export const UserAuthService = {
  createUser,
  loginUser,
  refreshToken,
};
