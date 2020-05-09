var animals = document.querySelector('#itemsContainer');
var myButton = document.querySelector('.myButton');
var counter = 1;

myButton.addEventListener('click', function(){
    var myRequest = new XMLHttpRequest();

    myRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-'+counter+'.json');
    
    myRequest.onload = function() {
        if( myRequest.status >= 200 && myRequest.status < 400) {
            var myData = JSON.parse(myRequest.responseText) 
            renderHtml(myData)
        } else {
            console.log('We Connected to the server, but it returned an error.');
        }
        
    }

    myRequest.onerror = function() {
        console.log('Concection Error')
    }

    myRequest.send()

    counter++

    if(counter > 3) {
        myButton.classList.add('hide');
    }

})

function renderHtml(data) {
    var htmlString = '';
    for(let i = 0; i < data.length; i++) {
        htmlString += `<p>${data[i].name} is a ${data[i].species} that like to eat `
        for(let y = 0; y < data[i].foods.likes.length; y++) {
            if(y == 0) {
                htmlString += data[i].foods.likes[y]
            } else {
                htmlString += " and " + data[i].foods.likes[y]
            }
            
        }
        for(let k = 0; k < data[i].foods.dislikes.length; k++) {
            if(k == 0) {
                htmlString += " and Dislike " + data[i].foods.dislikes[k]
            } else {
                htmlString += " and " + data[i].foods.dislikes[k]
            }
            
        }
        htmlString += `</p>`;
    }
    animals.insertAdjacentHTML('beforeend', htmlString)
}


// i Used this JSON url:
// https://learnwebcode.github.io/json-example/animals-1.json 
// https://learnwebcode.github.io/json-example/animals-2.json 
// https://learnwebcode.github.io/json-example/animals-3.json 

// tutorial link:
// https://www.youtube.com/watch?v=rJesac0_Ftw