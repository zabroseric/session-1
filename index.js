const booksAction = [
    {
        name: 'Action Book 1',
        author: 'Some Author 1',
        description: '123 long text dfawdfaw awdawpd9awf9awnf faw joawfuiawdfawfinaf n n fonawfna da dadaw a dad awda da dawoinfaow inawdfawinwaifawf nfwao',
        image: 'action-book-1.jpg',
    },
    {
        name: 'Action Book 2',
        description: '123 long text dfawdfaw awdaw',
    },
];

const booksAdventure = [
    {
        name: 'Adventure Book 1',
        author: 'Some Author 1',
        image: 'default-book.png',
    },
    {
        name: 'Adventure  Book 2',
        author: 'Some Author 2',
        image: 'default-book.png',
    },
];

const renderLabelValue = (label, value, maxLength) => `
    <div>
        <span class="label">${label}</span>
        <span class="label-text">${
            maxLength && value.length - 1 > maxLength ?
            value.substring(0, maxLength - 3) + '...'
            : value
        }
        </span>
    </div>
`

// maxlength = 10
// text < 10 = text
// text > 10 = text.substring + ...


// renderLabelValue();
// renderLabelValue(undefined, undefined, undefined);

// URL: http://localhost/page-1
// SRC: img/books/default-book.png
// Image: http://localhost/page-1/img/books/default-book.png

// SRC: /img/books/default-book.png
// Image: http://localhost/img/books/default-book.png

// const a = undefined ?? 'abc'
// // abc
//
// const b = 'a' ?? 'abc';
// // a

// if ( a && b ) ---

// const a = somevar ? 'c' : 'd';

const renderBookFigure = (bookParam) => `
    <figure class="fig-book">
        <div class="fig-img">
            <img src="/img/books/${bookParam.image ?? 'default-book.png'}" alt="Book Image"/>
        </div>
        <figcaption>
            ${renderLabelValue('Name', bookParam.name ?? 'Unknown Book')}
            ${renderLabelValue('Author', bookParam.author ?? 'Unknown Author')}
            ${bookParam.description ? renderLabelValue('Description', bookParam.description, 50) : ''}
        </figcaption>
    </figure>
`;

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

document.body.innerHTML = `
    <div class="flex-grid">
        ${booksAction.map(book => `
            <div class="mr-2">
                ${renderBookFigure(book)}
            </div>
        `).join('')}
    </div>
`;