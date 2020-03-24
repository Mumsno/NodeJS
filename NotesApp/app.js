const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');


// Create Add Command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: { 
            describe: 'the note\'s title',
            demandOption: true,
            type: 'string'
        },
        body: { 
            describe: 'the note\'s body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.addNote(argv.title, argv.body)
});

// Create Remove Command
yargs.command({
    command: 'remove',
    describe: 'Remove an existing note',
    builder: {
        title: { 
            describe: 'the note\'s title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.removeNote(argv.title)
});

// Create List Command
yargs.command({
    command: 'list',
    describe: 'List notes',
    handler: () => notes.listNotes()
});

// Create List Command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: { 
            describe: 'the note\'s title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.readNote(argv.title)
});

yargs.parse()