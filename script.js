document.getElementById("uploadForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let artistName = document.getElementById("artistName").value.trim();
    let songTitle = document.getElementById("songTitle").value.trim();
    let songFile = document.getElementById("songFile").files[0];

    if (!artistName || !songTitle || !songFile) {
        alert("Please fill in all fields and select a song file.");
        return;
    }

    // Read the song file and store it in localStorage
    let reader = new FileReader();
    reader.readAsDataURL(songFile);
    reader.onloadend = function() {
        let songBase64 = reader.result;

        // Save song details in localStorage
        let songs = JSON.parse(localStorage.getItem("songs")) || [];
        songs.push({ 
            artist: artistName, 
            title: songTitle, 
            url: songBase64, 
            type: songFile.type 
        });
        localStorage.setItem("songs", JSON.stringify(songs));

        // Redirect to the songs page
        window.location.href = "songs.html";
    };
});
