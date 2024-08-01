const { app, input, output } = require('@azure/functions');

const cosmosBookmarksInput = input.cosmosDB({
    databaseName: "default-db",
    containerName: "Bookmarks",
    sqlQuery: 'select * from c',
    connection: 'az204cosmosdb64_DOCUMENTDB',
})

const cosmosBookmarkInput = input.cosmosDB({
    databaseName: "default-db",
    containerName: "Bookmarks",
    id: '{id}',
    partitionKey: '{id}',
    connection: 'az204cosmosdb64_DOCUMENTDB',
})

const cosmosBookmarksOutput = output.cosmosDB({
    databaseName: "default-db",
    containerName: "Bookmarks",
    connection: 'az204cosmosdb64_DOCUMENTDB'
})

app.http('getBookmarks', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: "bookmarks",
    extraInputs: [cosmosBookmarksInput],
    handler: async (request, context) => {

        const bookmarks = context.extraInputs.get(cosmosBookmarksInput);
        return { jsonBody: bookmarks };
    }
});


app.http('getBookmark', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'bookmarks/{id}',
    extraInputs: [cosmosBookmarkInput],
    handler: async (request, context) => {
        const bookmark = context.extraInputs.get(cosmosBookmarkInput);
        return { jsonBody: bookmark };
    }
});


app.http('createBookmark', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'bookmarks',
    extraInputs: [cosmosBookmarkInput],
    extraOutputs: [cosmosBookmarksOutput],
    handler: async (request, context) => {
        let bookmark = context.extraInputs.get(cosmosBookmarkInput);
        if(bookmark)
            return {status:422, body:"bookmark already exists"}

        const bookmarks = context.extraOutputs.get(cosmosBookmarksOutput);
        bookmark = await request.json();
        bookmarks.setValue(bookmark)
        context.log(bookmark);
        return { jsonBody: bookmark };
    }
})