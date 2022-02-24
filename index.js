const books = [
    {
        name: 'Book 1',
        author: 'Some Author 1',
    },
    {
        name: 'Book 2',
        author: 'Some Author 2',
    },
];

let htmlBody = '';
for ( let i = 0; i < books.length; i++ ) {
    const book = books[i];
    const bookArray = Object.values(book);

    for ( let j = 0; j < bookArray.length; j++ ) {
        htmlBody += `<tr><td>${bookArray[j]}</td></tr>`;
    }
}
document.body.innerHTML = `<table>${htmlBody}</table>`;