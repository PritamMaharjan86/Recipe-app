import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Recipe App API Documentations',
            description: 'API Documentations of Recipe App',
            version: '1.0.0',
        },
    },
    // looks for configuration in specified directories
    apis: ['./routes/*.js'],
}

const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs(app, port) {
    // Swagger Page
    app.use('/api-docs/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    // Documentation in JSON format
    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })
}

export default swaggerDocs