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
`;

const renderBookFigure = (bookParam) => `
    <figure class="fig-book">
        <div class="fig-img">
            <img src="./img/books/${bookParam.image ?? 'default-book.png'}" alt="Book Image"/>
        </div>
        <figcaption>
            ${renderLabelValue('Name', bookParam.name ?? 'Unknown Book')}
            ${renderLabelValue('Author', bookParam.author ?? 'Unknown Author')}
            ${bookParam.description ? renderLabelValue('Description', bookParam.description, 50) : ''}
        </figcaption>
    </figure>
`;

// action, data...
const renderBookCategory = (bookType, data) => `
    <div class="book-category" data-category="${bookType}">
        <button onclick="onButtonClick('${bookType}', 1)" class="previous">
            &lt;
        </button>
        <button onclick="onButtonClick('${bookType}', -1)" class="next">
            &gt;
        </button>
        <h2>${bookType}</h2>
        <div class="flex-grid">
            ${data.map(book => `
                <div class="mr-2">
                    ${renderBookFigure(book)}
                </div>
            `).join('')}
        </div>
    </div>
`;

// int
// --> 1, 2, 3, 100, 200, -2, 0, -100
// float
// --> 1, 2, -100, 0, 1.2, 3.5, 2.5

const onButtonClick = (bookType, directionMultiplier) => {
  const element = document.querySelector(`.book-category[data-category="${bookType}"] div`);
  const bookWidth = document.querySelector('.fig-book').offsetWidth;

  const currentOffset = parseFloat(element.style.marginLeft !== '' ? element.style.marginLeft : 0);
  const newOffset = `${currentOffset + directionMultiplier * bookWidth}px`;

  element.style.marginLeft = newOffset;
  // -> Only allow positive
  // -> Total width of element - offset = what is on screen > window width
  // document.querySelector(`.book-category[data-category="action"] div`).offsetWidth
  // window.innerWidth
  console.log(newOffset);
};

const bookTypes = [
    'action',
    'adventure',
    'fantasy',
    'drama'
];

// Functions can access global
// Global cannot access inside functions


bookTypes.map((bookType) =>
    fetch(`./api/v1/books-${bookType}.json`)
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
