function Slide(index, title, background, link ) {
   this.title = title;
   this.background = background;
   this.link = link;
   this.id = "slide-" + index;
}

const Slider = {
   current: 0,
   slides: [],
   initSlider: function(slides){
       let index = 0;
       for (let slide of slides){
           this.slides.push(new Slide(index, slide.title, slide.background, slide.link));
           index++;
       }
       this.buildSlider();
   },
   buildSlider: function() {
       let sliderHTML = "";
       let slides_count = 0
       for(let slide of this.slides) {
//зверніть увагу на можливість використання ``,яка дозволяє додавати в string змінні ${}
sliderHTML +=
`<div id='${slide.id}' class='singleSlide'
style='background-image:url(${slide.background});'>
<div class='slideOverlay'>
<h2>${slide.title}</h2>
<a class='link' href='${slide.link}' target='_blank'>Open</a></div></div>`;
slides_count++
}

document.getElementById("slider").innerHTML = sliderHTML;
document.getElementById("slide-" + this.current).style.left = 0;

const btnPrev = document.getElementById('btnPrev')
const btnNxt = document.getElementById('btnNxt')

btnPrev.addEventListener("click", () => {
    Slider.prevSlide()
})

btnNxt.addEventListener("click", () => {
    Slider.nextSlide()
})

const btnHide = document.getElementById("btnHide")
const sld_hide = document.getElementById("slider")

btnHide.addEventListener("click", function handler(){
    if(sld_hide.hidden === true)
        sld_hide.hidden = false
    else
        sld_hide.hidden = true

})

const btnStart = document.getElementById("btnStart")

btnStart.addEventListener('click', (event)=>{ 
    if (event.target.classList.contains('start')){ 
       event.target.setAttribute('value', "Start"); 
       clearInterval(interval) 
   } else { 
       event.target.innerHTML = 'Start'; 
       interval = setInterval(()=>{ 
          Slider.nextSlide(); 
      },1000); 
       event.target.setAttribute('value', "Stop")
   } 
   event.target.classList.toggle('start') 
})

document.getElementById("slider").innerHTML = sliderHTML;
document.getElementById("slide-" + this.current).style.left = 0;
sliderHTML = "";
let i = 0; 
for(; i < slides_count; i++) sliderHTML += `<input id="${i}" type="button" value="${i+1}" class = "btn" onclick="click_btn(${i})"></input>`
    document.getElementById("btns").innerHTML  = sliderHTML


}
,

prevSlide: function() {
   let next;
   if (this.current === 0 ) {
       next = this.slides.length - 1;
   } else {
       next = this.current - 1;
   }

   document.getElementById("slide-" + next).style.left = "-100%";
   document.getElementById("slide-" + this.current).style.left = 0;

   document.getElementById("slide-" + next).setAttribute("class", "singleSlide slideInLeft");
   document.getElementById("slide-" + this.current).setAttribute("class", "singleSlide slideOutRight");

   this.current = next;
},
nextSlide: function(){
   let next;
   if (this.current === (this.slides.length - 1) ) {
       next = 0;
   } else {
       next = this.current + 1;
   }

   document.getElementById("slide-" + next).style.left = "100%";
   document.getElementById("slide-" + this.current).style.left = 0;

   document.getElementById("slide-" + next).setAttribute("class", "singleSlide slideInRight");
   document.getElementById("slide-" + this.current).setAttribute("class", "singleSlide slideOutLeft");

   this.current = next;
}

}