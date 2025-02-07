const UserDto = require("../dtos/user.dto");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const tokenService = require("./token.service");
const mailService = require("./mail.service");
const BaseError = require("../errors/base.error");

class AuthService {
  async register(email, password) {
    const existUser = await userModel.findOne({ email });

    if (existUser) {
        throw BaseError.Badrequest(`User with email ${email} already exists`);
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({ email, password: hashPassword });
    const userDto = new UserDto(user);
    // email service
    await mailService.sendMail(email, `${process.env.API_URL}/auth/activation/${userDto.id}`);
    //jwt token
    const tokens = tokenService.generateToken({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { user: userDto, ...tokens};
  }

  async activation(userId) {
    const user = await userModel.findById(userId);
    if (!user) {
        throw BaseError.Badrequest('User is not defined');
    } 
    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await userModel.findOne({email});
    if (!user) {
      throw BaseError.Badrequest('User not found');
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      throw BaseError.Badrequest('Invalid password');  
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { user: userDto, ...tokens};
  }

  async logout(refreshToken) {
    try {
      return await tokenService.removeToken(refreshToken);
    } catch (error) {
      throw BaseError.Badrequest('Token not found');
    }
  }

  async refresh(refreshToken) {
     if (!refreshToken) {
       throw BaseError.UnauthorizedError('Bad authentication');
     }
     const userPayload = tokenService.validateRefreshToken(refreshToken);
     console.log(userPayload);
     const tokenDb = await tokenService.findToken(refreshToken);
     if (!tokenDb || !userPayload) {
       throw BaseError.UnauthorizedError("Bad authentication");
     }
     const user = await userModel.findById(userPayload.id);
     const userDto = new UserDto(user);
     const tokens = tokenService.generateToken({...userDto});
     await tokenService.saveToken(userDto.id, tokens.refreshToken);
     return {user: userDto, ...tokens};
  }

  async getUsers() {
    return await userModel.find();
  }
}
    
module.exports = new AuthService();

