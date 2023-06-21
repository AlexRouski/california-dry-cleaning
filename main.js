// Read-more button functional
const readMore = document.querySelector('.info__read-more')
const readMoreBtn = document.querySelector('.read-more-btn');
readMoreBtn.innerHTML = readMoreBtn.innerHTML.toUpperCase();
const text = document.querySelectorAll('.text')[1]
// const arrow = document.querySelector('.icon-arrow')

readMore.addEventListener('click', () => {
    text.classList.toggle('show-more');
    readMoreBtn.innerHTML = readMoreBtn.innerHTML === 'READ MORE...' ? '...READ LESS' : 'READ MORE...';
    // readMoreBtn.innerHTML === 'READ MORE...' ? arrow.style.transform = 'translateX(-50%)' : arrow.style.transform = 'translateX(-50%) rotate(180deg)';
})

// Swiper Functional
var swiper1 = new Swiper(".mySwiper1", {
    pagination: {
        el: ".swiper-pagination1",
        dynamicBullets: true,
    },
});

var swiper2 = new Swiper(".mySwiper2", {
    pagination: {
        el: ".swiper-pagination2",
        dynamicBullets: true,
    },
});

// Play video functions
const playBtns = document.querySelectorAll('.playBtn')
const playAreas = document.querySelectorAll('.video')

playBtns.forEach((playBtn, index) => {
    playBtn.addEventListener('click', () => {
        playAreas[index].play();
        playBtn.style.display = 'none';
    })
})

playAreas.forEach((playArea, index) => {
    playArea.addEventListener('click', () => {
        playAreas[index].pause();
        playBtns[index].style.display = 'grid';
    })
})

// Mobile navigation menu functional
const menuBtn = document.querySelector('.nav-toggle');
const closeBtn = document.querySelector('.close-button');
const closeBtnBar1 = document.querySelector('.close-button__bar1');
const closeBtnBar2 = document.querySelector('.close-button__bar2');
const navMenu = document.querySelector('.mobile-nav__open');

const mobileNavActiveOpen = () => {
    navMenu.classList.add('is-active');
    closeBtn.classList.add('is-active');
    closeBtnBar1.classList.add('is-active');
    closeBtnBar2.classList.add('is-active');
    document.body.classList.add('modal-open');
}

const mobileNavActiveClose = () => {
    navMenu.classList.remove('is-active');
    closeBtn.classList.remove('is-active');
    closeBtnBar1.classList.remove('is-active');
    closeBtnBar2.classList.remove('is-active');
    document.body.classList.remove('modal-open');
}

menuBtn.addEventListener('click', mobileNavActiveOpen)
closeBtn.addEventListener('click', mobileNavActiveClose)

// Order Service Functional
const serviceBtns = document.querySelectorAll('.service');
const services = document.querySelectorAll('.service__name')
const serviceQuantity = document.querySelector('.service-quantity');
const orderBtn = document.querySelector('.button__services');
const arrServices = [];

let choosedService = (serviceBtn, index) => {
    const serviceName = services[index].innerHTML;
    const isActive = serviceBtn.classList.toggle('active');

    if (isActive) {
        if (!arrServices.includes(serviceName)) {
            arrServices.push(serviceName)
        }
    } else {
        const serviceIndex = arrServices.indexOf(serviceName);
        if (serviceIndex !== -1) {
            arrServices.splice(serviceIndex, 1)
        }
    }
    
    const anyActiveService = arrServices.length > 0;
    serviceQuantity.classList.toggle('active', anyActiveService);
    serviceQuantity.innerHTML = arrServices.length;
    orderBtn.disabled = !anyActiveService;
}

serviceBtns.forEach((serviceBtn, index) => {
    serviceBtn.addEventListener('click', () => choosedService(serviceBtn, index))
});

// Modal form functional
const modal = document.querySelector('.modal');
const modalOpenBtn = document.querySelector('.button__services');
const modalCloseBtn = document.querySelector('.close-button--modal');
const pickedItemsDiv = document.querySelector('.picked-items');

let createPickedServiceElement = (serviceName) => {
        const pickedService = document.createElement('h3');
        pickedService.classList.add('picked-item__title');
        pickedService.innerHTML = serviceName;
        return pickedService;
}

let incrementQuantity = (spanQt) => {
    let currentValue = parseInt(spanQt.innerHTML);
    spanQt.innerHTML = currentValue + 1;
  };

let decreaseQuantity = (spanQt) => {
    let currentValue = parseInt(spanQt.innerHTML);
    if (currentValue > 1) {
    spanQt.innerHTML = currentValue - 1;
    }
}

