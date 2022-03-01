document.addEventListener('DOMContentLoaded', function(){
	
    const button = document.getElementById("newsletter--button");
    const form = document.getElementById("newsletter--form");
    
      button.addEventListener('click', function(){
          form.classList.toggle('newsletter--form-active');
    })
  })