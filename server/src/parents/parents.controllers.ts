import { Request, Response } from 'express'
import * as parentsService from '../parents/parents.services'

export const getAllParents = async (req: Request, res: Response): Promise<void> => {
  try {
    const parents = await parentsService.getAllParents()
    res.json(parents)
  } catch (err: any) {
    console.error(err) // Log para ver el error
    res.status(500).send({ error: 'Server Error', details: err.message })
  }
}

export const createParents = async (req: Request, res: Response): Promise<void> => {
  try {
    const isValid = parentsService.validateCreateParents(req.body)
    if (!isValid) res.status(400).send({ error: 'Invalid Body' })

    const { userId, relation } = req.body
    const parent = await parentsService.createParents({ user_id: userId, relation, createdAt: new Date(), updatedAt: new Date() })

    res.json(parent)
  } catch (err: any) {
    console.error(err) // Log para ver el error
    res.status(500).send({ error: 'Server Error', details: err.message })
  }
}

export const getParentsById = async (req: Request, res: Response): Promise<void> => {
  try {
    const parents = await parentsService.getParentsById(req.params.id)
    if (parents == null) res.status(404).send({ data: 'Parent not found' })

    res.json(parents)
  } catch (err: any) {
    console.error(err) // Log para ver el error
    res.status(500).send({ error: 'Server Error', details: err.message })
  }
}

export const updateParents = async (req: Request, res: Response): Promise<void> => {
  try {
    const isValid = parentsService.validateCreateParents(req.body)
    if (!isValid) res.status(400).send({ data: 'Invalid body' })

    const parents = await parentsService.updateParents(req.params.id, req.body)
    res.json(parents)
  } catch (err: any) {
    console.error(err) // Log para ver el error
    res.status(500).send({ error: 'Server Error', details: err.message })
  }
}

export const deleteParents = async (req: Request, res: Response): Promise<void> => {
  try {
    await parentsService.deleteParents(req.params.id)
    res.status(204).send()
  } catch (err: any) {
    console.error(err) // Log para ver el error
    res.status(500).send({ error: 'Server Error', details: err.message })
  }
}
