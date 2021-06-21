/* navigation menu */

(() => {

    const hamburgerBtn = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = navMenu.querySelector(".close-nav-menu");

    hamburgerBtn.addEventListener("click", showNavMenu);
    closeNavBtn.addEventListener("click", hideNavMenu);

    function showNavMenu() {
        navMenu.classList.toggle("open");
        bodyScrollingToggle();
    }
    function hideNavMenu() {
        navMenu.classList.toggle("open");
        fadeOutEffect();
        bodyScrollingToggle();
    }
    function fadeOutEffect() {
        document.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(() => {
            document.querySelector(".fade-out-effect").classList.remove("active");
        },300)
    }
    // attach an event handler to document
    document.addEventListener("click", (event) => {
        if(event.target.classList.contains('link-item')){
            // even.target.hash should have a value before overriding default behavior
            if(event.target.hash !== ""){
                // prevent default snchor click behavior
                event.preventDefault();
                const hash = event.target.hash;
                // console.log(hash);
                // deactivate existing active 'section'
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");
                // activate new 'section'
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");
                // deactivate existing active navigation menu 'link-item'
                navMenu.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow");
                navMenu.querySelector(".active").classList.remove("active", "inner-shadow");
                // if clicked 'link-item is contained within the navigation menu'
                if(navMenu.classList.contains("open")){
                    // activate new nevigation menu 'link-item'
                    event.target.classList.add("active", "inner-shadow");
                    event.target.classList.remove("outer-shadow", "hover-in-shadow");
                    // hide navigation menu
                    hideNavMenu();
                }
                else{
                    let navItems = navMenu.querySelectorAll(".link-item");
                    navItems.forEach((item) => {
                        if(hash === item.hash){
                            // activate new nevigation menu 'link-item'
                            item.classList.add("active", "inner-shadow");
                            item.classList.remove("outer-shadow","hover-in-shadow");
                        }
                    })
                    fadeOutEffect();
                }
                // add hash (#) to url
                window.location.hash = hash;
            }
        }
    })

})();

/* about section tabs */

(() =>{
        const aboutSection = document.querySelector(".about-section"),
        tabsContainer = document.querySelector(".about-tabs");

        tabsContainer.addEventListener("click", (event) => {
            /* if event.target contains 'tab-item' class and not contains 'active' class */
            if(event.target.classList.contains("tab-item") && 
                !event.target.classList.contains("active")){
                // console.log("event.target contains 'tab-item' class and not contains 'active' class");
                // console.log(event.target);
                const target = event.target.getAttribute("data-target");
                // console.log(target);
                // deactivate existing active 'tab-item'
                tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");
                // activate new 'tab-item'
                event.target.classList.add("active", "outer-shadow");
                // deactivate existing active 'tab-content'
                aboutSection.querySelector(".tab-content.active").classList.remove("active");
                // activate new 'tab-content'
                aboutSection.querySelector(target).classList.add("active");
            }
        })
})();

function bodyScrollingToggle(){
    document.body.classList.toggle("hidden-scrolling");
}

/* portfolio filter and popup */

