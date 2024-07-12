// src/modules/students/controllers/student.controller.ts
import { Request, Response } from 'express'
import * as getAllUsersServices from './users.services'
import { string } from 'zod'
import { Users } from '@prisma/client'

export const getAllUsersControllers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllUsersServices.getAllUsersServices()
    res.json(users)
  } catch (err:any) {
    res.status(500).send('Server Error')
  }
}

export const createUsersControllers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, type_user } = req.body;

    // Crear el objeto de datos del usuario con las propiedades requeridas
    const userData: Omit<Users, 'user_id' | 'createdAt' | 'updatedAt'> = {
      name,
      email,
      password,
      type_user,
      state: 'ACTIVE'
    };

    const user = await getAllUsersServices.createUsersServices(userData);
    res.json(user);
  } catch (err: any) {
    res.status(500).send('Server Error')
  }
  
}

export const getUsersByIdControllers = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await getAllUsersServices.getUserByIdServices(String(req.params.id))
    if (user != null) {
      res.status(200).json(user)
    } else {
      res.status(404).send('Student not found')
    }
  } catch (err) {
    res.status(500).send('Server Error')
  }
}

export const updateUsersControllers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllUsersServices.updateUsersServices(String(req.params.id), req.body)
    res.status(200).json(users)
  } catch (err) {
    res.status(500).send('Server Error')
  }
}

export const deleteUsersControllers = async (req: Request, res: Response): Promise<void> => {
  try {
    await getAllUsersServices.deleteUsersServices(String(req.params.id))
    res.status(204).send("User deleted successfully")
  } catch (err) {
    res.status(500).send('Server Error')
  }
}
