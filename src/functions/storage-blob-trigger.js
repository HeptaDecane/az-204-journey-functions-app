const { app } = require('@azure/functions');

app.storageBlob('storage-blob-trigger', {
    path: 'root/{name}',
    connection: 'AzureWebJobsStorage',
    handler: (blob, context) => {
        
        context.log(context.triggerMetadata)
        context.log(`Storage blob function processed ${blob.length} bytes`);
        
    }
});
