const { app } = require('@azure/functions');

app.storageBlob('png-blob-trigger', {
    path: 'root/{name}.png',
    connection: 'AzureWebJobsStorage',
    handler: (blob, context) => {
        context.log(`.png file detected`);
    }
});
