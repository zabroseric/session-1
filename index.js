//--------------------------
// Project Variables
//--------------------------
const bookShiftQuantity = 3;


//--------------------------
// Functionality
//--------------------------
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
        <button onclick="onButtonPreviousClick('${bookType}')" class="previous">
            &lt;
        </button>
        <button onclick="onButtonNextClick('${bookType}')" class="next">
            &gt;
        </button>
        <h2>${bookType}</h2>
        <div class="flex-grid" id="row">
            ${data.map(book => `
                <div class="mr-2">
                    ${renderBookFigure(book)}
                </div>
            `).join('')}
        </div>
    </div>
`;

/*
How you made that interaction.
 */
const onButtonPreviousClick = (bookType) => {
  shiftBooksRight(bookType, 1);
};
const onButtonNextClick = (bookType) => {
  shiftBooksRight(bookType, -1);
};


/*
Cares about moving the books to the left or right.
 */
const shiftBooksRight = (bookType, directionMultiplier) => {
  const element = document.querySelector(`.book-category[data-category="${bookType}"] div`);
  const bookWidth = document.querySelector('.fig-book').offsetWidth;
  const currentOffset = parseFloat(element.style.marginLeft !== '' ? element.style.marginLeft : 0);

  const allChildren = element.querySelectorAll('.fig-book').length;
  const rowWidth = allChildren * bookWidth;

  const newOffset = getBookShiftOffset(rowWidth, bookWidth, currentOffset, directionMultiplier * bookShiftQuantity);
  element.style.marginLeft = `${newOffset}px`;
}

/*
Cares about doing the calculation and what the new offset is.
 */
const getBookShiftOffset = (rowWidth, bookWidth, currentOffset, numberOfBooks) => {
  console.log(`Running book shift with quantity ${numberOfBooks}`);
  if (numberOfBooks === 0) {
    return currentOffset;
  }

  const newOffset = `${currentOffset + numberOfBooks * bookWidth}`;
  const directionMultiplier = numberOfBooks > 0 ? 1 : -1;

  if (newOffset > 0 || rowWidth - (-1 * newOffset) < window.innerWidth - (bookShiftQuantity * bookWidth) / 2) {
    return getBookShiftOffset(rowWidth, bookWidth, currentOffset, numberOfBooks - directionMultiplier);
  }
  return newOffset;
}

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