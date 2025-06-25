// utils/fileManager.js
const fs = require('fs');
const path = require('path');

const usersFile = path.join(__dirname, '../data/users.txt');
const petsFile = path.join(__dirname, '../data/pets.txt');

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, '../data'))) {
    fs.mkdirSync(path.join(__dirname, '../data'));
}

// Create files if they don't exist
if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, '');
}

if (!fs.existsSync(petsFile)) {
    fs.writeFileSync(petsFile, '');
}

function getUsers() {
    const data = fs.readFileSync(usersFile, 'utf8');
    if (!data) return [];

    return data.split('\n')
        .filter(line => line.trim() !== '')
        .map(line => {
            const [username, password] = line.split(':');
            return { username, password };
        });
}

function addUser(username, password) {
    const users = getUsers();
    const userExists = users.some(user => user.username === username);

    if (userExists) {
        return false;
    }

    fs.appendFileSync(usersFile, `${username}:${password}\n`);
    return true;
}

function validateLogin(username, password) {
    const users = getUsers();
    return users.some(user => user.username === username && user.password === password);
}

function getPets() {
    const data = fs.readFileSync(petsFile, 'utf8');
    if (!data) return [];

    return data.split('\n')
        .filter(line => line.trim() !== '')
        .map(line => {
            const [id, username, type, breed, age, gender, ...rest] = line.split(':');
            return {
                id: parseInt(id),
                username,
                type,
                breed,
                age,
                gender,
                additionalInfo: rest.join(':') // Combine remaining fields
            };
        });
}

function addPet(username, petData) {
    const pets = getPets();
    const newId = pets.length > 0 ? Math.max(...pets.map(pet => pet.id)) + 1 : 1;

    const newPetEntry = `${newId}:${username}:${petData.type}:${petData.breed}:${petData.age}:${petData.gender}:${petData.friendlyWith || ''}:${petData.comments || ''}\n`;

    fs.appendFileSync(petsFile, newPetEntry);
    return newId;
}

function findPets(criteria) {
    const pets = getPets();
    return pets.filter(pet => {
        // Match pet type (required)
        if (criteria.type && pet.type !== criteria.type) return false;

        // Match optional criteria
        if (criteria.breed && criteria.breed !== '' && !pet.breed.includes(criteria.breed)) return false;
        if (criteria.age && criteria.age !== '' && !matchAge(pet.age, criteria.age)) return false;
        if (criteria.gender && criteria.gender !== 'any' && pet.gender !== criteria.gender) return false;

        // Additional criteria can be added here

        return true;
    });
}

function matchAge(petAge, ageCriteria) {
    // Implement age range matching logic
    // This depends on how you store age in your pet entries
    return true; // Placeholder
}

module.exports = {
    getUsers,
    addUser,
    validateLogin,
    getPets,
    addPet,
    findPets
};