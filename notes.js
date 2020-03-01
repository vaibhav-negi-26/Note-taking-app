const fs = require('fs')
const chalk = require('chalk')
// adding note functions
const addNotes = (title, body) => {
    const notes = loadNotes()
    const dublicateNotes = notes.find((note) => note.title === title)
    if (!dublicateNotes) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.bgGreen.black("New Note added!"));
    } else {
        console.log(chalk.bgRed("Note title is taken, please try something else."));
    }
}
const saveNotes = (notes) => {
    let dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON)
}
const loadNotes = () => {
    try {
        let dataBuffer = fs.readFileSync('notes.json')
        let dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

// remove note functions
const removeNotes = (title) => {
    const notes = loadNotes()
    const restNotes = notes.filter((note) => title !== note.title)
    if (JSON.stringify(notes) == JSON.stringify(restNotes)) {
        console.log(chalk.bgRed("No Note Found!"));
    } else {
        saveNotes(restNotes)
        console.log(chalk.bgGreen.black("Note Removed!"));
    }
}

// listing Notes function
const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse("Your notes are : "));
    notes.forEach(note => {
        console.log(chalk.magenta(note.title));
    });
}

// reading notes function
const readNotes = (title) => {
    const notes = loadNotes()
    const foundOne = notes.find((note) => note.title === title)
    if (foundOne) {
        console.log(chalk.inverse('Title : '+foundOne.title));
        console.log('Body : '+foundOne.body);
    } else {
        console.log(chalk.bgRed("No such title exists."));
    }
}
module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes : listNotes,
    readNotes: readNotes
}