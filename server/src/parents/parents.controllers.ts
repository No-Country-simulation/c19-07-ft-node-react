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
    const { relation } = req.body
    const parents = await parentsService.createParents({ relation })
    res.json(parents)
  } catch (err: any) {
    console.error(err) // Log para ver el error
    res.status(500).send({ error: 'Server Error', details: err.message })
  }
}

export const getParentsById = async (req: Request, res: Response): Promise<void> => {
  try {
    const parents = await parentsService.getParentsById(req.params.id)
    if (parents != null) {
      res.json(parents)
    } else {
      res.status(404).send('parents not found')
    }
  } catch (err: any) {
    console.error(err) // Log para ver el error
    res.status(500).send({ error: 'Server Error', details: err.message })
  }
}

export const updateParents = async (req: Request, res: Response): Promise<void> => {
  try {
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
