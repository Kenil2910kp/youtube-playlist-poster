let isEdit = false;
let editElement = null;

function formatViews(views) {
  if (views >= 1000000) return (views / 1000_000).toFixed(1) + "M";
  if (views >= 1000) return (views / 1000).toFixed(1) + "K";
  return views;
}

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("channel").value = "";
  document.getElementById("views").value = "";
  document.getElementById("months").value = "";
  document.getElementById("timestamp").value = "";
  document.getElementById("thumbnail").value = "";
  isEdit = false;
  editElement = null;
}

function addPoster() {
  const title = document.getElementById("title").value;
  const channel = document.getElementById("channel").value;
  const views = parseInt(document.getElementById("views").value);
  const months = document.getElementById("months").value;
  const timestamp = document.getElementById("timestamp").value;
  const thumbnail = document.getElementById("thumbnail").value;

  if (
    !title ||
    !channel ||
    isNaN(views) ||
    !months ||
    !timestamp ||
    !thumbnail
  ) {
    alert("Please fill all fields correctly.");
    return;
  }

  const formattedViews = formatViews(views);

  const posterHTML = `
  <div class="poster">
    <div class="thumbnail-wrapper">
      <img src="${thumbnail}" alt="Thumbnail" />
      <div class="timestamp">${timestamp}</div>
    </div>
    <div class="poster-info">
      <div class="poster-title">${title}</div>
      <div class="poster-meta">${channel} • ${formattedViews} views • ${months} months ago</div>
    </div>
    <div class="actions">
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </div>
  </div>
`;
  // If editing, replace the existing poster, otherwise,will  add  as a new one
  if (isEdit && editElement) {
    editElement.outerHTML = posterHTML;
  } else {
    document.getElementById("poster-container").insertAdjacentHTML("beforeend", posterHTML);
  }

  Listeners();
  clearForm();
}

function Listeners() {
  const posters = document.querySelectorAll(".poster");
  posters.forEach((poster) => {
    const editBtn = poster.querySelector(".edit-btn");
    const deleteBtn = poster.querySelector(".delete-btn");

    editBtn.onclick = () => {
      const title = poster.querySelector(".poster-title").textContent;
      const meta = poster.querySelector(".poster-meta").textContent;
      const thumbnail = poster.querySelector("img").src;
      const timestamp = poster.querySelector(".timestamp").textContent;

      const [channel, viewsText, monthsText] = meta.split(" • ");

      let rawViews = viewsText.replace(" views", ""); 
      let viewsNumber = parseFloat(rawViews); 

      let views = 0;

      if (rawViews.includes("M")) {
        views = viewsNumber * 1000000;
      } else if (rawViews.includes("K")) {
        views = viewsNumber * 1000;
      } else {
        views = viewsNumber; 
      }
      // fill the form after click on edit the same value which was previously written
      document.getElementById("title").value = title;
      document.getElementById("channel").value = channel.trim();
      document.getElementById("views").value = views;
      document.getElementById("months").value = monthsText.replace(" months ago", "").trim();
      document.getElementById("timestamp").value = timestamp;
      document.getElementById("thumbnail").value = thumbnail;

      isEdit = true;
      editElement = poster;
    };

    deleteBtn.onclick = () => {
      poster.remove();
      clearForm();
    };
  });
}