const { app } = require('@azure/functions');

app.timer('timer', {
    schedule: '0 */5 * * * *',
    handler: (myTimer, context) => {
        context.log('Timer function processed request.', myTimer);
    }
});
