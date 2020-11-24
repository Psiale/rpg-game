const saveItem = (string, object) => {
  localStorage.setItem(string, JSON.stringify(object));
};

const retrieveItem = (string) => JSON.parse(localStorage.getItem(string));

const obliterateItem = string => localStorage.removeItem(string);

export { saveItem, retrieveItem, obliterateItem };