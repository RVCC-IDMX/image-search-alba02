const form = document.querySelector('.search-form');
const container = document.querySelector('.container');
const template = document.getElementById('template');


form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const response = await fetch('/.netlify/functions/unsplash-search', {
    method: 'POST',
    body: JSON.stringify({
      query: formData.get('query'),
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));







  /*
  some sample code
    const dataObj = response.results[0];
    const postImg = clone.querySelector('.post__img');
    postImg.src = dataObj.urls.small;
    postImg.alt = dataObj.alt_description;
  */

  /*
    Loop through the results[] array. For each result, create a clone of the
    template and append it to the DOM element with the .container class.
  */

  response.results.forEach((element)=>{

    let clone = template.content.cloneNode(true);

    const dataObj = response.results[0];
    const postImg = clone.querySelector('.post__img');
    postImg.src = dataObj.urls.small;
    postImg.alt = dataObj.alt_description;

  /*
    Add an attribution statement below the image using the
    postUser element and the photographer's name from dataObj
   */
   const user = clone.querySelector('.post__user'); ;
   user.innerText = element.user.name;



 /*
    Check the description of the post. If it's bot bull and less than 100 characters,
    add the description from dataObj to the post. If it's more than 100 characters,
    add the first 100 characters of the description from dataObj to the post followed by
    an ellipsis (...)
  */
     const postDesc = clone.querySelector('.post__desc');
    let description = dataObj.description;

    if(description !== null && description.length>100){
      description = description.substring(0,97) +'...'
      description.innerText = description;
    }




container.appendChild(clone)
  })
});
