const ul = document.querySelector('ul');

const loading = document.createElement('img');
loading.src = "img/loading-circle.gif"

const modal = document.querySelector('.modal');
const body = document.querySelector('body');

const hello = document.createElement('p');

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
    modal.classList.add("is-show");
    body.classList.add("no-scroll");
}

function closeModal() {
    modal.classList.remove("is-show");
    body.classList.remove("no-scroll");
}

//フォームの値をPromiseで取得
function getName() {
    return new Promise((resolve, reject) => {
        resolve(document.form.text.value);
    });
}

function writeName(str) {
    hello.innerHTML = `こんにちは、${str}さん。`;
    ul.before(hello);
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
    try {
        let resName = await getName();
        if (resName == '' ) {
            return false;
        }
        writeName(resName);
    } catch (err) {
        console.error(err);
        ul.innerHTML = 'エラーが発生しました';
    }

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

const openBtn = document.getElementById("open-btn")
openBtn.addEventListener('click', openModal);

const reqBtn = document.getElementById("req-form");
reqBtn.addEventListener('submit',  function(e) {
    e.preventDefault();
    submitTry();
    closeModal();
});


window.addEventListener('click', function(e) {
    if (e.target == modal) {
        closeModal();
    }
});


