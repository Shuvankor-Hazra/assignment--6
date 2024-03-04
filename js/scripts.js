const loadAuthor = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/posts");
  const data = await res.json();
  const posts = data.posts;
  //   console.log(posts)
  displayPosts(posts);
};


const displayPosts = (posts) => {
  const cardContainer = document.getElementById("card-container");
  posts.forEach((post) => {
    // console.log(post)
    const discusContainer = document.createElement("div");
    discusContainer.classList = `mb-5 w-full p-6 md:p-8 lg:10 md:flex bg-[#797DFC1A] rounded-3xl space-y-2 md:space-x-6 border border-[#797DFC] font-inter`;
    discusContainer.innerHTML = `
    <div class="relative w-[72px]">
    <img class="rounded-2xl" src=${post.image} alt="" >
    
    <div id="active-round" class="p-2 rounded-full ${post.isActive === true ? 'bg-green-500' : 'bg-red-500'} absolute border-2 border-white -top-1 -right-1">
    </div>
    </div>
    <div class="space-y-4">
    <div class="w-full flex gap-10 text-sm font-medium">
      <p># <span>${post.category}</span></p>
      <p>Author: <span>${post.author.name}</span></p>
    </div>
    <h2 class="text-lg lg:text-xl font-bold font-mulish">
      ${post.title}
    </h2>
    <p class="pb-6 border-b-2 border-dashed border-[#12132D40] text-[#12132D99]">
      ${post.description}
    </p>
    <div class="flex justify-between min-w-full lg:min-w-[600px]">
      <div class="flex items-center gap-5">
        <div class="space-x-4">
          <i class="fa-regular fa-envelope"></i><span>${post.comment_count}</span>
        </div>
        <div class="space-x-4">
          <i class="fa-regular fa-eye"></i><span>${post.view_count}</span>
        </div>
        <div class="space-x-4">
          <i class="fa-regular fa-clock"></i><span>${post.posted_time} min</span>
        </div>
      </div>
      <button onclick="handleShowDetails('${post.id}')" class="rounded-full btn bg-[#797DFC]">
        <i
          class="fa-regular fa-envelope-open rounded-full text-white text-xs md:text-base"
        ></i>
      </button>
    </div>
  </div>
    `;
    cardContainer.appendChild(discusContainer);
  });
};

const handleShowDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/post/${id}`
  );
  const data = await res.json();

  showReadDetails(data);
};

let sum = 0;
const showReadDetails = (data) => {
  sum++
  const readCounts = document.getElementById('read-counts');
  const showReadContainer = document.getElementById("show-read-container");
  const div = document.createElement("div");
  div.classList = `px-4 py-4 my-4 flex justify-between bg-white rounded-xl`;
  div.innerHTML = `
  <h3 class="text-xl w-4/5">${sum}. ${data.title}</h3>
  <div class="flex items-center space-x-2 text-xl">
    <i class="fa-regular fa-eye"></i><span>${data.view_count}</span>
  </div>
  `;
  showReadContainer.appendChild(div);
  readCounts.innerText = sum;
};

const postsContainer = async () => {
  const postContainer = document.getElementById("posts-container");
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await res.json();
  data.forEach((element) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card border-2 border-[#12132D26] min-h-[550px]">
    <figure>
    <img src="${element.cover_image}" />
    </figure>
    <div class="card-body">
      <div class="flex items-center gap-5 text-[#12132D99]">
        <i class="fa-regular fa-calendar-days"></i>
        <p>${element?.author?.posted_date || "No Publish Date"}</p>
      </div>
      <h2 class="card-title text-lg font-extrabold font-mulish">
        ${element.title}
      </h2>
      <p class="pb-4">
        ${element.description}
      </p>
      <div class="card-actions">
        <div>
          <img class="h-[44px] rounded-full" src="${
            element.profile_image
          }" alt="" />
        </div>
        <div>
          <h4 class="font-bold">${element.author.name}</h4>
          <p>${element?.author?.designation || "Unknown"}</p>
        </div>
      </div>
    </div>
  </div>
    `;
    postContainer.appendChild(div);
  });
};

postsContainer();

loadAuthor();
