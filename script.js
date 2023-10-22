document.addEventListener('DOMContentLoaded', function () {
  const display = document.getElementById('display');
  const buttons = document.querySelectorAll('button');

  function updateDisplay(text) {
    display.value += text;
  }

  function handleNumberClick(number) {
    updateDisplay(number);
  }

  function handleOperatorClick(operator) {
    updateDisplay(operator);
  }

  function handleCalculateClick() {
    try {
      let expression = display.value;

      // Replace '×' with '*' for multiplication
      expression = expression.replace(/×/g, '*');

      // Replace (a)(b) with (a*b)
      expression = expression.replace(/\((\d+)\)\((\d+)\)/g, '($1*$2)');

      // Replace (a)b with (a*b)
      expression = expression.replace(/\((\d+)\)(\d+)/g, '($1*$2)');
      
      // Replace (expression)(expression) with (expression*expression)
      expression = expression.replace(/\(([^)]+)\)\(([^)]+)\)/g, '($1*$2)');
      
      // Replace (expression)expression with (expression*expression)
      expression = expression.replace(/\(([^)]+)\)([^)]+)/g, '($1*$2)');

      const result = evaluateExpression(expression);
      display.value = result;
    } catch (error) {
      display.value = 'Error';
    }
  }

  function handleClearClick() {
    display.value = '';
  }

  function handleDeleteClick() {
    display.value = display.value.slice(0, -1);
  }

  function evaluateExpression(expression) {
    // Evaluate the expression using the eval function
    return eval(expression);
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      const action = button.getAttribute('data-action');
      if (action === 'append') {
        const text = button.textContent;
        handleNumberClick(text);
      } else if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
        const operator = button.textContent;
        handleOperatorClick(operator);
      } else if (action === 'calculate') {
        handleCalculateClick();
      } else if (action === 'clear') {
        handleClearClick();
      } else if (action === 'delete') {
        handleDeleteClick();
      } else if (action === 'open-parenthesis') {
        updateDisplay('(');
      } else if (action === 'close-parenthesis') {
        updateDisplay(')');
      }
    });
  });
});
