# How to

This document is temporary and here to help some early birds when testing multicolumn-boards.

## create a local board

If you want to test the multi-column-board on your local environment, you can create an additional board by executing this command in the command-line (aka shell aka bash) of the backend (schulcloud-server):

```bash
npm run nest:start:console -- board create-boards
```

This will create the mongodb-collection `boardnodes` (if it does not exist yet) and add several instances of board-nodes that form a tree of nodes that represents the board as a whole.

Hint: You can see the id of the column-node in the generated output.

## get an(y) id of a local board

 1. open your database-gui-tool of choice (e.g. **MongoDB Compass**)
 2. connect to your local database
 3. open `boardnodes` collection
 4. find a node of type `collumn-board` - e.g.

    ```json
    {
    "_id": {
        "$oid": "64061baf6ef8e4a9ca38b9c8"
    },
    "createdAt": {
        "$date": "2023-04-12T10:41:04.077Z"
    },
    "updatedAt": {
        "$date": "2023-04-12T10:41:04.090Z"
    },
    "path": ",",
    "level": 0,
    "position": 0,
    "type": "column-board",
    "name": "board #1",
    "title": "Donnerstag"
    }
    ```

 5. copy the value of "_id" - e.g. `64061baf6ef8e4a9ca38b9c8`

## open the board in your browser

 1. Login into your local schulcloud-environment
 2. Enter a url like that: `http://localhost:4000/rooms/{{ boardid }}/board`
 3. Replace `{{ boardid }}` with your actual boardid (see section *get an id of a local board* above)
 4. Put this new url into your browser and hit enter
