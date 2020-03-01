const yargs = require('yargs')
const chalk = require('chalk')
const notes = require('./notes.js')

// add command
yargs.command({
    command: "add",
    describe: "Adding a note to the list.",
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNotes(argv.title, argv.body);
    }
})

// remove command
yargs.command({
    command: "remove",
    describe: "Removing a note from the list.",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNotes(argv.title)
    }
})

// list command
yargs.command({
    command: "list",
    describe: "Listing all the note.",
    handler() {
        notes.listNotes()
    }
})

// read command
yargs.command({
    command: "read",
    describe: "Reading a note",
    builder: {
        title: {
            describe: 'Title of requested note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNotes(argv.title)
    }
})
yargs.parse()