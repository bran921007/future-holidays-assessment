document.addEventListener('DOMContentLoaded', () => {
  const config = {
    rootMargin: '200px 0px',
    threshold: 0,
  };

  const isInViewport = (el, margin = 200) => {
    const rect = el.getBoundingClientRect();
    return rect.top <= window.innerHeight + margin && rect.bottom >= -margin;
  };

  const loadVideo = (video) => {
    if (video.dataset.src) {
      video.src = video.dataset.src;
      video.removeAttribute('data-src');
    }
    video.querySelectorAll('source[data-src]').forEach((source) => {
      source.src = source.dataset.src;
      source.removeAttribute('data-src');
    });
    video.load();
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          loadVideo(e.target);
          obs.unobserve(e.target);
        }
      });
    }, config);

    document.querySelectorAll('video.lazy-video').forEach((video) => {
      if (isInViewport(video)) {
        loadVideo(video);
      } else {
        io.observe(video);
      }
    });
  } else {
    document.querySelectorAll('video.lazy-video').forEach(loadVideo);
  }
});
