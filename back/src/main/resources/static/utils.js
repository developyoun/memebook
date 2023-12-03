const getElementById = (id) => {
  return document.getElementById(id);
}

const createElement = (type, innerText) => {
  const el = document.createElement(type);
  innerText && (el.innerText = innerText);
  return el;
}