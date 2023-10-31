/**
 * @param {Object} object - The input object to be cleaned.
 * @param {string[]} desiredFields - An array of field names to include in the cleaned object.
 */
exports.cleanObject = (object, desiredFields) => {
  return Object.assign({}, ...desiredFields.map(field => ([field] in object ? { [field]: object[field] } : {})));
};

exports.words = ['hangman', 'javascript', 'programming', 'developer', 'computer', 'giraffe', 'elephant', 'keyboard', 'coffee', 'pizza', 'internet', 'penguin', 'squirrel', 'chocolate', 'banana', 'pineapple', 'sunflower', 'moonlight', 'paradise', 'tiger', 'elephant', 'ocean', 'beach', 'mountain', 'language', 'cucumber', 'butterfly', 'dragon', 'firework', 'superhero', 'watermelon', 'cappuccino', 'rainbow', 'vampire', 'zombie', 'mermaid', 'butterfly', 'robot', 'spaceship', 'wizard', 'dinosaur', 'unicorn', 'library', 'carousel', 'jazz', 'piano', 'accordion'];
