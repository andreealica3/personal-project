document.addEventListener("DOMContentLoaded", () => {
    const questions = [
      {
        question: "What’s your current mood?",
        answers: ["Happy", "Sad", "Energetic", "Chill"]
      },
      {
        question: "What are you doing right now?",
        answers: ["Studying", "Working", "Relaxing", "Exercising"]
      },
      {
        question: "Pick a time of day:",
        answers: ["Morning", "Afternoon", "Evening", "Late night"]
      }
    ];
  
    const playlists = {
      Happy: ["https://open.spotify.com/playlist/happy_playlist_1", "Happy Vibes"],
      Sad: ["https://open.spotify.com/playlist/sad_playlist_1", "Sad & Soft"],
      Energetic: ["https://open.spotify.com/playlist/energetic_playlist_1", "Pump Up 🔥"],
      Chill: ["https://open.spotify.com/playlist/chill_playlist_1", "Chill & LoFi"],
      Studying: ["https://open.spotify.com/playlist/study_playlist", "Focus Zone"],
      Working: ["https://open.spotify.com/playlist/work_playlist", "Work Groove"],
      Relaxing: ["https://open.spotify.com/playlist/relax_playlist", "Relax Lounge"],
      Exercising: ["https://open.spotify.com/playlist/workout_playlist", "Workout Power"],
      Morning: ["https://open.spotify.com/playlist/morning_playlist", "Sunrise Energy"],
      Afternoon: ["https://open.spotify.com/playlist/afternoon_playlist", "Midday Chill"],
      Evening: ["https://open.spotify.com/playlist/evening_playlist", "Evening Vibes"],
      "Late night": ["https://open.spotify.com/playlist/night_playlist", "Midnight Flow"]
    };
  
    const startBtn = document.getElementById("start-btn");
    const closeBtn = document.getElementById("close-btn");
    const nextBtn = document.getElementById("next-btn");
    const restartBtn = document.getElementById("restart-btn");
    const modal = document.getElementById("quiz-modal");
    const resultSection = document.getElementById("result-section");
    const questionContainer = document.getElementById("question-container");
    const playlistContainer = document.getElementById("playlist");
  
    let currentQuestionIndex = 0;
    let selectedAnswers = [];
  
    startBtn.addEventListener("click", () => {
      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
      currentQuestionIndex = 0;
      selectedAnswers = [];
      resultSection.classList.add("hidden");
      nextBtn.style.display = "inline-block";
      questionContainer.style.display = "block";
      showQuestion();
    });
  
    closeBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
      document.body.style.overflow = "auto";
      resetQuiz();
    });
  
    nextBtn.addEventListener("click", () => {
      const selected = document.querySelector("input[name='answer']:checked");
      if (selected) {
        selectedAnswers.push(selected.value);
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
          showQuestion();
        } else {
          showPlaylist();
        }
      } else {
        alert("Please select an option.");
      }
    });
  
    restartBtn.addEventListener("click", () => {
      currentQuestionIndex = 0;
      selectedAnswers = [];
      resultSection.classList.add("hidden");
      questionContainer.style.display = "block";
      nextBtn.style.display = "inline-block";
      showQuestion();
    });
  
    function showQuestion() {
        const q = questions[currentQuestionIndex];
        questionContainer.innerHTML = `
          <h3>${q.question}</h3>
          ${q.answers
            .map(
              (a) => `
              <label><input type="radio" name="answer" value="${a}"> ${a}</label>
            `
            )
            .join("")}
        `;
      
        // Apel după ce s-a inserat întrebarea în DOM
        document.querySelectorAll("input[name='answer']").forEach((input) => {
          input.addEventListener("change", () => {
            document.querySelectorAll(".quiz-questions label").forEach(label => {
              label.classList.remove("selected");
            });
            input.parentElement.classList.add("selected");
          });
        });
      
        resultSection.classList.add("hidden");
        questionContainer.style.display = "block";
        nextBtn.style.display = "inline-block";
      }
      
  
    function showPlaylist() {
      const randomIndex = Math.floor(Math.random() * selectedAnswers.length);
      const key = selectedAnswers[randomIndex];
      const [link, title] = playlists[key] || playlists["Chill"];
  
      playlistContainer.innerHTML = `
        <p>We picked something based on your vibe:</p>
        <h3>${title}</h3>
        <a href="${link}" target="_blank">🎧 Listen on Spotify</a>
      `;
  
      questionContainer.style.display = "none";
      nextBtn.style.display = "none";
      resultSection.classList.remove("hidden");
    }
  
    function resetQuiz() {
      selectedAnswers = [];
      currentQuestionIndex = 0;
      questionContainer.innerHTML = "";
      resultSection.classList.add("hidden");
      questionContainer.style.display = "none";
      nextBtn.style.display = "none";
    }
  });
  
  
  
