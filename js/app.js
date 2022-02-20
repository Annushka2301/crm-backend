(() => {

  async function createСlientsApp() {
    const body = document.querySelector('body');
    const main = document.createElement('main');
    main.classList.add('main', 'container')
    body.append(main);

    const addClientHandlers = {
      async onSave(client, element) {
        fetch ('http://localhost:3000/api/clients', {
          method: 'POST',
          body: JSON.stringify(client),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        createClientsListWrap();
        element.remove();
        const response = await fetch(`http://localhost:3000/api/clients`);
        const clientsItemList = await response.json();
        const newClient = clientsItemList[clientsItemList.length - 1];
        createClientElement(newClient);
      },
      onClose(element) {
        element.remove();
      },
      onDelete(client, item, element) {
        element.remove();
        item.remove();
        fetch(`http://localhost:3000/api/clients/${client.id}`, {
          method: 'DELETE',
        });
      },
    };

    const handlers = {
      onSave(client, element, id) {
        fetch(`http://localhost:3000/api/clients/${id}`, {
          method: 'PATCH',
          body: JSON.stringify(client),
          headers: {
            'Content-Type': 'application/json',
          }
        });
        createClientsListWrap();
        element.remove();
      },
      onDelete(client, item, element) {
        item.remove();
        element.remove();
        fetch(`http://localhost:3000/api/clients/${client.id}`, {
          method: 'DELETE',
        });
      },
      onClose(element) {
        element.remove();
      },
    };

    const response = await fetch(`http://localhost:3000/api/clients`);
    const clientsItemList = await response.json();

    window.addEventListener('load', function() {
      let hash = window.location.hash.slice(1);
      let clients = document.querySelectorAll('.id');
      for (let i = 0; i < clientsItemList.length; i++) {
        if (hash === clientsItemList[i].id) {
          createChangeModal(clientsItemList[i], clients[i].parentElement, handlers);
        };
      };
    });

    function completeClientsList (array) {
      array.forEach(client => {
        const clientsItemElement = createClientElement(client, addClientHandlers);
        clientsList.append(clientsItemElement);
      });
      const spinner = document.querySelector('.spinner');
        spinner.classList.add('hidden');
    };

    function createHeader() {
      const appHeader = document.createElement('header');
      const headerForm = document.createElement('form');
      const headerLogoLink = document.createElement('a');
      const headerLogoImg = document.createElement('img');
      const headerSearch = document.createElement('input');

      appHeader.classList.add('header');
      headerForm.classList.add('header__form', 'container');
      headerForm.setAttribute('action', '/')
      headerLogoLink.classList.add('header__logo');
      headerLogoImg.setAttribute('src', 'img/logo.svg');
      headerLogoImg.classList.add('header__logo-img')
      headerLogoImg.setAttribute('alt', 'logo');
      headerSearch.classList.add('header__search');
      headerSearch.setAttribute('type', 'search');
      headerSearch.placeholder = 'Введите запрос';

      body.prepend(appHeader);
      appHeader.append(headerForm);
      headerForm.append(headerLogoLink);
      headerLogoLink.append(headerLogoImg);
      headerForm.append(headerSearch);

      return headerSearch;
    };

    function loadingSpiner () {
      const spinerSvg = document.createElement('div');

      spinerSvg.classList.add('spinner');
      spinerSvg.innerHTML = '<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.00025 40.0005C4.00025 59.8825 20.1182 76.0005 40.0002 76.0005C59.8822 76.0005 76.0002 59.8825 76.0002 40.0005C76.0002 20.1185 59.8823 4.00049 40.0003 4.00049C35.3513 4.00048 30.9082 4.88148 26.8282 6.48648" stroke="#9873FF" stroke-width="8" stroke-miterlimit="10" stroke-linecap="round"/></svg>';

      return spinerSvg;
    };

    function createAppTitle() {
      const appTitle = document.createElement('h2');

      appTitle.classList.add('main__header')
      appTitle.textContent = 'Клиенты';

      main.append(appTitle);

      return appTitle;
    };

    function createAppFilters() {
      const filters = document.createElement('ul');
      const filterIDWrap = document.createElement('li');
      const filterFioWrap = document.createElement('li');
      const filterDateCreateWrap = document.createElement('li');
      const filterDateChangeWrap = document.createElement('li');
      const cont = document.createElement('li');
      const act = document.createElement('li');
      const filterID = document.createElement('button');
      const filterFio = document.createElement('button');
      const filterDateCreate = document.createElement('button');
      const filterDateChange = document.createElement('button');

      filters.classList.add('main__filters');
      filterID.classList.add('main__filter', 'main__id');
      filterFio.classList.add('main__filter', 'main__fio', 'filter-fio');
      filterDateCreate.classList.add('main__filter', 'main__date-create');
      filterDateChange.classList.add('main__filter', 'main__date-change');
      cont.classList.add('main__cont');
      cont.textContent = 'Контакты';
      act.classList.add('main__action');
      act.textContent = 'Действия';
      filterID.innerHTML = 'ID<svg class="main__arrow main__arrow-id" width="12" height="12" viewbox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6L9.295 5.295L6.5 8.085L6.5 2H5.5L5.5 8.085L2.71 5.29L2 6L6 10L10 6Z" fill="#9873FF"/></svg>';
      filterFio.innerHTML = 'Фамилия Имя Отчество<svg class="main__arrow main__arrow-fio" width="12" height="12" viewbox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6L9.295 5.295L6.5 8.085L6.5 2H5.5L5.5 8.085L2.71 5.29L2 6L6 10L10 6Z" fill="#9873FF"/></svg><span class="main__fio-a">А-Я</span>';
      filterDateCreate.innerHTML = 'Дата и время создания<svg class="main__arrow main__arrow-create" width="12" height="12" viewbox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6L9.295 5.295L6.5 8.085L6.5 2H5.5L5.5 8.085L2.71 5.29L2 6L6 10L10 6Z" fill="#9873FF"/></svg>';
      filterDateChange.innerHTML = 'Последние изменения<svg class="main__arrow main__arrow-changes" width="12" height="12" viewbox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6L9.295 5.295L6.5 8.085L6.5 2H5.5L5.5 8.085L2.71 5.29L2 6L6 10L10 6Z" fill="#9873FF"/></svg>';

      main.append(filters);
      filters.append(filterIDWrap);
      filters.append(filterFioWrap);
      filters.append(filterDateCreateWrap);
      filters.append(filterDateChangeWrap);
      filters.append(cont);
      filters.append(act);
      filterIDWrap.append(filterID);
      filterFioWrap.append(filterFio);
      filterDateCreateWrap.append(filterDateCreate);
      filterDateChangeWrap.append(filterDateChange);

      return {filters,
        filterID,
        filterFio,
        filterDateCreate,
        filterDateChange,
        cont,
        act
      };
    };

    function addCont (button, list, {onClose}, type, value) {
      if (type == undefined) id = false;
      if (value == undefined) id = false;

      button.classList.add('pd-25');
      list.classList.add('main__conts-p');

      const contItemWrap = document.createElement('div');
      const contSelect = document.createElement('div');
      const contHeader = document.createElement('div');
      const contTypeCurrent = document.createElement('span');
      const contArrow = document.createElement('span');
      const contTypes = document.createElement('div');
      const contTypeTel = document.createElement('div');
      const contTypeFb = document.createElement('div');
      const contTypeMail = document.createElement('div');
      const contTypeVk = document.createElement('div');
      const contTypeElse = document.createElement('div');
      const contInf = document.createElement('input');
      const contCancel = document.createElement('button');
      const contTypeElseValue = document.createElement('input');

      contSelect.classList.add('cont-select')
      contItemWrap.classList.add('main__contWrap');
      contHeader.classList.add('cont-header');
      if (type) {
        contTypeCurrent.textContent = type;
      } else {
        contTypeCurrent.textContent = 'Телефон';
        contInf.setAttribute('type', 'tel')
      };
      contTypeCurrent.classList.add('cont-current');
      contArrow.classList.add('cont-arrow');
      contArrow.innerHTML = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_121_1693)"><path d="M1.495 3.69003C1.25 3.93503 1.25 4.33003 1.495 4.57503L5.65 8.73003C5.845 8.92503 6.16 8.92503 6.355 8.73003L10.51 4.57503C10.755 4.33003 10.755 3.93503 10.51 3.69003C10.265 3.44503 9.87 3.44503 9.625 3.69003L6 7.31003L2.375 3.68503C2.135 3.44503 1.735 3.44503 1.495 3.69003Z" fill="#9873FF"/></g><defs><clipPath id="clip0_121_1693"><rect width="12" height="12" fill="white" transform="translate(0 12) rotate(-90)"/></clipPath></defs></svg>';
      contArrow.style = 'height: 12px';
      contTypes.classList.add('main__contTypes', 'hidden');
      contTypeTel.classList.add('main__contType');
      contTypeTel.textContent = 'Телефон';
      contTypeElse.classList.add('main__contType');
      contTypeElse.textContent = 'Другое';
      contTypeFb.classList.add('main__contType');
      contTypeFb.textContent = 'Facebook';
      contTypeMail.classList.add('main__contType');
      contTypeMail.textContent = 'Email';
      contTypeVk.classList.add('main__contType');
      contTypeVk.textContent = 'Vk';
      contInf.classList.add('main__contInf', 'input');
      contInf.placeholder = 'Введите данные контакта';
      if (value) {
        contInf.value = value;
        contInf.classList.add('right-border');
        contCancel.style = 'display: block';
      };
      contCancel.classList.add('main__contCancel', 'closeCont');
      contCancel.innerHTML = '<svg class="closeCont" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="closeCont" d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="#B0B0B0"/></svg>';
      contTypeElseValue.classList.add('cont-current', 'cont-type-input', 'input');

      contItemWrap.append(contSelect);
      contSelect.append(contHeader);
      contHeader.append(contTypeCurrent);
      contHeader.append(contArrow);
      contSelect.append(contTypes);
      contTypes.append(contTypeTel);
      contTypes.append(contTypeFb);
      contTypes.append(contTypeMail);
      contTypes.append(contTypeVk);
      contTypes.append(contTypeElse);
      contItemWrap.append(contInf);
      contItemWrap.append(contCancel);
      list.append(contItemWrap);

      contHeader.addEventListener('click', selectToggle);

      function selectToggle () {
        contTypes.classList.toggle('hidden');
        contArrow.classList.toggle('arrow-rotate');
      };

      let selectItem = document.querySelectorAll('.main__contType');
      let selects = document.querySelectorAll('.main__contTypes');

      if (selects.length === 10) {
        button.classList.add('hidden');
      };

      selectItem.forEach(item => {
        item.addEventListener('click', function () {
          selectChoose(item, contInf);
          contArrow.classList.remove('arrow-rotate');
        });
      });

      function selectChoose (item, input) {
        let text = item.innerText;
        let currentText = contSelect.querySelector('.cont-current');

        if (text === 'Другое') {
          contTypeCurrent.remove();
          contHeader.prepend(contTypeElseValue);
          currentText = contTypeElseValue.value;
          input.removeAttribute('type');
          contTypeElseValue.focus();
        } else {
          currentText.innerText = text;
        };

        if (text !== 'Телефон') {
          input.removeAttribute('type');
        }
        contTypes.classList.add('hidden');
      };

      contInf.addEventListener('input', function(){
        if(contInf.value==="") {
          contCancel.style.display="none";
          contInf.classList.remove('right-border');
        } else {
          contCancel.style.display="block";
          contInf.classList.add('right-border');
        };
      });

      contCancel.addEventListener('click', function(e) {
        e.preventDefault();
        onClose(contItemWrap);

        let contForms = document.querySelectorAll('.main__contWrap');
        if (contForms.length < 10) {
          button.classList.remove('hidden');
          list.classList.add('main__conts-p')
        };

        if (contForms.length === 0) {
          button.classList.remove('pd-25');
          list.classList.remove('main__conts-p');
        };

      });
    };

    function saveClient (name, surname, lastName, save, formWrap, id) {
      if (id == undefined) id = false;
      let arrayCont = [];

      const contTypes = document.querySelectorAll('.cont-current');
      const contValues = document.querySelectorAll('.main__contInf');

      for (let i = 0; i < Math.min(contTypes.length, contValues.length); i++) {
        let contType = `${contTypes[i].innerText}` || `${contTypes[i].value}`;
        let contValue = `${contValues[i].value}`;
        arrayCont.push({
          type: contType,
          value: contValue,
        });
      };

      const data = {
        name: name.value.trim(),
        surname: surname.value.trim(),
        lastName: lastName.value.trim(),
        contacts: arrayCont,
      };

      save(data, formWrap, id);
    };

    function validation (inputSurname, inputName, inputs, error) {
      let inputsCheck = [];
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === '') {
          inputsCheck.push(inputs[i])
        };
      };
      if (inputSurname.value === '') {
        error.innerText = 'Ошибка: заполните фамилию';
        inputSurname.style = 'border-color: #F06A4D';
      } else if (inputName.value === ''){
        error.innerText = 'Ошибка: заполните имя';
        inputName.style = 'border-color: #F06A4D';
      } else if (inputsCheck.length > 0) {
        error.innerText = 'Ошибка: заполните контакты';
        inputsCheck.forEach(input => input.style = 'border: 1px solid #F06A4D');
      };
    };

    function createAddForm(client, { onClose, onSave }) {
      const formWrap = document.createElement('div');
      const form = document.createElement('form');
      const formTitle = document.createElement('h2');
      const cross = document.createElement('button');
      const inputName = document.createElement('input');
      const inputSurname = document.createElement('input');
      const inputLastName = document.createElement('input');
      const addContBtn = document.createElement('button');
      const error = document.createElement('p');
      const safeBtn = document.createElement('button');
      const cancel = document.createElement('button');
      const conts = document.createElement('div');

      formWrap.classList.add('main__add-wrap');
      form.classList.add('main__add-form');
      formTitle.classList.add('main__add-title');
      formTitle.textContent = 'Новый клиент';
      cross.classList.add('main__add-cross');
      cross.innerHTML = '<svg  width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.2333 1.73333L15.2666 0.766664L8.49991 7.53336L1.73324 0.766696L0.766576 1.73336L7.53324 8.50003L0.766603 15.2667L1.73327 16.2333L8.49991 9.46669L15.2666 16.2334L16.2332 15.2667L9.46657 8.50003L16.2333 1.73333Z" fill="#B0B0B0"/></svg>'
      inputSurname.classList.add('main__add-input', 'main__add-surname', 'input');
      inputName.classList.add('main__add-input', 'main__add-name', 'input');
      inputLastName.classList.add('main__add-input', 'main__add-lastname');
      inputSurname.placeholder = 'Фамилия*';
      inputName.placeholder = 'Имя*';
      inputLastName.placeholder = 'Отчество';
      addContBtn.classList.add('main__add-cont');
      addContBtn.classList.add('main__add-cont-img');
      addContBtn.innerHTML = 'Добавить контакт';
      error.classList.add('input-error');
      safeBtn.classList.add('main__add-save');
      safeBtn.setAttribute('type', 'submit');
      safeBtn.textContent = 'Сохранить';
      cancel.classList.add('main__add-cancel');
      cancel.textContent = 'Отмена';
      conts.classList.add('main__conts');

      formWrap.append(form);
      form.append(formTitle);
      form.append(cross);
      form.append(inputSurname);
      form.append(inputName);
      form.append(inputLastName);
      form.append(conts);
      form.append(addContBtn);
      form.append(error);
      form.append(safeBtn);
      form.append(cancel);

      addContBtn.addEventListener('click', function(e) {
        e.preventDefault();
        addCont(addContBtn, conts, handlers);
      });

      form.addEventListener('submit', async function(e) {
        e.preventDefault();

        let requiredInputs = form.querySelectorAll('.input');
        let allInputs = form.querySelectorAll('input');
        let inputsCont = conts.querySelectorAll('input');

        let requiredInputsCheck = [];

        for (let i = 0; i < requiredInputs.length; i++) {
          if (requiredInputs[i].value === '') {
            requiredInputsCheck.push(requiredInputs[i])
          };
        };

        if (requiredInputsCheck.length === 0) {
          saveClient(inputName, inputSurname, inputLastName, onSave, formWrap);
        } else {
          validation(inputSurname, inputName, inputsCont, error);
          allInputs.forEach(input => {
            input.addEventListener('input', function() {
              error.innerText = '';
              input.style = 'border-color: #C8C5D1';
            });
          });
        };
      });

      cross.addEventListener('click', function(e) {
        e.preventDefault();
        onClose(formWrap);
      });
      cancel.addEventListener('click', function(e) {
        e.preventDefault();
        onClose(formWrap);
      });

      formWrap.addEventListener('click', function(e) {
        if (!form.contains(e.target) && !e.target.classList.contains('closeCont')) onClose(formWrap);
      });

      return {
        formWrap,
        form,
        cross,
        inputName,
        inputSurname,
        inputLastName,
        addContBtn,
        safeBtn,
      };
    }

    const addBtn = document.createElement('button');

    function createAddBtn() {

      addBtn.classList.add('main__btn-add');
      addBtn.innerHTML = '<svg class="main__btn-img" width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 8C16.71 8 18.5 6.21 18.5 4C18.5 1.79 16.71 0 14.5 0C12.29 0 10.5 1.79 10.5 4C10.5 6.21 12.29 8 14.5 8ZM5.5 6V3H3.5V6H0.5V8H3.5V11H5.5V8H8.5V6H5.5ZM14.5 10C11.83 10 6.5 11.34 6.5 14V16H22.5V14C22.5 11.34 17.17 10 14.5 10Z" fill="#9873FF"/></svg>Добавить клиента'

      main.append(addBtn);

      return addBtn;
    };

    function createClientsListWrap () {
      const list = document.createElement('ul');
      list.classList.add('clients-list')

      return list;
    };

    function createDeleteModal (client, item, {onDelete, onClose}) {

      const formWrap = document.createElement('div');
      const form = document.createElement('form');
      const formTitle = document.createElement('h2');
      const cross = document.createElement('button');
      const formDescr = document.createElement('p');
      const deteleBtn = document.createElement('button');
      const cancel = document.createElement('button');

      formWrap.classList.add('main__add-wrap');
      form.classList.add('main__add-form');
      formTitle.classList.add('main__add-title');
      formTitle.setAttribute('align', 'center');
      formTitle.textContent = 'Удалить клиента';
      cross.classList.add('main__add-cross');
      cross.innerHTML = '<svg  width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.2333 1.73333L15.2666 0.766664L8.49991 7.53336L1.73324 0.766696L0.766576 1.73336L7.53324 8.50003L0.766603 15.2667L1.73327 16.2333L8.49991 9.46669L15.2666 16.2334L16.2332 15.2667L9.46657 8.50003L16.2333 1.73333Z" fill="#B0B0B0"/></svg>'
      formDescr.classList.add('delete-form-descr');
      formDescr.setAttribute('align', 'center');
      formDescr.textContent = 'Вы действительно хотите удалить данного клиента?';
      deteleBtn.classList.add('main__add-save');
      deteleBtn.textContent = 'Удалить';
      cancel.classList.add('main__add-cancel');
      cancel.textContent = 'Отмена';

      body.append(formWrap);
      formWrap.append(form);
      form.append(formTitle);
      form.append(cross);
      form.append(formDescr);
      form.append(deteleBtn);
      form.append(cancel);

      deteleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        onDelete(client, item, formWrap);
      });

      cross.addEventListener('click', function(e) {
        e.preventDefault();
        onClose(formWrap);
      });

      cancel.addEventListener('click', function(e) {
        e.preventDefault();
        onClose(formWrap);
      });

      formWrap.addEventListener('click', function(e) {
        if (!form.contains(e.target) && !e.target.classList.contains('closeCont')) onClose(formWrap);
      });
    };

    function createChangeModal (client, item, {onSave, onClose}) {

      if (item == undefined) item = false;

      const formWrap = document.createElement('div');
      const form = document.createElement('form');
      const titleWrap = document.createElement('div');
      const formTitle = document.createElement('h2');
      const id = document.createElement('span')
      const cross = document.createElement('button');
      const inputNameLabel = document.createElement('p');
      const inputName = document.createElement('input');
      const inputSurnameLabel = document.createElement('p');
      const inputSurname = document.createElement('input');
      const inputLastNameLabel = document.createElement('p');
      const inputLastName = document.createElement('input');
      const addContBtn = document.createElement('button');
      const error = document.createElement('p');
      const safeBtn = document.createElement('button');
      const deteleBtn = document.createElement('button');
      const conts = document.createElement('div');

      formWrap.classList.add('main__add-wrap');
      formWrap.setAttribute('data-modal', `${client.id}`)
      form.classList.add('main__add-form');
      titleWrap.classList.add('change-form-title-wrap');
      formTitle.classList.add('main__add-title', 'mb-0');
      formTitle.textContent = 'Изменить данные';
      id.classList.add('change-form-id')
      id.textContent = `ID:${client.id}`;
      cross.classList.add('main__add-cross');
      cross.innerHTML = '<svg  width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.2333 1.73333L15.2666 0.766664L8.49991 7.53336L1.73324 0.766696L0.766576 1.73336L7.53324 8.50003L0.766603 15.2667L1.73327 16.2333L8.49991 9.46669L15.2666 16.2334L16.2332 15.2667L9.46657 8.50003L16.2333 1.73333Z" fill="#B0B0B0"/></svg>'
      inputNameLabel.textContent = 'Имя*';
      inputSurnameLabel.textContent = 'Фамилия*';
      inputLastNameLabel.textContent = 'Отчество';
      inputNameLabel.classList.add('input-label');
      inputSurnameLabel.classList.add('input-label');
      inputLastNameLabel.classList.add('input-label');
      inputSurname.classList.add('main__add-input', 'main__add-surname');
      inputName.classList.add('main__add-input', 'main__add-name');
      inputLastName.classList.add('main__add-input', 'main__add-lastname');
      inputSurname.value = client.surname;
      inputName.value = client.name;
      inputLastName.value = client.lastName;
      addContBtn.classList.add('main__add-cont');
      addContBtn.innerHTML = 'Добавить контакт'
      error.classList.add('input-error');
      safeBtn.classList.add('main__add-save');
      safeBtn.setAttribute('type', 'submit');
      safeBtn.textContent = 'Сохранить';
      deteleBtn.classList.add('main__add-cancel');
      deteleBtn.textContent = 'Удалить клиента';
      conts.classList.add('main__conts');

      formWrap.append(form);
      titleWrap.append(formTitle)
      titleWrap.append(id);
      form.append(titleWrap);
      form.append(cross);
      form.append(inputSurnameLabel);
      form.append(inputSurname);
      form.append(inputNameLabel);
      form.append(inputName);
      form.append(inputLastNameLabel);
      form.append(inputLastName);
      form.append(conts);
      form.append(addContBtn);
      form.append(error);
      form.append(safeBtn);
      form.append(deteleBtn);
      body.append(formWrap);

      let clientConts = client.contacts;

      window.location.hash = `${client.id}`

      for (let i = 0; i < clientConts.length; i++) {
        addCont(addContBtn, conts, handlers, clientConts[i].type, clientConts[i].value);
      };

      addContBtn.addEventListener('click', function(e) {
        e.preventDefault();
        addCont(addContBtn, conts, handlers);
      });

      form.addEventListener('submit', function(e) {
        e.preventDefault();

        let requiredInputs = form.querySelectorAll('.input');
        let allInputs = form.querySelectorAll('input');

        let requiredInputsCheck = [];

        for (let i = 0; i < requiredInputs.length; i++) {
          if (requiredInputs[i].value === '') {
            requiredInputsCheck.push(requiredInputs[i])
          };
        };

        if (requiredInputsCheck.length === 0) {
          saveClient(inputName, inputSurname, inputLastName, onSave, formWrap, client.id);
          location.reload();
        } else {
          validation(inputSurname, inputName, requiredInputs, error);
          allInputs.forEach(input => {
            input.addEventListener('input', function() {
              error.innerText = '';
              input.style = 'border-color: #C8C5D1;';
            });
          });
        };
      });

      cross.addEventListener('click', async function(e) {
        e.preventDefault();
        history.pushState("", document.title, window.location.pathname);
        onClose(formWrap);
      });

      deteleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        createDeleteModal(client, item, handlers);
        history.pushState("", document.title, window.location.pathname);
        formWrap.remove();
      });

      formWrap.addEventListener('click', function(e) {
        if (!form.contains(e.target) && !e.target.classList.contains('closeCont')) onClose(formWrap);
        history.pushState("", document.title, window.location.pathname);
      });
    };

    function showConts (conts, contWrap) {
      conts.forEach(clientCont => {
        const cont = document.createElement('li');
        cont.classList.add('cont');

        if (clientCont.type === 'Facebook') {
          cont.innerHTML = `<span class="cont-value-wrap"><span class="cont-type">${clientCont.type}:</span><span class="cont-value">${clientCont.value}</span></span><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="1"><path d="M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z" fill="#9873FF"/></g></svg>`
          contWrap.append(cont);
        } else if (clientCont.type === 'Email') {
          cont.innerHTML = `<span class="cont-value-wrap"><span class="cont-type">${clientCont.type}:</span><span class="cont-value">${clientCont.value}</span></span><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="1" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z" fill="#9873FF"/></svg>`
          contWrap.append(cont);
        } else if (clientCont.type === 'Телефон') {
          cont.innerHTML = `<span class="cont-value-wrap"><span class="cont-type">${clientCont.type}:</span><span class="cont-value">${clientCont.value}</span></span><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="1"><circle cx="8" cy="8" r="8" fill="#9873FF"/><path d="M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z" fill="white"/></g></svg>`
          contWrap.append(cont);
        } else if (clientCont.type === 'Vk') {
          cont.innerHTML = `<span class="cont-value-wrap"><span class="cont-type">${clientCont.type}:</span><span class="cont-value">${clientCont.value}</span></span><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="1"><path d="M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97311 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92645 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70112C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z" fill="#9873FF"/></g></svg>`;
          contWrap.append(cont);
        } else {
          cont.innerHTML = `<span class="cont-value-wrap"><span class="cont-type">${clientCont.type}:</span> <span class="cont-value">${clientCont.value}</span></span><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="1" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13C5.24 13 3 10.76 3 8ZM9.5 6C9.5 5.17 8.83 4.5 8 4.5C7.17 4.5 6.5 5.17 6.5 6C6.5 6.83 7.17 7.5 8 7.5C8.83 7.5 9.5 6.83 9.5 6ZM5 9.99C5.645 10.96 6.75 11.6 8 11.6C9.25 11.6 10.355 10.96 11 9.99C10.985 8.995 8.995 8.45 8 8.45C7 8.45 5.015 8.995 5 9.99Z" fill="#9873FF"/></svg>        `
          contWrap.append(cont);
        };
      });
    };

    function createClientElement (client) {
      const list = document.querySelector('.clients-list');
      const item = document.createElement('li');
      const id = document.createElement('p');
      const fio = document.createElement('p');
      const creationWrap = document.createElement('div');
      const creationDate = document.createElement('span');
      const creationTime = document.createElement('span');
      const changeWrap = document.createElement('div');
      const changeDate = document.createElement('span');
      const changeTime = document.createElement('span');
      const contWrap = document.createElement('ul');
      const actionWrap = document.createElement('div');
      const changeBtn = document.createElement('button');
      const deleteBtn = document.createElement('button');

      let createdAt = new Date (`${client.createdAt}`);
      let createdDate = createdAt.getDate();
      if (createdDate < 10) createdDate = '0' + createdDate;
      let createdMonth = createdAt.getMonth() + 1;
      if (createdMonth < 10) createdMonth = '0' + createdMonth;
      let createdHours = createdAt.getHours();
      if (createdHours < 10) createdHours = '0' + createdHours;
      let createdMinutes = createdAt.getMinutes();
      if (createdMinutes < 10) createdMinutes = '0' + createdMinutes;

      let updatedAt = new Date (`${client.updatedAt}`);
      let updatedDate = updatedAt.getDate();
      if (updatedDate < 10) updatedDate = '0' + updatedDate;
      let updatedMonth = updatedAt.getMonth() + 1;
      if (updatedMonth < 10) updatedMonth = '0' + updatedMonth;
      let updatedHours = updatedAt.getHours();
      if (updatedHours < 10) updatedHours = '0' + updatedHours;
      let updatedMinutes = updatedAt.getMinutes();
      if (updatedMinutes < 10) updatedMinutes = '0' + updatedMinutes;

      item.classList.add('client');
      id.classList.add('id','main__id', 'client-padding');
      id.textContent = `${client.id}`;
      fio.classList.add('fio', 'main__fio', 'client-padding');
      fio.textContent = `${client.surname} ${client.name} ${client.lastName}`;
      creationWrap.classList.add('creation-wrap', 'main__date-create', 'client-padding');
      creationDate.classList.add('creation-date');
      creationDate.textContent = `${createdDate}.${createdMonth}.${createdAt.getFullYear()}`;
      creationTime.classList.add('creation-time');
      creationTime.textContent = `${createdHours}:${createdMinutes}`;
      changeWrap.classList.add('change-wrap', 'main__date-change', 'client-padding');
      changeDate.classList.add('change-date');
      changeDate.textContent = `${updatedDate}.${updatedMonth}.${updatedAt.getFullYear()}`;;
      changeTime.classList.add('change-time');
      changeTime.textContent = `${updatedHours}:${updatedMinutes}`;
      contWrap.classList.add('cont-wrap', 'client-padding');
      actionWrap.classList.add('action-wrap');
      changeBtn.classList.add('change');
      changeBtn.innerHTML = '<svg class="change-img" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7"><path d="M2 11.5V14H4.5L11.8733 6.62662L9.37333 4.12662L2 11.5ZM13.8067 4.69329C14.0667 4.43329 14.0667 4.01329 13.8067 3.75329L12.2467 2.19329C11.9867 1.93329 11.5667 1.93329 11.3067 2.19329L10.0867 3.41329L12.5867 5.91329L13.8067 4.69329Z" fill="#9873FF"/></g></svg> Изменить';
      deleteBtn.classList.add('delete');
      deleteBtn.innerHTML = '<svg class="delete-img" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7"><path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="#F06A4D"/></g></svg> Удалить';

      let clientConts = client.contacts;

      if (clientConts.length > 5) {
        let clientContsStart = clientConts.slice(0, 4);
        let clientContsEnd = clientConts.slice(4);
        showConts (clientContsStart, contWrap);
        const showAllConts = document.createElement('li');
        const showAllContsBtn = document.createElement('button');

        showAllConts.classList.add('show-all-wrap')
        showAllContsBtn.classList.add('show-all-conts-btn');
        showAllContsBtn.textContent = `+${clientConts.length - 4}`

        contWrap.append(showAllConts);
        showAllConts.append(showAllContsBtn);

        showAllContsBtn.addEventListener('click', function(e) {
          e.preventDefault();
          showConts (clientContsEnd, contWrap);

          showAllContsBtn.remove();
        });
      } else {
        showConts (clientConts, contWrap);
      };

      list.append(item);
      item.append(id);
      item.append(fio);
      item.append(creationWrap);
      creationWrap.append(creationDate);
      creationWrap.append(creationTime);
      item.append(changeWrap);
      changeWrap.append(changeDate);
      changeWrap.append(changeTime);
      item.append(contWrap);
      actionWrap.append(changeBtn);
      actionWrap.append(deleteBtn);
      item.append(actionWrap);

      changeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        createChangeModal(client, item, handlers);
      });

      deleteBtn.addEventListener('click', function(e) {
        e.preventDefault();
        createDeleteModal(client, item, handlers);
      });

      return item;
    };

    const clientsHeaderSearch = createHeader();
    const clientsAppTitle = createAppTitle();
    const clientsAppFilters = createAppFilters();
    const clientsList = createClientsListWrap();
    const clientsAppAddBtn = createAddBtn();
    const clientLoading = loadingSpiner();
    const tableWrap = document.createElement('div');

    tableWrap.classList.add('table-wrap');

    main.append(tableWrap);
    tableWrap.append(clientsAppTitle);
    tableWrap.append(clientsAppFilters.filters);
    clientsAppFilters.filters.append(clientsAppFilters.filterID);
    clientsAppFilters.filters.append(clientsAppFilters.filterFio);
    clientsAppFilters.filters.append(clientsAppFilters.filterDateCreate);
    clientsAppFilters.filters.append(clientsAppFilters.filterDateChange);
    clientsAppFilters.filters.append(clientsAppFilters.cont);
    clientsAppFilters.filters.append(clientsAppFilters.act);
    tableWrap.append(clientLoading);
    tableWrap.append(clientsList);
    main.append(clientsAppAddBtn);

    completeClientsList(clientsItemList);

    addBtn.addEventListener('click', function(e) {
      e.preventDefault();

      const clientsAppForm = createAddForm(clientsItemList, addClientHandlers);
      main.append(clientsAppForm.formWrap);
    });

    let clientsFio = [];

    for (let i = 0; i < clientsItemList.length; i++) {

      clientsFio.push(`${clientsItemList[i].surname} ${clientsItemList[i].name} ${clientsItemList[i].lastName}`);
    };

    autocomplete(clientsFio);

    function autocomplete (data) {

      function caseSearch(what = '', where = '') {
        return where.toLocaleLowerCase().search(what.toLocaleLowerCase());
      };

      clientsHeaderSearch.classList.add('autocomplete-input');
      let wrap = document.createElement('div');
      wrap.classList.add('autocomplete-wrap');
      clientsHeaderSearch.parentNode.insertBefore(wrap, clientsHeaderSearch);
      wrap.appendChild(clientsHeaderSearch);

      let list = document.createElement('div');
      list.classList.add('autocomplete-list');
      wrap.appendChild(list);

      let matches = [];
      let listItems = [];
      let focusedItem = -1;

      function setActive (active = true) {
        if(active) list.classList.add('active')
        else list.classList.remove('active');
      };

      function focusItem(index) {
        if(!listItems.length) return false;
        if(index > listItems.length - 1) return index = 0;
        if(index < 0) return index = listItems.length - 1;
        focusedItem = index;
        unfocusAllItems();
        listItems[focusedItem].classList.add('focused');
      };
      function unfocusAllItems() {
        listItems.forEach(item => {
          item.classList.remove('focused');
        });
      };
      function selectItem(index) {
        if(!listItems[index]) return false;
        clientsHeaderSearch.value = listItems[index].innerText;
        setActive(false);
      };

      let clients = document.querySelectorAll('.fio');

      function showSearchResult () {
        clients.forEach(client => {
          if (clientsHeaderSearch.value === client.outerText) {
            client.parentElement.classList.add('background');
            client.parentElement.setAttribute('id', 'background');
            client.scrollIntoView({block: "center", behavior: "smooth"})
          } else {
            client.parentElement.classList.remove('background');
            client.parentElement.removeAttribute('id');
          };
        });
      };

      clientsHeaderSearch.addEventListener('input', function(e) {
        e.preventDefault();

        let value = clientsHeaderSearch.value;
        if (!value.trim()) return setActive(false);

        list.innerHTML = '';
        listItems = [];


        data.forEach((dataItem, index) => {

          let search = caseSearch(value, dataItem);
          if(search === -1) return false;
          matches.push(index);

          let parts = [
            dataItem.substr(0, search),
            dataItem.substr(search, value.length),
            dataItem.substr(search + value.length, dataItem.length - search - value.length)
          ];

          let item = document.createElement('a');
          item.classList.add('autocomplete-item');
          item.setAttribute('href', `#background`)
          item.innerHTML = parts[0] + '<strong>' + parts[1] + '</strong>' + parts[2];
          list.appendChild(item);
          listItems.push(item);

          item.addEventListener('click', function(e) {
            e.preventDefault();
            selectItem(listItems.indexOf(item));
            showSearchResult();
          });
        });

        if (listItems.length > 0) {
          focusItem(0);
          setActive(true);
        } else {
          setActive(false);
        };
      });

      clientsHeaderSearch.addEventListener('keydown', function(e) {

        let keyCode = e.keyCode;

        if(keyCode === 40) {
          e.preventDefault();
          focusedItem++;
          focusItem(focusedItem);
        } else if(keyCode === 38) {
          e.preventDefault();
          if(focusedItem > 0) focusedItem--;
          focusItem(focusedItem);
        } else if(keyCode === 27) {
          setActive(false);
        } else if(keyCode === 13) {
          e.preventDefault();
          selectItem(focusedItem);
          showSearchResult();
        };
      });

      document.body.addEventListener('click', function(e) {
        if (!wrap.contains(e.target)) setActive(false);
      });
    };

    function sortClients (arrowClass) {
      const arrow = document.querySelector(arrowClass);
      const arrowUp = document.querySelectorAll('.arrow-rotate');
      const arrowCheck = document.querySelectorAll('.check');

      if (arrow.classList.contains('check')) {
        arrow.classList.toggle('arrow-rotate');
        if (arrowUp.length > 0) {
          arrowUp.forEach( arrow => {
            arrow.classList.remove('arrow-rotate');
          });
        };
        if (arrowCheck.length > 0) {
          arrowCheck.forEach( arrow => {
            arrow.classList.remove('check');
          });
        };
      };
      if (arrow.classList.contains('arrow-rotate')) {
        clientsItemList.reverse();
      };

      while (clientsList.firstChild) {
        clientsList.removeChild(clientsList.firstChild);
      };
      clientsItemList.forEach(client => {
        const clientsItemElement = createClientElement(client, addClientHandlers);
        clientsList.append(clientsItemElement);
      });

      arrow.classList.add('check');
    };

    clientsAppFilters.filterID.addEventListener('click', function(e) {
      e.preventDefault();

      clientsItemList.sort( function (a,b) {
        if (a.id > b.id) {return 1;}
        if (a.id < b.id) {return -1;}
        return 0;
      });

      sortClients('.main__arrow-id');
    });

    clientsAppFilters.filterFio.addEventListener('click', function(e) {
      e.preventDefault();

      clientsItemList.sort( function (a,b) {
        if ((a.surname + a.name + a.lastName) > (b.surname + b.name + b.lastName)) {return 1;};
        if ((a.surname + a.name + a.lastName) < (b.surname + b.name + b.lastName)) {return -1;};
        return 0;
      });

      sortClients('.main__arrow-fio');

    });

    clientsAppFilters.filterDateCreate.addEventListener('click', function(e) {
      e.preventDefault();

      clientsItemList.sort( function (a,b) {
        let dateCreateA = new Date(a.createdAt);
        let dateCreateB = new Date(b.createdAt);
        if (dateCreateA > dateCreateB) {return 1;}
        if (dateCreateA < dateCreateB) {return -1;}
        return 0;
      });

      sortClients('.main__arrow-create');

    });

    clientsAppFilters.filterDateChange.addEventListener('click', function(e) {
      e.preventDefault();

      clientsItemList.sort( function (a,b) {
        let dateChangeA = new Date(a.updatedAt);
        let dateChangeB = new Date(b.updatedAt);
        if (dateChangeA > dateChangeB) {return 1;}
        if (dateChangeA < dateChangeB) {return -1;}
        return 0;
      });

      sortClients('.main__arrow-changes');

    });
  };

  createСlientsApp();

})();
