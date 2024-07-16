const { app, input } = require('@azure/functions');

const cosmosInput = input.cosmosDB({
    databaseName: "default-db",
    containerName: "Bookmarks",
    id: '{Query.id}',
    partitionKey: '{Query.id}',
    connection: 'az204cosmosdb64_DOCUMENTDB',
})

app.http('bookmarks', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    extraInputs: [cosmosInput],
    handler: async (request, context) => {

        const bookmark = context.extraInputs.get(cosmosInput);
        return { jsonBody: bookmark };
    }
});
