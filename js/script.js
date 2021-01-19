const ul = document.querySelector('ul');

const loading = document.createElement('img');
loading.src = "img/loading-circle.gif"

const modal = document.querySelector('.modal');
const body = document.querySelector('body');

const p = document.createElement('p');
const formText = document.form.text;

const openBtn = document.getElementById("open-btn")
const reqBtn = document.getElementById("req-form");

/* 5で使用
const array = [
    {to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"},
    {to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}
];

function getArray() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(array);
        }, 3000);
    });
};
*/

function openModal() {
    formText.value = '';
    modal.classList.add("is-show");
    body.classList.add("no-scroll");
    formText.focus(); //効いていない
}

function closeModal() {
    modal.classList.remove("is-show");
    body.classList.remove("no-scroll");
}

function check() {
    if(formText.value == '') {
        return false;
    } else {
        return true;
    }
}

//フォームの値をPromiseで取得
function getName() {
    return new Promise((resolve, reject) => {
        resolve(formText.value);
    });
}

function writeName(str) {
    p.innerHTML = `こんにちは、${str}さん。`;
    ul.before(p);
}

function writeLists(array) {
    for (var i = 0 ; i < array.length ; i++) {
        let li = document.createElement('li');
        let a = document.createElement('a');
        ul.appendChild(li);

        let to = array[i].to;
        let img = array[i].img;
        let alt = array[i].alt;
        let text = array[i].text;

        a.href = to;
        li.appendChild(a);
        a.innerHTML = `<img src="${img}" alt="${alt}">${text}`;
    }
}


async function submitTry() {
    closeModal();
    ul.innerHTML = '';
    ul.appendChild(loading);

    try {
        let response = await fetch('https://jsondata.okiba.me/v1/json/do9gM210114032953');
        let resJson = await response.json();
        let resName = await getName();
        writeName(resName);
        writeLists(resJson.data);
    } catch (err) {
        console.error(err);
        ul.innerHTML = 'エラーが発生しました';
    } finally {
        loading.remove();
    }
}

openBtn.addEventListener('click', openModal);

reqBtn.addEventListener('submit',  function(e) {
    e.preventDefault();
    if(check()) {
        submitTry();
    }
});

window.addEventListener('click', function(e) {
    if (e.target == modal) {
        closeModal();
    }
});


