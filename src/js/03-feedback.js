import throttle from 'lodash.throttle';
const formRef = document.querySelector('.feedback-form');
const FEEDBACK_FORM = 'feedback-form-state';

const handleInput = event => {
  const { name, value } = event.target;
  const savedData = load(FEEDBACK_FORM) ?? {};
  savedData[name] = value;
  save(FEEDBACK_FORM, savedData);
};

function initPage() {
  const savedData = load(FEEDBACK_FORM);
  if (savedData) {
    Object.entries(savedData).forEach(([name, value]) => {
      formRef.elements[name].value = value;
    });
  }
}
const submitForm = event => {
  event.preventDefault();
  const savedData = load(FEEDBACK_FORM);
  console.log(savedData);
  localStorage.removeItem(FEEDBACK_FORM);
  formRef.reset();
};

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const eventTrorle = throttle(handleInput, 500);
formRef.addEventListener('input', eventTrorle);
formRef.addEventListener('submit', submitForm);
initPage();
