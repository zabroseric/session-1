const booksAction = [
    {
        name: 'Action Book 1',
        author: 'Some Author 1',
    },
    {
        name: 'Action Book 2',
        author: 'Some Author 2',
    },
];

const booksAdventure = [
    {
        name: 'Adventure Book 1',
        author: 'Some Author 1',
    },
    {
        name: 'Adventure  Book 2',
        author: 'Some Author 2',
    },
];


function renderTable(bookParam) {
    if (bookParam.length === 0) {
        console.error('Books has an unexpected size of 0');
        return 'An error occurred, please contact support';
    }

    // Render the html table body tag
    let htmlBody = '';
    for (let i = 0; i < bookParam.length; i++) {
        const book = bookParam[i];
        const bookArray = Object.values(book);

        htmlBody += '<tr>';
        for (let j = 0; j < bookArray.length; j++) {
            htmlBody += `<td>${bookArray[j]}</td>`;
        }
        htmlBody += '</tr>';
    }

    // Render the html table head tag
    let htmlThead = '';

    const book = bookParam[0];
    const bookArray = Object.keys(book);

    htmlThead += '<tr>';
    for (let j = 0; j < bookArray.length; j++) {
        htmlThead += `<th>${bookArray[j]}</th>`;
    }
    htmlThead += '</tr>';

    return `<table class="table-book"><thead>${htmlThead}</thead><tbody>${htmlBody}</tbody></table>`;
}

document.body.innerHTML = `<div class="d-inline mr-2">${renderTable(booksAction)}</div><div class="d-inline">${renderTable(booksAdventure)}</div>`;