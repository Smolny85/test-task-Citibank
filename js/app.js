document.addEventListener("DOMContentLoaded", function () {
  let expand = document.querySelectorAll(".post__title");
  for (let i = 0; i < expand.length; i++) {
    expand[i].addEventListener("click", function () {
      this.parentNode.classList.toggle("active");
    });
  }

  let clear = document.querySelectorAll(".clear");

  for (let i = 0; i < clear.length; i++) {
    clear[i].addEventListener("click", function () {
      this.previousElementSibling.value = "";
      this.previousElementSibling.classList.remove("_error");
      let input_error = this.parentElement.querySelector(".form__error");
      if (input_error) {
        this.parentElement.removeChild(input_error);
      }
    });
  }

  let popupLink = document.querySelectorAll("._popup-link");
  for (let i = 0; i < popupLink.length; i++) {
    popupLink[i].addEventListener("click", function (e) {
      document.querySelector(".popup_modal").classList.add("_active");
      return false;
    });
  }

  let popupClose = document.querySelectorAll("._popClose");
  for (let i = 0; i < popupClose.length; i++) {
    popupClose[i].addEventListener("click", function (e) {
      document.querySelector(".popup_modal").classList.remove("_active");
      return false;
    });
  }

  // form =======================

  let sendForme = document.querySelector("#send-form");
  sendForme.addEventListener("click", function () {
    let formMail = document.querySelector("._email");
    let formName = document.querySelector("._name");
    let formSelect = document.getElementById("form__select");
    let checkboxInput = document.querySelector(".checkbox__input");
    let error = false;

    if (incorrect_email(formMail)) {
      form_add_error(formMail);
      error = true;
    } else {
      form_remove_error(formMail);
    }
    if (incorrect_name(formName)) {
      form_add_error(formName);
      error = true;
    } else {
      form_remove_error(formName);
    }
    if (formSelect.value == 0) {
      form_add_error(formSelect);
      error = true;
    } else {
      form_remove_error(formSelect);
    }
    if (!checkboxInput.checked) {
      form_add_error(checkboxInput);
    } else {
      form_remove_error(checkboxInput);
    }
    if (!error) {
      document.getElementById("form").submit();
    }
    return false;
  });
});

//Функция теста email
function incorrect_email(input) {
  return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

//Функция теста name
function incorrect_name(input) {
  return !/^[A-Za-zА-Яа-яЁё\s\-]+$/.test(input.value);
}

function form_add_error(input) {
  input.classList.add("_error");
  input.parentElement.classList.add("_error");

  let input_error = input.parentElement.querySelector(".form__error");
  if (input_error) {
    input.parentElement.removeChild(input_error);
  }
  let input_error_text = input.getAttribute("data-error");
  if (input_error_text && input_error_text != "") {
    input.parentElement.insertAdjacentHTML(
      "beforeend",
      '<div class="form__error">' + input_error_text + "</div>"
    );
  }
}
function form_remove_error(input) {
  input.classList.remove("_error");
  input.parentElement.classList.remove("_error");

  let input_error = input.parentElement.querySelector(".form__error");
  if (input_error) {
    input.parentElement.removeChild(input_error);
  }
}
function form_clean(form) {
  let inputs = form.querySelectorAll("input,textarea");
  for (let index = 0; index < inputs.length; index++) {
    const el = inputs[index];
    el.parentElement.classList.remove("_focus");
    el.classList.remove("_focus");
    el.value = el.getAttribute("data-value");
  }
  let checkboxes = form.querySelectorAll(".checkbox__input");
  if (checkboxes.length > 0) {
    for (let index = 0; index < checkboxes.length; index++) {
      const checkbox = checkboxes[index];
      checkbox.checked = false;
    }
  }
  let selects = form.querySelectorAll("select");
  if (selects.length > 0) {
    for (let index = 0; index < selects.length; index++) {
      const select = selects[index];
      const select_default_value = select.getAttribute("data-default");
      select.value = select_default_value;
      select_item(select);
    }
  }
}
