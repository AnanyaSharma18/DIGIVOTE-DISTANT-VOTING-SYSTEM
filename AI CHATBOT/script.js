document.addEventListener("DOMContentLoaded", function () {
    fetch("data/digivote_questions.json")
        .then(response => response.json())
        .then(data => {
            initializeChatbot(data);
        });
});

function initializeChatbot(data) {
    const categoriesDiv = document.getElementById("categories");
    const questionsDiv = document.getElementById("questions");
    const answerDiv = document.getElementById("answer");
    const backToCategoriesBtn = document.getElementById("backToCategories");
    const backToQuestionsBtn = document.getElementById("backToQuestions");

    categoriesDiv.innerHTML = "<h3>Select a Category :- </h3>";
    categoriesDiv.style.display = "flex";
    categoriesDiv.style.gridTemplateColumns = "repeat(auto-fit, minmax(200px, 1fr))";
    categoriesDiv.style.gap = "10px";
    categoriesDiv.style.marginTop = "20px";

    data.categories.forEach(category => {
        let button = document.createElement("button");
        button.classList.add("category-btn", "fade-in", "category-style");
        button.innerText = `${category.emoji} ${category.name}`;
        button.onclick = function () {
            showQuestions(category.id, data);
        };
        categoriesDiv.appendChild(button);
    });

    function showQuestions(categoryId, data) {
        categoriesDiv.style.display = "none";
        questionsDiv.innerHTML = "<h3>Select a Question</h3>";
        questionsDiv.style.display = "grid";
        questionsDiv.style.gridTemplateColumns = "repeat(auto-fit, minmax(250px, 1fr))";
        questionsDiv.style.gap = "15px";
        questionsDiv.style.marginTop = "20px";
        backToCategoriesBtn.style.display = "block";

        const filteredQuestions = data.questions.filter(q => q.category_id === categoryId);
        
        filteredQuestions.forEach(question => {
            let button = document.createElement("button");
            button.classList.add("question-btn", "slide-in", "question-style");
            button.innerText = question.text;
            button.onclick = function () {
                showAnswer(question.text, question.answer);
            };
            questionsDiv.appendChild(button);
        });
    }

    function showAnswer(questionText, answerText) {
        questionsDiv.style.display = "none";
        answerDiv.innerHTML = `<h3>${questionText}</h3><p>${answerText}</p>`;
        answerDiv.style.display = "block";
        backToQuestionsBtn.style.display = "block";
    }

    backToCategoriesBtn.onclick = function () {
        localStorage.removeItem("selectedCategory"); // Reset saved category
    
        categoriesDiv.style.display = "grid"; // Ensure grid layout
        categoriesDiv.style.gridTemplateColumns = "repeat(auto-fit, minmax(200px, 1fr))"; // Maintain original structure
        categoriesDiv.style.gap = "10px";
        categoriesDiv.style.marginTop = "20px";
        categoriesDiv.style.alignItems = "center"; // Ensures proper vertical alignment
        categoriesDiv.style.justifyContent = "center"; // Centers the content if needed
    
        questionsDiv.style.display = "none";
        answerDiv.style.display = "none";
        backToCategoriesBtn.style.display = "none";
        backToQuestionsBtn.style.display = "none";
    };
    
    
    

    backToQuestionsBtn.onclick = function () {
        questionsDiv.style.display = "grid";
        answerDiv.style.display = "none";
        backToQuestionsBtn.style.display = "none";
    };
}
