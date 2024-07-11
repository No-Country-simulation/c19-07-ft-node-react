import { UserRepository } from '../repositories/user.repository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class AuthService {
  constructor (private readonly userRepository: UserRepository) {}

  async login (email: string, password: string): Promise<{ token: string }> {
    const user = await this.userRepository.findByEmail(email)
    if (user == null) {
      throw new Error('Invalid credentials')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new Error('Invalid credentials')
    }

    if (process.env.JWT_SECRET != null) {
      const token = jwt.sign({ userId: user.user_id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' })
      return { token }
    } else {
      throw new Error('JWT secret is not defined')
    }
  }
}
