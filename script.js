(function () {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });



    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

})()

gsap.to('#page>video', {
    scrollTrigger: {
        trigger: '#page>video',
        start: '2% top',
        end: 'bottom top',
        scrub: 1,
        scroller: '#main'
    },
    onStart: () => {
        document.querySelector('#page>video').play()
    }
})

gsap.to('#page', {
    scrollTrigger: {
        trigger: '#page',
        start: 'top top',
        end: 'bottom top',
        scroller: '#main',
        pin: true
    }
})

var t1 = gsap.timeline({
    scrollTrigger: {
        trigger: '#page1',
        start: 'top top',
        scrub: 1,
        scroller: '#main',
        pin: true
    }
})

t1.to('#page1>h1', {
    top: '-50%'
})

var t2 = gsap.timeline({
    scrollTrigger: {
        trigger: '#page2',
        start: 'top top',
        scrub: 1,
        scroller: '#main',
        pin: true
    }
})

t2.to('#page2>h1', {
    top: '-50%'
})

var t3 = gsap.timeline({
    scrollTrigger: {
        trigger: '#page4',
        start: 'top top',
        scrub: 1,
        scroller: '#main',
        pin: true
    }
})

t2.to('#page4>h1', {
    top: '-50%'
})

// JavaScript for infinite scrolling slider
const slideTrack = document.querySelector('.slide-track');
const slides = document.querySelectorAll('.slide');
const slideWidth = slides[0].offsetWidth; // Get the width of a single slide
const totalSlides = slides.length;

// Duplicate slides to ensure seamless looping
slides.forEach((slide) => {
    const clone = slide.cloneNode(true);
    slideTrack.appendChild(clone);
});

let currentIndex = 0;

// Function to move the slides
function moveSlides() {
    currentIndex++;
    const trackWidth = slideWidth * totalSlides;

    // Reset the position when reaching the end of the original slides
    if (currentIndex === totalSlides) {
        slideTrack.style.transition = 'none'; // Disable transition for seamless reset
        currentIndex = 0; // Reset to the first slide
        slideTrack.style.transform = `translateX(0)`;
    } else {
        slideTrack.style.transition = 'transform 0.5s linear'; // Smooth transition
        slideTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
}

// Start the slider loop
setInterval(moveSlides, 2000); // Adjust interval for timing