let createQuantityElement = (initialQuantity) => {
    const quantityDiv = document.createElement('div');
        quantityDiv.classList.add('quantity');
        pickedItemsDiv.appendChild(quantityDiv);

        const spanMinus = document.createElement('span');
        spanMinus.classList.add('minus');
        spanMinus.innerHTML = '&minus;';

        const spanQt = document.createElement('span');
        spanQt.classList.add('qt');
        spanQt.innerHTML = initialQuantity.toString();

        const spanPlus = document.createElement('span');

        spanPlus.classList.add('plus');
        spanPlus.innerHTML = '&plus;';

        spanPlus.addEventListener('click', () => incrementQuantity(spanQt));
        spanMinus.addEventListener('click', () => decreaseQuantity(spanQt));

        quantityDiv.append(spanMinus, spanQt, spanPlus);

        return quantityDiv;
}

let pickedServicesArr = [];

let pickedServices = () => {
    arrServices.forEach((arrService) => {
        const pickedService = createPickedServiceElement(arrService);
        const quantityDiv = createQuantityElement(1);
        pickedItemsDiv.appendChild(pickedService);
        pickedItemsDiv.appendChild(quantityDiv);

        pickedServicesArr.push({
            serviceType: arrService,
            quantity: parseInt(quantityDiv.querySelector('.qt').innerHTML)
        })
    })
    console.log(pickedServicesArr);
}

modalOpenBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    document.body.classList.add('modal-open');
    pickedServices();
});

modalCloseBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
    pickedItemsDiv.innerHTML = '';
    pickedServicesArr = [];
});

// Form submission throu smtp js
// to get quantity of service dynamically:
function getServiceQuantity(serviceType) {
    const quantityDivs = document.querySelectorAll('.quantity');
    for (let i = 0; i < quantityDivs.length; i++) {
      const serviceName = quantityDivs[i].previousElementSibling.innerHTML;
      const quantityValue = parseInt(quantityDivs[i].querySelector('.qt').innerHTML);
      if (serviceName === serviceType) {
        return quantityValue;
      }
    }
    return 0; // Default quantity if service type is not found
  }

function sendEmail() {
    let emailBody = 'Name: ' + document.getElementById('name').value
    + '<br> Email: ' + document.getElementById('email').value
    + '<br> Phone: ' + document.getElementById('phone').value
    + '<br> Message: ' + document.getElementById('message').value
    + '<br> Date: ' + document.getElementById('date').value
    + '<br> Time: ' + document.getElementById('time').value
    
    pickedServicesArr.forEach(service => {
        emailBody += '<br> Service: ' + service.serviceType 
                + ' - Quantity: ' + getServiceQuantity(service.serviceType);
    })

function getServiceQuantity(serviceType) {
  const quantityDivs = document.querySelectorAll('.quantity');
  for (let i = 0; i < quantityDivs.length; i++) {
    const serviceName = quantityDivs[i].previousElementSibling.innerHTML;
    const quantityValue = parseInt(quantityDivs[i].querySelector('.qt').innerHTML);
    if (serviceName === serviceType) {
      return quantityValue;
    }
  }
  return 0; // Default quantity if service type is not found
}

    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "alextesting88@gmail.com",
        Password : "7AFBBF392FEF32066704895DC52F7AC94EA3",
        From : 'alextesting88@gmail.com',
        To : 'alextesting88@gmail.com',
        Subject : "New service enquiry",
        Body : emailBody
    }).then(
      message => alert('Enquiry submited succesfully!')
    );
}




// Was inside choosedService function
// this.style.backgroundColor = (this.style.backgroundColor === '' || this.style.backgroundColor === 'hsl(var(--clr-accent) / 0.9);') ? 'hsl( var(--clr-light-blue) / 0.5)' : 'hsl(var(--clr-accent) / 0.9)';
    // this.style.border = (this.style.border === '' || this.style.border === 'none') ? '3px solid hsl( var(--clr-light-blue))' : 'none';

    // let choosedService = function () {
    //     this.classList.toggle('active');
    //     let anyActiveService = false;
    //     serviceBtns.forEach((serviceBtn, index) => {
    //         const serviceName = services[index].innerHTML;
    //         if (serviceBtn.classList.contains('active')) {
    //             anyActiveService = true;
    //             if (arrServices.indexOf(serviceName) === -1) {
    //                 arrServices.push(serviceName);
    //             }
    //         } else {
    //             const index = arrServices.indexOf(serviceName)
    //             if (index >= 0) {
    //                 arrServices.splice(index, 1)
    //             }
    //         }
    //         if (anyActiveService) {
    //             serviceQuantity.classList.add('active');
    //         } else {
    //             serviceQuantity.classList.remove('active');
    //         }
    //     });
    //     console.log(arrServices.length);
    //     serviceQuantity.innerHTML = arrServices.length;
    //     orderBtn.disabled = !anyActiveService;
    // }
    
    // serviceBtns.forEach(serviceBtn => serviceBtn.addEventListener('click', choosedService));