/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


document.querySelectorAll('.audio-player').forEach(player => {
    const audio = player.querySelector('audio');
    const playBtn = player.querySelector('.play-pause');
    const progressBar = player.querySelector('.progress');
    const progressContainer = player.querySelector('.progress-bar');
    const currentTimeEl = player.querySelector('.current-time');
    const durationEl = player.querySelector('.duration');
    const volumeSlider = player.querySelector('.volume-slider');
    audio.volume = 0.3; 
    volumeSlider.value = 0.3;


    let isPlaying = false;

    playBtn.addEventListener('click', () => {
      if (isPlaying) {
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
      } else {
        document.querySelectorAll('audio').forEach(a => a.pause()); // Stop others
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
      }
      isPlaying = !isPlaying;
    });

    audio.addEventListener('timeupdate', () => {
      const progressPercent = (audio.currentTime / audio.duration) * 100;
      progressBar.style.width = `${progressPercent}%`;

      const format = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
      currentTimeEl.textContent = format(audio.currentTime);
      durationEl.textContent = format(audio.duration);
    });

    progressContainer.addEventListener('click', e => {
      const percent = e.offsetX / progressContainer.offsetWidth;
      audio.currentTime = percent * audio.duration;
    });

    volumeSlider.addEventListener('input', e => {
      audio.volume = e.target.value;
    });
  });