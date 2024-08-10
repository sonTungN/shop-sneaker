function Validator(formOption) {
  function getParentMatchedSelector(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }

  function validate(inputElement, rule, errorElement) {
    let rules = selectorRules[rule.selector];
    let errorMessage;

    for (let i = 0; i < rules.length; i++) {
      switch (inputElement.type) {
        case "checkbox":
        case "radio":
          errorMessage = rules[i](
            formElement.querySelector(rule.selector + ":checked"),
          );
          break;

        default:
          errorMessage = rules[i](inputElement.value);
      }
      if (errorMessage) break;
    }

    if (errorMessage) {
      errorElement.innerHTML = errorMessage;
      getParentMatchedSelector(
        inputElement,
        formOption.formGroupSelectors,
      ).classList.add("invalid");
    } else {
      errorElement.innerHTML = "";
      getParentMatchedSelector(
        inputElement,
        formOption.formGroupSelectors,
      ).classList.remove("invalid");
    }

    return !errorMessage;
  }

  let selectorRules = {};

  let formElement = document.querySelector(formOption.form);
  if (formElement) {
    formElement.onsubmit = function (e) {
      // Prevent Submission when there is invalid
      e.preventDefault();

      let isFormValid = true;

      formOption.rules.forEach((rule) => {
        let inputElement = formElement.querySelector(rule.selector);
        let errorElement = getParentMatchedSelector(
          inputElement,
          formOption.formGroupSelectors,
        ).querySelector(formOption.errorSelector);

        let isValid = validate(inputElement, rule, errorElement);
        if (!isValid) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        if (typeof formOption.onSubmit === "function") {
          let validInputElement = formElement.querySelectorAll("[name]");
          let validInputValues = Array.from(validInputElement).reduce(function (
            output,
            currInput,
          ) {
            switch (currInput.type) {
              case "radio":
                output[currInput.name] = formElement.querySelector(
                  'input[name="' + currInput.name + '"]:checked',
                ).value;
                break;

              case "checkbox":
                if (currInput.matches(":checked")) {
                  output[currInput.name] = [];
                  return output;
                }

                if (!Array.isArray(output[currInput.name])) {
                  output[currInput.name] = [];
                }
                output[currInput.name].push(currInput.value);
                break;

              case "file":
                output[currInput.name] = currInput.files;
                break;

              default:
                output[currInput.name] = currInput.value;
            }
            return output;
          }, {});
          formOption.onSubmit(validInputValues);
        } else {
          formElement.submit();
        }
      }
    };

    formOption.rules.forEach(function (rule) {
      if (!Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector] = [rule.test];
      } else {
        selectorRules[rule.selector].push(rule.test);
      }

      let inputElements = formElement.querySelectorAll(rule.selector);
      Array.from(inputElements).forEach(function (inputElement) {
        let errorElement = getParentMatchedSelector(
          inputElement,
          formOption.formGroupSelectors,
        ).querySelector(formOption.errorSelector);

        inputElement.onblur = function () {
          validate(inputElement, rule, errorElement);
        };

        // Process when user prompts input
        inputElement.oninput = function () {
          errorElement.innerText = "";
          getParentMatchedSelector(
            inputElement,
            formOption.formGroupSelectors,
          ).classList.remove("invalid");
        };
      });
    });
  }
}

// General Rule:
// 1. Invalid --> Display message
// 2. Valid --> return undefined
Validator.isRequired = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      return value ? undefined : message || "Please fill in this input!";
    },
  };
};

Validator.isEmail = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      let pattern = /^\w+('-'?\w+)*@\w+('-'?\w+)*(\.\w{2,3})+$/;
      return pattern.test(value)
        ? undefined
        : message || "Please input an email!";
    },
  };
};

Validator.minLength = function (selector, min, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= min
        ? undefined
        : message || `Password must contain ${min} characters!`;
    },
  };
};

Validator.isConfirmed = function (selector, getConfirmedValue, message) {
  return {
    selector: selector,
    test: function (value) {
      return value === getConfirmedValue()
        ? undefined
        : message || "Value is un-identical!";
    },
  };
};
