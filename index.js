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
  shiftBooksRight(bookType, -1);
};
const onButtonNextClick = (bookType) => {
  shiftBooksRight(bookType, 1);
};


/*
Cares about moving the books to the left or right.
 */
const shiftBooksRight = (bookType, directionMultiplier) => {
  // The size of the category box on the screen.
  const elementSection = document.querySelector(`.book-category[data-category="${bookType}"]`);

  // The size of the row, and everything hiding off the edge.
  const elementRow = document.querySelector(`.book-category[data-category="${bookType}"] div`);

  // Multiply by -1, so that +1 = move to right, and -1 = move to left.
  const currentOffset = -1 * parseFloat(elementRow.style.marginLeft !== '' ? elementRow.style.marginLeft : 0);

  const bookWidth = document.querySelector('.fig-book').clientWidth;
  const viewWidth = elementSection.clientWidth;
  const rowWidth = elementRow.scrollWidth;

  const newOffset = getBookShiftOffset(rowWidth, viewWidth, currentOffset, directionMultiplier * bookShiftQuantity * bookWidth);
  elementRow.style.marginLeft = `${-1 * newOffset}px`;

  // ADD SHOW/HIDE BUTTON HERE
  // -------
  // Logic:
  // -------
  // If maxOffset === newOffset
  // If getBookShiftOffset(rowWidth, viewWidth, 0, 9999) === newOffset
  // -------
  // Style:
  // -------
  // buttonElement.style.visibility = hidden / visible
}

/*
Cares about doing the calculation and what the new offset is.
 */
const getBookShiftOffset = (rowWidth, viewWidth, currentOffset, offsetChange) => {
  const minOffset = 0;
  const maxOffset = rowWidth - viewWidth > 0 ? rowWidth - viewWidth : 0;
  const newOffset = `${currentOffset + offsetChange}`;

  console.log('Calculating book shift offset:', {rowWidth, viewWidth, currentOffset, maxOffset, minOffset});

  // If the scroll goes too far to the left, just make it the minimum offset.
  if (newOffset < minOffset) {
    return minOffset;
  }
  // If the scroll goes too far to the right, just make it the maximum offset.
  else if (newOffset > maxOffset) {
    return maxOffset;
  }
  // Otherwise, just return the offset calculated.
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