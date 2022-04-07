

// const someFunction = async () => {
//     for (var i = 0; i < 1000; i++) {
//         console.log('a');
//     }
// }
//
// // Pipe 2
// someFunction().then(() => {
//     console.log('done');
// });


// Pipe 3
// someFunction();


// Pipe 1
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

const renderPage = (data) => `
    <div class="flex-grid">
        ${data.map(book => `
            <div class="mr-2">
                ${renderBookFigure(book)}
            </div>
        `).join('')}
    </div>
`;

// Pipe 1
fetch('/api/v1/books.json') // Pipe 2
    .then(data => data.json()) // Pipe 2
    .then(data => {
        setTimeout(() => {
            document.body.innerHTML = renderPage(data);
        }, 1000);
    })
    .catch(error => { // Pipe 3
        document.body.innerHTML = 'An error occurred';
    })
;