document.addEventListener("DOMContentLoaded", function() {
    let songContainer = document.getElementById("songContainer");
    let songs = JSON.parse(localStorage.getItem("songs")) || [];

    if (songs.length === 0) {
        songContainer.innerHTML = "<p>No songs uploaded yet.</p>";
        return;
    }

    songs.forEach((song, index) => {
        let listItem = document.createElement("li");

        // Create the play button
        let audio = document.createElement("audio");
        audio.controls = true;
        audio.src = song.url;

        // Create the download button
        let downloadButton = document.createElement("a");
        downloadButton.href = song.url;
        downloadButton.download = `${song.title}.mp3`;
        downloadButton.innerHTML = `<button>Download</button>`;

        // Create the delete button
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.backgroundColor = "red";
        deleteButton.style.color = "white";
        deleteButton.style.marginLeft = "10px";
        deleteButton.onclick = function() {
            deleteSong(index);
        };

        // Add song title and artist
        listItem.innerHTML = `<strong>${song.artist} - ${song.title}</strong><br>`;
        
        // Append elements to the song list
        listItem.appendChild(audio);
        listItem.appendChild(document.createElement("br"));
        listItem.appendChild(downloadButton);
        listItem.appendChild(deleteButton);

        songContainer.appendChild(listItem);
    });
});

// Function to delete a song
function deleteSong(index) {
    let songs = JSON.parse(localStorage.getItem("songs")) || [];
    songs.splice(index, 1);  // Remove the song from the array
    localStorage.setItem("songs", JSON.stringify(songs));  // Update storage
    location.reload();  // Reload the page to update the song list
}
