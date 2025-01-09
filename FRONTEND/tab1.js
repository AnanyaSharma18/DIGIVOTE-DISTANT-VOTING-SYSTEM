// Smooth Scroll for Sidebar Navigation
document.querySelectorAll('.tabs a').forEach(tab => {
    tab.addEventListener('click', function (event) {
      event.preventDefault(); // Prevent default anchor behavior
      const targetSection = document.querySelector(this.getAttribute('href'));
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
 
  // Save Button Logic
  document.querySelectorAll('.save-btn').forEach(button => {
    button.addEventListener('click', () => {
      alert('Your data has been saved!');
    });
  });
 
  // Next Button Logic
  document.querySelectorAll('.next-btn').forEach(button => {
    button.addEventListener('click', function () {
      const nextSectionId = this.getAttribute('data-next');
      const nextSection = document.getElementById(nextSectionId);
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  function my_fun(){
   
    const url="congratulations.html";
    window.open(url);
    }