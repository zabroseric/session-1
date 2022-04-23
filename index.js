

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

//
//
//


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

const renderBookCategory = (category, data) => `
    <div class="flex-grid">
        <h2>${category}</h2>
        ${data.map(book => `
            <div class="mr-2">
                ${renderBookFigure(book)}
            </div>
        `).join('')}
    </div>
`;

const bookTypes = [
  'action',
  'adventure',
  'fantasy',
];

bookTypes.map((bookType) =>
  fetch(`/api/v1/books-${bookType}.json`)
    .then(data => data.json())
    .then(data => {
      setTimeout(() => {
        document.body.innerHTML += renderBookCategory(bookType, data);
      }, 100);
    })
    .catch(error => {
      console.error(error);
      document.body.innerHTML += `An error occurred with the book type ${bookType}<br/>`;
    })
    .finally(() => {
      document.body.innerHTML = document.body.innerHTML.replace('Loading...', '');
    })
);