
/* script.js */

document.addEventListener("DOMContentLoaded", () => {

    // Fade-in animation on scroll
    const elements = document.querySelectorAll(
        ".timeline-card, .venue-card, .faq-item, section h2"
    );

    const observer = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.classList.add("visible","fade-in");
            }
        });
    },{
        threshold:0.15
    });

    elements.forEach(el=>{
        el.classList.add("fade-in");
        observer.observe(el);
    });

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(link=>{
        link.addEventListener("click",(e)=>{
            const target=document.querySelector(link.getAttribute("href"));
            if(target){
                e.preventDefault();
                target.scrollIntoView({
                    behavior:"smooth",
                    block:"start"
                });
            }
        });
    });

    // Hero parallax
    window.addEventListener("scroll",()=>{
        const hero=document.querySelector(".hero");
        if(hero){
            hero.style.backgroundPositionY=(window.scrollY*0.25)+"px";
        }
    });

    // Search input focus glow
    const input=document.getElementById("search");
    if(input){
        input.addEventListener("focus",()=>{
            input.style.boxShadow="0 0 15px rgba(199,164,76,.35)";
        });

        input.addEventListener("blur",()=>{
            input.style.boxShadow="";
        });
    }

});
