
        let slideIndex = 1;
        showSlides(slideIndex);

        function changeSlide(n) {
            showSlides(slideIndex += n);
        }

        function currentSlide(n) {
            showSlides(slideIndex = n);
        }

        function showSlides(n) {
            let slides = document.querySelectorAll(".slide");
            let dots = document.querySelectorAll(".dot");

            if (n > slides.length) { slideIndex = 1 }
            if (n < 1) { slideIndex = slides.length }

            slides.forEach(slide => slide.style.display = "none");
            dots.forEach(dot => dot.className = dot.className.replace(" active", ""));

            slides[slideIndex - 1].style.display = "block";
            dots[slideIndex - 1].className += " active";
        }

        setInterval(() => changeSlide(1), 5000); // Automatic slideshow

        //navigation
     function toggleMenu() {
    const navbar = document.querySelector(".navbar");
    const menu = document.querySelector(".navbar-menu");
    menu.classList.toggle("mobile");
    navbar.classList.toggle("open");
}
function openChatbot() {
    alert("Launching DigiVote Chatbot!"); // Replace this with chatbot integration.
}
//piechart
const ctx = document.getElementById('votingChart').getContext('2d');

// Gradient Colors for Bars
const gradient1 = ctx.createLinearGradient(0, 0, 0, 400);
gradient1.addColorStop(0, 'rgba(75, 192, 192, 1)'); // Teal
gradient1.addColorStop(1, 'rgba(75, 192, 192, 0.2)');

const gradient2 = ctx.createLinearGradient(0, 0, 0, 400);
gradient2.addColorStop(0, 'rgba(153, 102, 255, 1)'); // Purple
gradient2.addColorStop(1, 'rgba(153, 102, 255, 0.2)');

const gradient3 = ctx.createLinearGradient(0, 0, 0, 400);
gradient3.addColorStop(0, 'rgba(255, 159, 64, 1)'); // Orange
gradient3.addColorStop(1, 'rgba(255, 159, 64, 0.2)');

const data = {
    labels: ['Registered Voters', 'Voters Verified', 'Votes Counted'], 
    datasets: [{
        label: 'Voting Data',
        data: [10000, 8500, 8000], 
        backgroundColor: [gradient1, gradient2, gradient3],  // Applying gradient
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
        borderWidth: 2,
        hoverBackgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgba(153, 102, 255, 0.8)', 'rgba(255, 159, 64, 0.8)'], // Hover effect
        borderRadius: 10
    }]
};

const config = {
    type: 'bar',
    data: data,
    options: {
        responsive: true,
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    display: false // Hides X-Axis Grid Lines for Cleaner Look
                },
                title: {
                    display: true,
                    text: 'Voting Categories',
                    font: { size: 14, family: 'Arial, sans-serif' },
                    color: '#abcde'
                }
            },
            y: {
                ticks: {
                    stepSize: 2000
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)' // Light Grid Lines for Clean UI
                },
                title: {
                    display: true,
                    text: 'Number of Voters',
                    font: { size: 14, family: 'Arial, sans-serif' },
                    color: '#abcde'
                }
            }
        },
        plugins: {
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: '#444',
                borderWidth: 1,
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
                    }
                }
            },
            legend: {
                labels: {
                    font: { size: 16, family: 'Arial, sans-serif' },
                    color: '#ffffff'
                }
            }
        },
        animation: {
            duration: 2000,
            easing: 'easeOutBounce' // Bouncy Effect on Load
        }
    }
};

const votingChart = new Chart(ctx, config);


   