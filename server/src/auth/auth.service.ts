import { UserRepository } from './repositories/user.repository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AuthenticationError } from '../errors/authenticationError'
import HTTP_STATUS from '../constants/statusCodeServer.const'
export class AuthService {
  constructor (private readonly userRepository: UserRepository) {}

  async login (email: string, password: string): Promise<{ token: string }> {
    const user = await this.userRepository.findByEmail(email)
    if (user == null) {
      throw new AuthenticationError('Invalid credentials', HTTP_STATUS.UNAUTHORIZED, { email: 'is email not found' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new AuthenticationError('Invalid credentials', HTTP_STATUS.UNAUTHORIZED, { password: 'is password not valid' })
    }

    if (process.env.JWT_SECRET != null) {
      const token = jwt.sign({ userId: user.user_id, email: user.email, role: user.type_user }, process.env.JWT_SECRET, { expiresIn: '3h' })
      return { token }
    } else {
      throw new Error('JWT secret is not defined')
    }
  }
}
