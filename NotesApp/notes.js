const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return 'Your Notes';
}

const removeNote = (title) => {
    const notes = loadNotes();
    const newNotes = notes.filter((note) => note.title !== title);

    if (notes.length > newNotes.length)
    {
        console.log(chalk.green.inverse("Note Removed!"));
        saveNotes(newNotes);
    }
    else {
        console.log(chalk.red.inverse("Note wasn't found"));
        
    }
}

const listNotes = () => {
    const notes = loadNotes();
    notes.forEach(note => console.log(chalk.inverse(note.title)));
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);
    
    if (duplicateNote === undefined) {
        notes.push({
            title: title,
            body: body
        });
    
        saveNotes(notes);
        console.log(chalk.green.inverse("Note has been added"));
    }
    else {
        console.log(chalk.red.inverse("Duplicate note, not adding"));
    }
}

const loadNotes = () => {
    try {
        const dataJSON = fs.readFileSync("notes.json").toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return []
    }
}

const saveNotes = (notes) => {
    const notesJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', notesJSON);
}

const readNote = (title) => {
    const notes = loadNotes();
    const noteToRead = notes.find((note) => note.title === title);
    
    if (noteToRead === undefined) {
        console.log(chalk.inverse.red('Note was not found'));
        return;
    }

    console.log(chalk.inverse(noteToRead.body));

}

module.exports = {
    addNote: addNote,
    getNotes: getNotes,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}