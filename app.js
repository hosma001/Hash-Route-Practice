const allPostDiv = document.getElementById("allPostDiv");
const selectedPostDiv = document.getElementById("selectedPostDiv");

window.addEventListener("hashchange", () => {
    selectedPost()
});

const state = {
    allPosts: [],
    singlePost: null
}

function selectedPost() {
    getEventFromHash();
    renderPostDetails();
}

//gets information from hash
function getEventFromHash() {
    const id = parseInt(window.location.hash.substring(1));

    //find the single post from our list based on the id we get from hash
    const singlePost = state.allPosts.find((post) => {
        return post.id === id;
    });

    state.singlePost = singlePost;
    console.log(state);
}

function renderPostDetails() {
    if(state.singlePost) {
        getSinglePost();
    }
}

async function getSinglePost() {
    const postData = await fetch(`https://jsonplaceholder.typicode.com/posts/${state.singlePost.id}`);
    const singlePostData = await postData.json();
    state.singlePost = singlePostData;
    console.log(state.singlePost);
    selectedPostDiv.innerHTML = `<h1>${state.singlePost.title}</h1>`;
}

function renderHash() {
    const everyPost = state.allPosts.map((posts) => {
        return `<div> <a href=#${posts.id}> ${posts.id} </a> </div>`;
    });
    allPostDiv.innerHTML = everyPost.join('');
}

async function renderMain() {
    await fetchAllPosts();
    renderHash();
    selectedPost();
}

renderMain();

async function fetchAllPosts() {
    const data = await fetch("https://jsonplaceholder.typicode.com/posts");
    const allPostData = await data.json();
    state.allPosts = allPostData;
}

fetchAllPosts();


