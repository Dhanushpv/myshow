async function addmovie(event) {
    event.preventDefault();
    console.log('reached add user');   

    let title = document.getElementById('title').value;
    let rating = document.getElementById('rating').value;
    let vote = document.getElementById('vote').value;
    let category = document.getElementById('category').value;
    let language = document.getElementById('language').value;
    let about = document.getElementById('about').value;
    let imageInput = document.getElementById('image');


    let base64ImageString = "";


    if (imageInput.files && imageInput.files[0]) {
        const file = imageInput.files[0];
        const reader = new FileReader();
        

        reader.onloadend = async function () {
            base64ImageString = reader.result; 


            let data = {
                title,
                rating,
                category,
                language,
                about,
                image: base64ImageString,
                vote,

            };

            let json_data = JSON.stringify(data);
            console.log("json_data", json_data);

            try {
                let response = await fetch('/user', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: json_data,
                });
                if (response.ok) {
                    alert("Movie added successfully.");
                } else {
                    alert("Something went wrong!");
                }
                window.location='admin.html'
                console.log('response', response);
            } catch (error) {
                console.error('Error adding movie:', error);
            }
        };

        // Start reading the file as Base64
        reader.readAsDataURL(file);
    } else {
        alert("Please select an image.");
    }
}

async function loadData(event) {
    event.preventDefault();
    console.log("reached at indexpage..........");
    try {
        const response = await fetch('/user', {
            method: 'GET',
        });

        const prased_data = await response.json(); 
        console.log("prased_data",prased_data);

        let data = prased_data.data;
        console.log("data",data);


        let loadData = document.getElementById('loadData');
        console.log("loadData",loadData);

        let row = '';

        for(let i =0; i<data.length; i++){
            row+=`
                <div class="px-5"> 
                        <div class="">
                        <div>
                            <img src="${data[i].image}" style="width: 200px; height: 400px;" onclick="singleData('${data[i]._id}')">
                            <div class=""> 
                                <span class="fa fa-star">${data[i].rating}</span>
                                <span class="fa fa-star">${data[i].vote}</span>
                            </div>
                            <div class="">${data[i].title}</div>
                            <div> 
                                <span class="">${data[i].category.category}</span>/
                                <span class="">${data[i].language.language}</span>
                            </div>
                        </div>
                    </div>
                </div>
  

            `
        }
        loadData.innerHTML=row
    } catch (error) {
        console.log("error",error);
    }

    const carousel = document.querySelector('.carousel');
    const cells = document.querySelectorAll('.carousel-cell');
    const totalCells = cells.length;
    let currentIndex = 0;
    
    // Duplicate the first and last cell for smooth looping
    const firstClone = cells[0].cloneNode(true);
    const lastClone = cells[totalCells - 1].cloneNode(true);
    carousel.appendChild(firstClone); // Add the first clone at the end
    carousel.insertBefore(lastClone, cells[0]); // Add the last clone at the beginning
    
    // Update the list of cells to include clones
    const updatedCells = document.querySelectorAll('.carousel-cell');
    
    let cellWidth = updatedCells[0].offsetWidth + 20; // Add margin
    let isTransitioning = false; // To prevent multiple clicks during transition
    
    // Center the carousel by calculating offset based on screen width
    function centerCarousel() {
      const carouselContainerWidth = document.querySelector('.carousel-container').offsetWidth;
      const offsetToCenter = (carouselContainerWidth - cellWidth) / 2;
      carousel.style.transform = `translateX(${-cellWidth * (currentIndex + 1) + offsetToCenter}px)`;
    }
    
    window.addEventListener('resize', centerCarousel);
    centerCarousel(); // Initial centering
    
    document.querySelector('.next').addEventListener('click', () => {
      if (isTransitioning) return;
      isTransitioning = true;
    
      currentIndex++;
      carousel.style.transition = 'transform 0.5s ease-in-out';
      centerCarousel();
    
      carousel.addEventListener('transitionend', handleLoop);
    });
    
    document.querySelector('.prev').addEventListener('click', () => {
      if (isTransitioning) return;
      isTransitioning = true;
    
      currentIndex--;
      carousel.style.transition = 'transform 0.5s ease-in-out';
      centerCarousel();
    
      carousel.addEventListener('transitionend', handleLoop);
    });
    
    function handleLoop() {
      if (currentIndex === totalCells) {
        // If we're on the first clone (last real image), loop back to the first real image
        carousel.style.transition = 'none'; // Disable transition for the loop-back
        currentIndex = 0;
        centerCarousel();
      }
    
      if (currentIndex === -1) {
        // If we're on the last clone (first real image), loop forward to the last real image
        carousel.style.transition = 'none'; // Disable transition for the loop-back
        currentIndex = totalCells - 1;
        centerCarousel();
      }
    
      isTransitioning = false;
    }
    


}

async function adminLoad() {
    console.log("reached at indexpage..........");
    try {
        const response = await fetch('/user', {
            method: 'GET',
        });

        const prased_data = await response.json(); 
        console.log("prased_data",prased_data);

        let data = prased_data.data;
        console.log("data",data);


        let loadData = document.getElementById('loadData');
        console.log("loadData",loadData);

        let row = '';

        for(let i =0; i<data.length; i++){
            row+=`
                <div class="row">
                    <div class="col-lg-2">
                        <div class="row">
                            <div class="col">
                                <img src="${data[i].image}" onclick="singleData('${data[i]._id}')">
                                <div class=""> 
                                    <span class="fa fa-star">${data[i].rating}</span>
                                    <span class="fa fa-star">${data[i].vote}</span>
                                </div>
                                <div class="">${data[i].title}</div>
                                <div> 
                                    <span class="">${data[i].category.category}</span>/
                                    <span class="">${data[i].language.language}</span>
                                </div>
                                <div><button onclick="deleteData('${data[i]._id}')">delete</button></div>
                                <div><button onclick="update('${data[i]._id}')">update</button></div>
                            </div>
                        </div>
                    </div>
                </div>

            `
        }
        loadData.innerHTML=row
    } catch (error) {
        console.log("error",error);
    }
}

