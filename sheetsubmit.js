window.onload=function(){
const scriptURL = 'https://script.google.com/macros/s/AKfycbx0vc2AY3nVNjAcjMnnb6SJoQG5SNtGXbwb9OAtuT5jjOEy3nxFJb3QJxrhHv_O_pNsHA/exec';

  const form = document.forms["sheet-submit"];

  console.log(form);
  form.addEventListener('submit', e => {
    console.log("submitting");
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => console.log('Success!', response))
      .catch(error => console.error('Error!', error.message));
  })};