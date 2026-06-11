let ValidateEmptyField = (fieldName, data) => {
  if (data === "") {
    return {
      error: `${fieldName} cannot be emtpy`,
    };
  }
  return null;
};

export let ValidateEmptyFieldTypes = (fieldName, value) => {
  let errorMsg = null;
  if (fieldName === "email") {
    errorMsg = ValidateEmptyField(fieldName, value);
    if (errorMsg != null) return errorMsg;
    if (value.includes("@")) {
      errorMsg = `${fieldName} is not valid`;
      return errorMsg;
    } else if (fieldName == "name") {
      errorMsg = ValidateEmptyField(fieldName, value);
      if (errorMsg != null) return errorMsg;
      // check for lenght name must be greater than 3
      if (value.length < 3) {
        errorMsg = ValidateEmptyField(fieldName, value);
        if (errorMsg != null) return errorMsg;
        if (isNaN(value)) {
          errorMsg = `${fieldName} must be number`;
          return errorMsg;
        }
      }
    }
    return;
  }
};