function  singleData(id){
    console.log("cliked................")
    window.location=`single.html?id=${id}`;
}

async function Single(){

    let location = window.location
    let querystring = location.search
    let url_params = new URLSearchParams(querystring);
    const id = url_params.get('id');

    try {
        const response = await fetch(`/users/${id}`, { method: 'GET' });
        const parsed_data = await response.json();
        console.log("Parsed Data", parsed_data);

        const data = parsed_data.data; // Assuming data is an object, not an array
        console.log("Data", data);

        const container = document.getElementById('singleData');

        // Build the HTML for the single product/user data
        const singleLoadData = `
            <div class="row">
                <div class="col-lg-2">
                    <div class="row">
                        <div class="col">
                            <img src="${data.image}"  alt="${data.title}">
                            <div class=""> 
                                <span class="fa fa-star">${data.rating}</span>
                                <span class="fa fa-star">${data.vote}</span>
                            </div>
                            <div class="">${data.title}</div>
                            <div> 
                                <span class="">${data.category.category}</span> /
                                <span class="">${data.language.language}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = singleLoadData;

    } catch (error) {
        console.error("Error fetching product:", error);
    }
}

 async function deleteData(id){
    console.log("Clicked to delete product with ID:", id);

    try {
        const response = await fetch(`/deleteData/${id}`, {
            method: 'DELETE',
        });

        const prased_data= await response.json();
        console.log("prased_data",prased_data)

        let data=prased_data.data;
        console.log(data)
        if(response.status===200){
            alert("product deleted successfully")
        }else{
            alert("somthing went wrong")
        }

        window.location='admin.html';
    }catch(error){
        console.error('Delete error:', error);

    }



}

function update(id){
    console.log("updated id ....",id);
    window.location=`updated.html?id=${id}`
    
}
async function loadUpdate(){
    console.log("reached to udate............");
    let location = window.location
    let querystring = location.search
    let url_params = new URLSearchParams(querystring);


    let id = url_params.get('id');
    console.log('id from update', id);

    try {
        let response = await fetch(`/users/${id}`);
        console.log("response",response);

        let prased_data = await response.json();
        console.log("parsed_data",prased_data);

        let data = prased_data.data;
        console.log("data",data);

        let title = document.getElementById('title');
        title.value = data.title;

        let rating = document.getElementById('rating');
        rating.value = data.rating;

        let vote = document.getElementById('vote');
        vote.value = data.vote;

        let category = document.getElementById('category');
        category.value = data.category.category;

        let language= document.getElementById('language');
        language.value =data[language.language];

        let imagePreview = document.createElement('img');
        imagePreview.src = data.image;  // Assuming image URL is stored
        document.body.appendChild(imagePreview);x


    }catch(error){
        console.log("error",error)
    }

}


// async function loadUpdate() {
//     console.log("reached to update...");
//     let location = window.location;
//     let querystring = location.search;
//     let url_params = new URLSearchParams(querystring);

//     let id = url_params.get('id');
//     console.log('id from update', id);

//     try {
//         let response = await fetch(`/users/${id}`);
//         let parsed_data = await response.json();
//         let data = parsed_data.data;

//         // Prepopulate form fields
//         document.getElementById('title').value = data.title;
//         document.getElementById('rating').value = data.rating;
//         document.getElementById('vote').value = data.vote;
//         document.getElementById('category').value = data.category.category;
//         document.getElementById('language').value = data.language;
        
//         // Image handling (you can't set value for input type='file')
//         // You'll need to display the current image and let the user upload a new one if desired.
//         // Example: display existing image
//         let imagePreview = document.createElement('img');
//         imagePreview.src = data.image;  // Assuming image URL is stored
//         document.body.appendChild(imagePreview);

//     } catch (error) {
//         console.log("error", error);
//     }
// }

// document.getElementById('updateForm').addEventListener('submit', async function (event) {
//     event.preventDefault();

//     let location = window.location;
//     let querystring = location.search;
//     let url_params = new URLSearchParams(querystring);
//     let id = url_params.get('id');

//     let formData = new FormData();
//     formData.append('title', document.getElementById('title').value);
//     formData.append('rating', document.getElementById('rating').value);
//     formData.append('vote', document.getElementById('vote').value);
//     formData.append('category', document.getElementById('category').value.category);
//     formData.append('language', document.getElementById('language').value.language);

//     // Add the file from input if uploaded
//     let imageInput = document.getElementById('image');
//     if (imageInput.files.length > 0) {
//         formData.append('image', imageInput.files[0]);
//     }

//     try {
//         let response = await fetch(`/updateData/${id}`, {
//             method: 'PUT',  // Use PUT or PATCH based on your API
//             body: formData
//         });
//         let result = await response.json();
//         console.log('Update result:', result);
        
//         if (response.ok) {
//             // Redirect or show success message
//             console.log("Successfully updated!");
//         } else {
//             console.error("Update failed.");
//         }
//     } catch (error) {
//         console.log('Update error:', error);
//     }
// });









