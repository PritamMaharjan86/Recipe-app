import pino from 'pino';

const logger = pino({

    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        },
        level: process.env.LOG_LEVEL || 'info',
        base: {
            pid: true
        },
        timestamp: pino.stdTimeFunctions.isoTime,
    }
});

export default logger;
