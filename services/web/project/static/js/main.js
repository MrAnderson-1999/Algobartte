const button = document.getElementById('myButton');
const signIn = document.querySelector('.sign-in');
const helloWorld = document.querySelector('.hello-world');
const mainDiv = document.querySelector('.main-div');

signIn.style.display = "none";

document.addEventListener("DOMContentLoaded", function () {
  const heading1 = document.querySelector(".animated-heading1");
  const heading2 = document.querySelector(".animated-heading2");
  
  function animateHeading(heading) {
    heading.style.opacity = "1";
    heading.style.transform = "translateY(0)";
    setTimeout(() => {
      heading.style.opacity = "0";
      heading.style.transform = "translateY(20px)";
    }, 3000); // Duration of visible state
  }
  
  function startAnimation() {
    animateHeading(heading1);
    setTimeout(() => {
      animateHeading(heading2);
      setTimeout(startAnimation, 2000); // Re-trigger animation after 2 seconds
    }, 2000); // 2-second delay for the second heading
  }
  
  startAnimation();
});

button.addEventListener('click', () => {
    mainDiv.style.backgroundImage = "url('https://64.media.tumblr.com/d99434c3175fd427cae1d6afad3998e3/tumblr_pep5gqbyIA1w3y4ilo1_640.gif')";
    helloWorld.style.display = "none";
    signIn.style.display = "flex";
    mainDiv.classList.add('background-change'); // Add the class here
});

function goBack() {
    mainDiv.style.backgroundImage = "url('https://images.ctfassets.net/zmrtlfup12q3/6dYmfAQZk1UZecsgzkld5e/e2b2000384effa0d1c05e57b38bbc8c5/Header_GIF.gif')";
    signIn.style.display = "none";
    helloWorld.style.display = "block";
    mainDiv.classList.add('background-change'); // Add the class here

    // Wait for the transition to complete, then remove the class
    setTimeout(() => {
        mainDiv.classList.remove('background-change');
    }, 500); // Adjust the delay to match the transition duration
}
