## Questions

- 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
- 2. How do you create and insert a new element into the DOM?
- 3. What is Event Bubbling? And how does it work?
- 4. What is Event Delegation in JavaScript? Why is it useful?
- 5. What is the difference between preventDefault() and stopPropagation() methods?

## Answers

### 1. The Differences between getElementById, getElementsByClassName, and querySelector / querySelectorAll are

#### getElementById(id):

- Selects HTML element by it's ID
- Return just only a sigle element
- Return null if not found

#### getElementsByClassName(className):

- Selects HTML elements by there class name
- Returns an HTML Collection

#### querySelector(selector):

- Selects HTML element by a valid CSS selector like - (.className), (#id),
- Selects the first matches element

#### querySelectorAll(seletor):

- Selects HTML elements by there CSS selector like - (.className), (#id),
- Selects All matches elements

#### I have create and insert a new element in sevaral way like:

- For create a new element - document.createElement(tagName) or using Template literals
- For inster a element - element.appendChild(chlidName) or element.append(chlidName) or using Template literals

#### Event Bubbling:

- Event bubbling is a JavaScript tecknique where an event triggerd on a chlid element it propagates upward throgh its ancestor elements in the DOM tree like- (child-parent-body-document). It propagates until it reaches document and its JavaScript default mechanism.
