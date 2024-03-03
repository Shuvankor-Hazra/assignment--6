const loadAuthor = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  const data = await res.json();
  const posts = data.posts;
  //   console.log(posts)
  displayPosts(posts);
};

const displayPosts = (posts) => {
  const cardContainer = document.getElementById("card-container");
  posts.forEach((post) => {
    console.log(post)
    const discusContainer = document.createElement("div");
    discusContainer.classList = `mb-5 w-full p-6 md:p-8 lg:10 md:flex bg-[#797DFC1A] rounded-3xl space-y-2 md:space-x-6 border border-[#797DFC] font-inter`;
    discusContainer.innerHTML = `
    <div class="max-w-16 max-h-16 bg-white rounded-2xl relative">
    <img class="w-full" src="${post.image}" alt="" />
    <div class="p-2 rounded-full bg-green-500 absolute border-2 border-white -top-1 -right-1">
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
    <div class="flex justify-between min-w-full lg:min-w-[700px]">
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
      <button class="rounded-full btn bg-[#797DFC]">
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

loadAuthor();