(() => {

        const filterContainer = document.querySelector(".portfolio-filter"),
        portfolioItemsContainer = document.querySelector(".portfolio-items"),
        portfolioItems = document.querySelectorAll(".portfolio-item"),
        // console.log(portfolioItems);
        popup = document.querySelector(".portfolio-popup"),
        prevBtn = popup.querySelector(".pp-prev"),
        nextBtn = popup.querySelector(".pp-next"),
        closeBtn = popup.querySelector(".pp-close"),
        projectDetailsContainer = popup.querySelector(".pp-details"),
        projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
        let itemIndex, slideIndex, screenshots;

        /* filter portfolio items */
        filterContainer.addEventListener("click", (event) => {
            if(event.target.classList.contains("filter-item") && 
            !event.target.classList.contains("active")){
                // console.log("true");
                // deactivate existing active 'filter-item'
                filterContainer.querySelector(".active").classList.remove("outer-shadow","active");
                // activate new 'filter-item'
                event.target.classList.add("active","outer-shadow");
                const target = event.target.getAttribute("data-target");
                // console.log(target);
                portfolioItems.forEach((item) => {
                    // console.log(item)
                    // console.log(item.getAttribute("data-category"))
                    if(target === item.getAttribute("data-category") || target === "all"){
                        item.classList.remove("hide");
                        item.classList.add("show");
                    }
                    else{
                        item.classList.remove("show");
                        item.classList.add("hide");
                    }
                })
            }
            /*
            else{
                console.log("false");
            }
            console.log(event.target);
            */
        })

        portfolioItemsContainer.addEventListener("click", (event) => {
            // console.log(event.target.closest(".portfolio-item-inner"))
            if(event.target.closest(".portfolio-item-inner")){
                const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
                // console.log(portfolioItem);
                // get the portfolioItem index
                itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
                // console.log(itemIndex);
                screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
                // console.log(screenshots)
                // convert the screenshot into array
                screenshots = screenshots.split(",");
                // console.log(screenshots)
                if(screenshots.length === 1){
                    prevBtn.style.display = "none";
                    nextBtn.style.display = "none";
                }
                else{
                    prevBtn.style.display = "block";
                    nextBtn.style.display = "block";
                }
                slideIndex = 0;
                popupToggle();
                popupSlideshow();
                popupDetails();
            }
        })

        closeBtn.addEventListener("click", () => {
            popupToggle();
            if(projectDetailsContainer.classList.contains("active")){
                popupDetailsToggle();
            }
        })

        function popupToggle() {
            popup.classList.toggle("open");
            bodyScrollingToggle();
        }

        function popupSlideshow() {
            // console.log("hello")
            const imgSrc = screenshots[slideIndex];
            // console.log(imgSrc);
            const popupImg = popup.querySelector(".pp-img");
            // activate loader until the popupImg loaded
            popup.querySelector(".pp-loader").classList.add("active");
            popupImg.src = imgSrc;
            popupImg.onload = () => {
                // deactivate loader after the popupImg loaded
                popup.querySelector(".pp-loader").classList.remove("active");
            }
            popup.querySelector(".pp-counter").innerHTML = (slideIndex+1) + " of " + screenshots.length;
        }

        // next slide
        nextBtn.addEventListener("click", () => {
            if(slideIndex === screenshots.length-1){
                slideIndex = 0;
            }
            else{
                slideIndex++;
            }
            popupSlideshow();
            // console.log("slideIndex: " + slideIndex);
        })

        // prev slide
        prevBtn.addEventListener("click", () => {
            if(slideIndex === 0){
                slideIndex = screenshots.length-1;
            }
            else{
                slideIndex--;
            }
            popupSlideshow();
            // console.log("slideIndex: " + slideIndex);
        })

        function popupDetails() {
            // if portfolio-item-details not exists
            if(!portfolioItems[itemIndex].querySelector(".portfolio-item-details")){
                projectDetailsBtn.style.display = "none";
                return; // end function execution
            }
            projectDetailsBtn.style.display = "block";
            // get the project title
            const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
            // set the project title
            popup.querySelector(".pp-title h2").innerHTML = title;
            // get the project category
            const category = portfolioItems[itemIndex].getAttribute("data-category");
            // set the project category
            popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");
            // get the project details
            const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
            // set the project details
            popup.querySelector(".pp-project-details").innerHTML = details;
        }

        projectDetailsBtn.addEventListener("click", () => {
            popupDetailsToggle();
        })

        function popupDetailsToggle() {
            if(projectDetailsContainer.classList.contains("active")){
                projectDetailsBtn.querySelector("i").classList.add("fa-plus");
                projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
                projectDetailsContainer.classList.remove("active");
                projectDetailsContainer.style.maxHeight = 0 + "px";
            }
            else{
                projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
                projectDetailsBtn.querySelector("i").classList.add("fa-minus");
                projectDetailsContainer.classList.add("active");
                projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
                popup.scrollTo(0, projectDetailsContainer.offsetTop);
            }
        }

})();


/* testimonial section */

(() => {
        
    const sliderContainer = document.querySelector(".testi-slider-container"),
    slides = sliderContainer.querySelectorAll(".testi-item"),
    slideWidth = sliderContainer.offsetWidth,
    prevBtn = document.querySelector(".testi-slider-nav .prev"),
    nextBtn = document.querySelector(".testi-slider-nav .next"),
    activeSlide = sliderContainer.querySelector(".testi-item.active");
    let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);

    // set width of all slides
    slides.forEach((slide) => {
        slide.style.width = slideWidth + "px";
    })
    // set width of sliderContainer
    sliderContainer.style.width = slideWidth * slides.length + "px";

    nextBtn.addEventListener("click", () => {
        if(slideIndex === slides.length-1){
            slideIndex = 0;
        }
        else{
            slideIndex++;
        }
        slider();
    })

    prevBtn.addEventListener("click", () => {
        if(slideIndex === 0){
            slideIndex = slides.length-1;
        }
        else{
            slideIndex--;
        }
        slider();
    })

    function slider(){
        // deactivate existing active slides
        sliderContainer.querySelector(".testi-item.active").classList.remove("active");
        // activate new slide
        slides[slideIndex].classList.add("active");
        sliderContainer.style.marginLeft = - (slideWidth * slideIndex) + "px";
    }
    slider();

})();

/* hide all sections except active */

(() => {

    const sections = document.querySelectorAll(".section");
    // console.log(sections);
    sections.forEach((section) => {
        if(!section.classList.contains("active")){
            section.classList.add("hide");
        }
    })

})();

window.addEventListener("load", () => {
    // preloader
    document.querySelector(".preloader").classList.add("fade-out");
    setTimeout(() => {
        document.querySelector(".preloader").style.display = "none";
    }, 1010)
})