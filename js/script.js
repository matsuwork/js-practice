let ul = document.querySelector('ul');

const loading = document.createElement('img');
loading.src = "img/loading-circle.gif"

const modal = document.querySelector('.modal');
const body = document.querySelector('body');

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

function writeList(array, index) {
    let li = document.createElement('li');
    let a = document.createElement('a');
    ul.appendChild(li);

    let to = array[index].to;
    let img = array[index].img;
    let alt = array[index].alt;
    let text = array[index].text;

    a.href = to;
    li.appendChild(a);
    a.innerHTML = `<img src="${img}" alt="${alt}">${text}`;
}


async function writeArray() {
    ul.innerHTML = '';
    ul.appendChild(loading);
    try {
        const response = await fetch('https://jsondata.okiba.me/v1/json/do9gM210114032953');
        const postsData = await response.json();
        for (i = 0 ; i < postsData.data.length ; i++) {
            writeList(postsData.data,i);
        }

    } catch (err) {
        console.error(err);
        ul.innerHTML = 'エラーが発生しました';
    } finally {
        loading.remove();
    }
}

const openBtn = document.getElementById("open-btn")
openBtn.addEventListener('click', openModal);

const reqBtn = document.getElementById("req-btn");
reqBtn.addEventListener('click',  function() {
    writeArray();
    closeModal();
});


window.addEventListener('click', function(e) {
    if (e.target == modal) {
        closeModal();
    }
});


