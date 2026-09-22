import express from 'express'
import { connectDatabase } from './config/database.js'
import { Activity, Leaderboard, Team, User, Workout } from './models.js'

const app = express()
const port = Number(process.env.PORT || 8000)
const codespaceName = process.env.CODESPACE_NAME
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`

const resources = { users: User, teams: Team, activities: Activity, leaderboard: Leaderboard, workouts: Workout }

app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-backend', baseUrl })
})

app.get('/api/config', (_request, response) => {
  response.json({ apiBaseUrl: baseUrl })
})

for (const [resourceName, model] of Object.entries(resources)) {
  const resourcePath = `/api/${resourceName}`

  app.get(resourcePath, async (_request, response, next) => {
    try {
      response.json(await model.find().lean())
    } catch (error) {
      next(error)
    }
  })

  app.post(resourcePath, async (request, response, next) => {
    try {
      const item = await model.create(request.body)
      response.status(201).json(item)
    } catch (error) {
      next(error)
    }
  })
}

app.use((error: Error, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  response.status(400).json({ error: error.message })
})

app.use((_request, response) => {
  response.status(404).json({ error: 'Not found' })
})

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`OctoFit Tracker API listening on port ${port}`)
    })
  })
  .catch((error: Error) => {
    console.error('Unable to start API:', error.message)
    process.exit(1)
  })
