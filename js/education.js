'use strict'

const EduImages = document.querySelectorAll('.edu__grid-img, .edu__courses--img, .volunt--img');

// LAZY LOAD IMAGES
function lazyLoad(imageTarget) {
    function imgLoad(entries, observer) {
        const [entry] = entries;
        if (!entry.isIntersecting) return

        // Replace 'data-src' with 'src'
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target;
                const src = image.getAttribute('data-src');
                console.log(src);
                image.setAttribute('src', src);
                image.classList.remove('lazy-img');
                observer.unobserve(image)
            };
        });
    };

    //Intersection observer
    const imgObserver = new IntersectionObserver(imgLoad, {
        root: null,
        threshold: 0,
        rootMargin: '200px'
    });

    imageTarget.forEach(image => imgObserver.observe(image));
};
lazyLoad(EduImages)